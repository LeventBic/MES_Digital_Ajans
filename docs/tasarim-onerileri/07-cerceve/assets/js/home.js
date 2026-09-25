/* =========================================================
   Mes Dijital — ana sayfa: açılış + kategori seçim ekranı
   Akış: M çizilir → dolar → yarılar aralanıp arada kareler akar →
   zemin açılır, sütun yükselir, M yarıları ortadaki kartın iki yanına
   geçip çerçeve olur → kullanıcı seçene kadar bekler.

   Görünümler: Dikey (v), Yatay (h), Izgara (g). Seçim tarayıcıda hatırlanır.
   Sütun ve soldaki liste sonsuz döngüdür: öğeler üç kopya halinde
   dizilir, konum ortadaki kopyanın dışına çıkınca bir set kaydırılır.
   İçerik assets/js/data.js'ten gelir.
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const store = {
    get(k, t = sessionStorage) { try { return t.getItem(k); } catch { return null; } },
    set(k, v, t = sessionStorage) { try { t.setItem(k, v); } catch {} },
  };
  const local = (() => { try { return localStorage; } catch { return null; } })();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mod = (n, m) => ((n % m) + m) % m;
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const force = new URLSearchParams(location.search).has("loader");
  const reduced = !force && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DATA = window.MD_DATA || { categories: [] };
  const CATS = DATA.categories;
  const N = CATS.length;

  const body = document.body;
  const reel = $(".reel");
  const track = $(".reel__track");
  const list = $(".cats ol");
  const gridv = $(".gridv__inner");
  const frame = $(".frame");
  const intro = $(".intro");
  const flash = $(".intro__flash");
  const countEl = $(".intro__count");
  if (!reel || !N) return;

  /* ---------- İçeriği veriden üret ---------- */
  const shapeCls = { land: " is-land", sq: " is-sq", port: "" };
  const media = (c, i) => c.cover
    ? `<img src="${esc(c.cover)}" alt="${esc(c.name)}" loading="lazy" draggable="false">`
    : `<div class="ph mono tone-${(i % 4) + 1}"><span>${pad(i + 1)}<span class="ph__name">${esc(c.name)}</span></span></div>`;

  track.innerHTML = CATS.map((c, i) =>
    `<a class="reel__item${shapeCls[c.shape] || ""}" href="kategori.html?k=${encodeURIComponent(c.slug)}" draggable="false">${media(c, i)}</a>`
  ).join("");
  list.innerHTML = CATS.map((c) => `<li><button type="button">${esc(c.name)}</button></li>`).join("");
  gridv.innerHTML = CATS.map((c, i) => `
    <a class="gcard" href="kategori.html?k=${encodeURIComponent(c.slug)}" style="--i:${i}" data-cursor="Aç">
      <div class="gcard__media">${media(c, i)}</div>
      <div class="gcard__row"><span>${esc(c.name)}</span><span class="mono muted">${pad(i + 1)}</span></div>
      <div class="gcard__sub">${esc(c.sub)}</div>
    </a>`).join("");
  const about = $(".about p");
  if (about && DATA.agency?.about) about.textContent = DATA.agency.about;

  const base = $$(".reel__item", track);

  /* ---------- Açılıştaki kareler ---------- */
  const buildFlash = () => {
    CATS.forEach((c, i) => {
      let slide;
      if (c.cover) {
        slide = document.createElement("img");
        slide.src = c.cover;
        slide.alt = "";
      } else {
        slide = document.createElement("div");
        slide.className = `ph mono tone-${(i % 4) + 1}`;
        slide.textContent = pad(i + 1);
      }
      flash.append(slide);
    });
  };

  /* ---------- Sonsuz döngü için üç kopya ---------- */
  const triple = (parent, nodes) => {
    const mk = () => nodes.map((n) => {
      const c = n.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.classList.add("is-clone");
      c.querySelectorAll("a, button").forEach((x) => (x.tabIndex = -1));
      if (c.matches("a, button")) c.tabIndex = -1;
      return c;
    });
    parent.prepend(...mk());
    parent.append(...mk());
  };

  /* ---------- Görünüm ---------- */
  let view = (local && store.get("md-view", local)) || "v";
  if (!["v", "h", "g"].includes(view)) view = "v";
  const isH = () => view === "h";

  /* ---------- Ölçüler ---------- */
  let items = [], lis = [], centers = [], setL = 0, lh = 0;
  const measure = () => {
    centers = items.map((el) => isH() ? el.offsetLeft + el.offsetWidth / 2 : el.offsetTop + el.offsetHeight / 2);
    setL = centers[N] - centers[0];
    lh = lis.length ? lis[0].offsetHeight : 0;
  };
  const at = (p) => {
    const i = clamp(Math.floor(p), 0, centers.length - 2);
    return centers[i] + (centers[i + 1] - centers[i]) * (p - i);
  };
  const localPitch = (p) => {
    const i = clamp(Math.round(p), 0, centers.length - 2);
    return centers[i + 1] - centers[i] || 1;
  };
  const introSize = () => clamp(innerWidth * 0.11, 96, 168);
  const setFrame = (fh, open, fw) => {
    frame.style.setProperty("--fh", `${fh}px`);
    frame.style.setProperty("--open", `${open}px`);
    fw ? frame.style.setProperty("--fw", `${fw}px`) : frame.style.removeProperty("--fw");
  };
  const selectorFrame = () => {
    // --cw vw/clamp olabilir: gerçek pikseli gizli bir ölçü öğesiyle al
    let probe = reel.querySelector(".reel__probe");
    if (!probe) {
      probe = document.createElement("div");
      probe.className = "reel__probe";
      probe.style.cssText = "position:absolute;visibility:hidden;width:var(--cw);height:0;pointer-events:none";
      reel.append(probe);
    }
    const cw = probe.offsetWidth || 180;
    const mobile = innerWidth <= 900;
    frame.classList.toggle("is-h", isH());
    frame.classList.toggle("is-gone", view === "g");
    if (isH()) {
      // yatay: çerçeve 90° döner, yarılar kartın üstünde ve altında
      const ch = items[0] ? items[0].offsetHeight : cw * 1.2;
      setFrame(ch * 1.7, ch / 2 + (mobile ? 8 : 18), ch * 0.34);
    } else {
      // mobilde yarılar ekranda kalsın: açıklık ekran genişliğine göre sınırlanır
      const fh = cw * (mobile ? 0.9 : 1.15);
      const open = mobile
        ? Math.min(cw * 0.7 + 8, innerWidth / 2 - fh / 2 - 10)
        : cw * 0.75 + clamp(innerWidth * 0.05, 36, 110);
      setFrame(fh, open);
    }
  };

  /* ---------- Durum ---------- */
  let pos = N, target = N, active = -1, ready = false;

  const fields = Object.fromEntries($$("[data-f]").map((el) => [el.dataset.f, el]));
  const swap = (el, txt) => {
    if (!el || el.textContent === txt) return;
    el.classList.remove("is-swap");
    void el.offsetWidth;
    el.textContent = txt;
    el.classList.add("is-swap");
  };

  const render = () => {
    const x = -at(pos);
    track.style.transform = isH() ? `translate3d(${x}px, 0, 0)` : `translate3d(0, ${x}px, 0)`;
    items.forEach((it, j) => it.style.setProperty("--d", Math.min(Math.abs(j - pos), 3).toFixed(3)));
    if (list && lh) list.style.transform = `translate3d(0, ${-(pos * lh + lh / 2)}px, 0)`;
  };

  const setActive = (g) => {
    const k = mod(g, N);
    items.forEach((it, j) => {
      const on = j === g;
      it.classList.toggle("is-active", on);
      it.dataset.cursor = on ? "Aç" : "Seç";
    });
    lis.forEach((li, j) => li.classList.toggle("is-active", j === g));
    if (k === active) return;
    active = k;
    const c = CATS[k];
    swap(fields.cat, c.sub || "");
    swap(fields.year, (c.services || []).join(", "));
    swap(fields.idx, pad(k + 1));
  };

  let lastG = null, drawn = null;
  const tick = () => {
    pos += (target - pos) * 0.11;
    if (Math.abs(target - pos) < 0.0005) pos = target;
    // ortadaki kopyanın dışına çıkınca bir set geri/ileri kaydır (görünmez)
    if (pos > 2 * N - 0.5 && target > 2 * N - 0.5) { pos -= N; target -= N; if (drag) drag.t -= N; }
    if (pos < N - 0.5 && target < N - 0.5) { pos += N; target += N; if (drag) drag.t += N; }
    // sütun durunca her karede stil yazmayı bırak (boşta CPU/pil harcamasın)
    if (pos !== drawn) { render(); drawn = pos; }
    const g = Math.round(pos);
    if (g !== lastG) { lastG = g; setActive(g); }
    requestAnimationFrame(tick);
  };

  /* ---------- Etkileşim ---------- */
  let snapT;
  const snap = (delay = 140) => {
    clearTimeout(snapT);
    snapT = setTimeout(() => { target = Math.round(target); }, delay);
  };
  const goReal = (k) => {
    let d = mod(k - active, N);
    if (d > N / 2) d -= N;
    target = Math.round(target) + d;
  };
  const busy = () => !ready || view === "g" || body.classList.contains("menu-open");

  addEventListener("wheel", (e) => {
    if (busy()) return;
    e.preventDefault();
    let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    target += (d / localPitch(target)) * 0.8;
    snap();
  }, { passive: false });

  let drag = null;
  const ptr = (e) => (isH() ? e.clientX : e.clientY);
  reel.addEventListener("pointerdown", (e) => {
    if (busy() || e.button !== 0) return;
    drag = { p: ptr(e), t: target, moved: 0, last: ptr(e), lastT: performance.now(), v: 0, id: e.pointerId };
    reel.classList.add("is-drag");
  });
  reel.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const d = ptr(e) - drag.p;
    drag.moved = Math.max(drag.moved, Math.abs(d));
    // yakalama yalnızca gerçek sürüklemede: basılır basılmaz yakalanırsa tıklama
    // karta değil .reel'e düşer ve ortadaki kart hiç açılmaz
    if (drag.moved > 6 && !reel.hasPointerCapture(drag.id)) reel.setPointerCapture(drag.id);
    const now = performance.now();
    drag.v = (ptr(e) - drag.last) / Math.max(1, now - drag.lastT);
    drag.last = ptr(e); drag.lastT = now;
    target = drag.t - d / (setL / N);
  });
  const endDrag = () => {
    if (!drag) return;
    target = Math.round(target - drag.v * 5); // hafif savrulma
    reel.classList.remove("is-drag");
    const d = drag;
    setTimeout(() => { if (drag === d) drag = null; }, 0);
  };
  reel.addEventListener("pointerup", endDrag);
  reel.addEventListener("pointercancel", endDrag);
  reel.addEventListener("pointerleave", () => { if (drag && !reel.hasPointerCapture(drag.id)) endDrag(); });

  // klavyeyle (Tab) bir karta gelince kartı ortala
  track.addEventListener("focusin", (e) => {
    const it = e.target.closest(".reel__item");
    if (it && !busy()) target = items.indexOf(it);
  });

  // kart tıklaması: sürüklendiyse yok say; ortadaki değilse önce ortala; ortadakiyse kategoriye git
  track.addEventListener("click", (e) => {
    const it = e.target.closest(".reel__item");
    if (!it) return;
    const j = items.indexOf(it);
    const dragged = drag && drag.moved > 6;
    if (busy() || dragged || j !== Math.round(pos)) {
      e.preventDefault();
      e.stopPropagation();
      if (!busy() && !dragged) target = j;
    }
  });

  // soldaki liste: tıklanan kategoriye git; zaten seçiliyse aç
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || busy()) return;
    const k = mod(lis.indexOf(li), N);
    if (k === active && Math.abs(target - pos) < 0.05) items[Math.round(pos)].click();
    else goReal(k);
  });

  addEventListener("keydown", (e) => {
    if (busy()) return;
    const next = isH() ? ["ArrowRight", "ArrowDown", "PageDown"] : ["ArrowDown", "PageDown"];
    const prev = isH() ? ["ArrowLeft", "ArrowUp", "PageUp"] : ["ArrowUp", "PageUp"];
    if (next.includes(e.key)) { e.preventDefault(); target = Math.round(target) + 1; }
    if (prev.includes(e.key)) { e.preventDefault(); target = Math.round(target) - 1; }
    if (e.key === "Enter" && document.activeElement === reel) items[Math.round(pos)].click();
  });

  addEventListener("resize", () => {
    measure();
    if (!body.classList.contains("is-intro")) selectorFrame();
    render();
  });

  /* ---------- Görünüm değiştirme ---------- */
  const viewBtns = $$("[data-view]");
  const markView = () => {
    viewBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
    body.classList.toggle("view-g", view === "g");
    reel.classList.toggle("is-h", isH());
  };
  const setView = async (v, animate = true) => {
    if (v === view && animate) return;
    const keep = mod(Math.round(pos), N);
    if (animate && view !== "g" && v !== "g") {
      reel.classList.add("is-fading");
      await wait(350);
    }
    view = v;
    local && store.set("md-view", v, local);
    markView();
    measure();
    pos = target = N + keep;
    lastG = null;
    render();
    selectorFrame();
    if (animate) { await wait(60); reel.classList.remove("is-fading"); }
    if (v !== "g") reel.focus({ preventScroll: true });
  };
  viewBtns.forEach((b) => b.addEventListener("click", () => ready && setView(b.dataset.view)));

  /* ---------- Seçim ekranına geçiş ---------- */
  const toSelector = async (instant = false) => {
    body.classList.remove("is-intro");
    frame.classList.add("is-drawn", "is-filled", "is-dark");
    markView();
    measure();
    render();
    if (instant) {
      const els = [frame, reel, ...$$(".frame__half, .frame polygon")];
      els.forEach((el) => (el.style.transition = "none"));
      selectorFrame();
      reel.classList.add("is-in");
      void reel.offsetWidth;
      requestAnimationFrame(() => els.forEach((el) => (el.style.transition = "")));
    } else {
      selectorFrame();
      reel.classList.add("is-in");
      await wait(1300);
    }
    ready = true;
    if (view !== "g") reel.focus({ preventScroll: true });
  };

  /* ---------- Açılış ---------- */
  const runCounter = (dur) => new Promise((done) => {
    let loaded = document.readyState === "complete";
    addEventListener("load", () => { loaded = true; });
    let t0 = null, shown = 0;
    const step = (t) => {
      if (t0 === null) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      let tgt = Math.round((1 - Math.pow(1 - p, 1.7)) * 100);
      if (!loaded) tgt = Math.min(tgt, 90);
      if (tgt > shown) shown += Math.max(1, Math.round((tgt - shown) * 0.35));
      shown = Math.min(shown, tgt);
      countEl.textContent = String(shown).padStart(3, "0");
      if (shown >= 100) return done();
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  const runIntro = async () => {
    const fh = introSize();
    document.documentElement.style.setProperty("--fh-intro", `${fh}px`);
    setFrame(fh, 0);
    const counter = runCounter(3800);

    await wait(120);
    frame.classList.add("is-drawn");          // 1) M çizgileri kendini çizer
    await wait(1450);
    frame.classList.add("is-filled");         // 2) M dolar
    await wait(450);

    setFrame(fh, fh * 0.31 + 8);              // 3) yarılar aralanır, arada kareler akar
    await wait(350);
    flash.classList.add("is-on");
    const slides = [...flash.children];
    let k = 0, cycling = true;
    (async () => {
      while (cycling) {
        slides.forEach((s, j) => s.classList.toggle("on", j === k % slides.length));
        k++;
        await wait(130);
      }
    })();

    await counter;
    await wait(250);
    cycling = false;
    flash.classList.remove("is-on");
    countEl.style.opacity = "0";
    await wait(250);

    intro.classList.add("is-out");            // 4) zemin açılır, sütun yükselir, M çerçeve olur
    store.set("md-loaded", "1");
    const done = toSelector(false);
    await wait(1000);
    intro.remove();
    await done;
  };

  /* ---------- Başlat ---------- */
  if (flash) buildFlash();
  triple(track, base);
  items = [...track.children];
  triple(list, [...list.children]);
  lis = [...list.children];
  markView();
  measure();
  render();
  requestAnimationFrame(tick);

  if (!intro || reduced || (!force && store.get("md-loaded"))) {
    intro && intro.remove();
    toSelector(true);
  } else {
    runIntro();
  }
})();
