#!/usr/bin/env python3
"""Mes Dijital — cPanel FTP deploy ve bakım anahtarı.

Kullanım:
  python3 scripts/deploy.py deploy                 dist/ → public_html (ekle/güncelle)
  python3 scripts/deploy.py deploy --prune         + sunucuda olup dist/'te olmayanları sil
  python3 scripts/deploy.py maintenance on|off|status
  python3 scripts/deploy.py ls [yol]

Bilgiler .env.deploy dosyasından (FTP_HOST, FTP_USER, FTP_PASS, FTP_ROOT)
ya da aynı adlı ortam değişkenlerinden okunur. Bağlantı açık FTP + TLS.
"""
from __future__ import annotations

import io
import os
import ssl
import sys
from ftplib import FTP, FTP_TLS, error_perm
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
FLAG = ".maintenance"
# public_html içinde deploy'un ASLA silmeyeceği yollar (cPanel/SSL'e ait).
KEEP = {".well-known", "cgi-bin", ".user.ini", "php.ini", FLAG}


def load_env() -> dict[str, str]:
    env = {}
    f = ROOT / ".env.deploy"
    if f.exists():
        for line in f.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    for k in ("FTP_HOST", "FTP_USER", "FTP_PASS", "FTP_ROOT"):
        if os.environ.get(k):
            env[k] = os.environ[k]
    missing = [k for k in ("FTP_HOST", "FTP_USER", "FTP_PASS") if not env.get(k)]
    if missing:
        sys.exit(f"eksik ayar: {', '.join(missing)} (.env.deploy)")
    env.setdefault("FTP_ROOT", "public_html")
    return env


def connect(env: dict[str, str]) -> FTP:
    """Önce FTP+TLS dener; sunucu reddederse düz FTP'ye düşer.

    Not: mesdijital.com.tr'nin Pure-FTPd'si FEAT'te AUTH TLS ilan ediyor ama
    "500 This security scheme is not implemented" dönüyor (sertifika yok).
    Düz FTP'de şifre açık gider — cPanel'de FTP TLS açılırsa bu kod
    otomatik TLS kullanır.
    """
    ctx = ssl.create_default_context()
    ctx.check_hostname = False  # sunucu sertifikası IP'ye kesilmemiş
    ctx.verify_mode = ssl.CERT_NONE
    ftp: FTP = FTP_TLS(context=ctx, timeout=60)
    ftp.connect(env["FTP_HOST"], 21)
    try:
        ftp.login(env["FTP_USER"], env["FTP_PASS"])
        ftp.prot_p()  # type: ignore[attr-defined]
    except error_perm as e:
        if "500" not in str(e):
            raise
        print("uyarı: sunucu FTP-TLS desteklemiyor, düz FTP kullanılıyor", file=sys.stderr)
        ftp.close()
        ftp = FTP(timeout=60)
        ftp.connect(env["FTP_HOST"], 21)
        ftp.login(env["FTP_USER"], env["FTP_PASS"])
    ftp.cwd(env["FTP_ROOT"])
    return ftp


def remote_tree(ftp: FTP, path: str = "") -> dict[str, str]:
    """{göreli yol: 'file'|'dir'} — MLSD ile özyinelemeli."""
    out: dict[str, str] = {}
    try:
        entries = list(ftp.mlsd(path or ".", facts=["type"]))
    except error_perm:
        return out
    for name, facts in entries:
        if name in (".", ".."):
            continue
        rel = f"{path}/{name}" if path else name
        t = facts.get("type", "file")
        if t == "dir":
            out[rel] = "dir"
            out.update(remote_tree(ftp, rel))
        elif t == "file":
            out[rel] = "file"
    return out


def ensure_dir(ftp: FTP, rel: str, known: set[str]) -> None:
    parts = rel.split("/")
    for i in range(1, len(parts) + 1):
        d = "/".join(parts[:i])
        if d in known:
            continue
        try:
            ftp.mkd(d)
        except error_perm:
            pass
        known.add(d)


def cmd_deploy(prune: bool) -> None:
    if not (DIST / "index.html").exists():
        sys.exit("dist/index.html yok — önce `npm run build`")
    env = load_env()
    ftp = connect(env)
    remote = remote_tree(ftp)
    known_dirs = {p for p, t in remote.items() if t == "dir"}

    local: dict[str, Path] = {}
    for p in DIST.rglob("*"):
        if p.is_file() and p.name != ".DS_Store":
            local[p.relative_to(DIST).as_posix()] = p

    n = 0
    for rel in sorted(local):
        if "/" in rel:
            ensure_dir(ftp, rel.rsplit("/", 1)[0], known_dirs)
        with open(local[rel], "rb") as fh:
            ftp.storbinary(f"STOR {rel}", fh)
        n += 1
        print(f"  ↑ {rel}")
    print(f"{n} dosya yüklendi")

    if prune:
        stale = [
            p for p, t in remote.items()
            if t == "file" and p not in local and p.split("/")[0] not in KEEP
        ]
        for rel in sorted(stale, reverse=True):
            ftp.delete(rel)
            print(f"  ✕ {rel}")
        # boşalan dizinleri temizle (derinden yüzeye)
        for d in sorted((p for p, t in remote.items() if t == "dir"), key=len, reverse=True):
            if d.split("/")[0] in KEEP:
                continue
            if not any(l.startswith(d + "/") for l in local):
                try:
                    ftp.rmd(d)
                    print(f"  ✕ {d}/")
                except error_perm:
                    pass
        print(f"{len(stale)} eski dosya silindi")
    ftp.quit()


def cmd_maintenance(action: str) -> None:
    env = load_env()
    ftp = connect(env)
    exists = FLAG in ftp.nlst()
    if action == "status":
        print("bakım modu:", "AÇIK" if exists else "kapalı")
    elif action == "on":
        if exists:
            print("bakım modu zaten açık")
        else:
            ftp.storbinary(f"STOR {FLAG}", io.BytesIO(b"maintenance\n"))
            print("bakım modu AÇILDI — site 503 + maintenance.html dönüyor")
    elif action == "off":
        if not exists:
            print("bakım modu zaten kapalı")
        else:
            ftp.delete(FLAG)
            print("bakım modu KAPATILDI — site normal")
    else:
        sys.exit("maintenance on|off|status")
    ftp.quit()


def cmd_ls(path: str) -> None:
    ftp = connect(load_env())
    ftp.retrlines(f"LIST -a {path}".strip())
    ftp.quit()


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    if args[0] == "deploy":
        cmd_deploy(prune="--prune" in args)
    elif args[0] == "maintenance" and len(args) > 1:
        cmd_maintenance(args[1])
    elif args[0] == "ls":
        cmd_ls(args[1] if len(args) > 1 else "")
    else:
        sys.exit(__doc__)
