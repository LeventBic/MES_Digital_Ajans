/* =========================================================
   Mes Dijital — etkileşim katmanı (vanilla JS + Lenis)
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  // ?loader: açılışı her seferinde ve hareket azaltma açıkken bile göster (deneme için)
  const forceLoader = new URLSearchParams(location.search).has("loader");
  if (forceLoader) document.documentElement.classList.add("force-motion");
  const reduced = !forceLoader && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
  };

  /* ---------- Yumuşak kaydırma ---------- */
  let lenis = null;
  if (window.Lenis && !reduced && !document.body.classList.contains("home")) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const scrollY = () => (lenis ? lenis.scroll : window.scrollY);

  /* ---------- Metni kelimelere böl ---------- */
  $$("[data-split]").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(" "); return; }
            const w = document.createElement("span");
            w.className = "w";
            const inner = document.createElement("span");
            inner.textContent = part;
            inner.style.setProperty("--i", i++);
            w.append(inner);
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") {
          walk(n);
        }
      });
    };
    walk(el);
  });

  /* ---------- Görünür olunca aç ---------- */
  // .media başta clip-path ile tamamen kırpılı; Chrome kırpılı öğeyi hiç "görünür" saymaz.
  // Bu yüzden görseller kendileri yerine kapsayıcıları üzerinden izlenir.
  const revealOf = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      (revealOf.get(e.target) || [e.target]).forEach((el) => el.classList.add("is-in"));
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  const armReveals = () => {
    $$("[data-split], [data-reveal]").forEach((el) => io.observe(el));
    $$(".media").forEach((m) => {
      const box = m.parentElement;
      if (!revealOf.has(box)) { revealOf.set(box, []); io.observe(box); }
      revealOf.get(box).push(m);
    });
  };

  /* ---------- Parallax ---------- */
  const parallax = $$("[data-parallax]");
  const tickParallax = () => {
    const vh = innerHeight;
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
      const amt = parseFloat(el.dataset.parallax) || 8;
      el.style.transform = `translate3d(0, ${(-p * amt).toFixed(2)}%, 0)`;
    });
  };

  /* ---------- Header: aşağı kayınca gizle ---------- */
  const header = $(".header");
  let lastY = 0;
  const tickHeader = () => {
    const y = scrollY();
    if (header) header.classList.toggle("is-hidden", y > 120 && y > lastY && !document.body.classList.contains("menu-open"));
    lastY = y;
  };

  const loop = () => { tickParallax(); tickHeader(); requestAnimationFrame(loop); };
  if (!reduced) requestAnimationFrame(loop);

  /* ---------- Preloader (oturumda bir kez) ---------- */
  const loader = $(".loader");
  const start = () => {
    document.body.classList.remove("is-loading");
    armReveals();
  };
  if (loader && (forceLoader || !store.get("md-loaded")) && !reduced) {
    document.body.classList.add("is-loading");
    lenis && lenis.stop();
    scrollTo(0, 0);
    const count = $(".loader__count", loader);
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    // gerçek yüklemeyi de hesaba kat: sayaç, sayfa yüklenmeden 90'ı geçmez
    let loaded = document.readyState === "complete";
    addEventListener("load", () => { loaded = true; });

    const count100 = () => new Promise((done) => {
      const dur = 2200;
      let t0 = null, shown = 0;
      const step = (t) => {
        if (t0 === null) t0 = t;
        const p = Math.min(1, (t - t0) / dur);
        // hafif basamaklı ilerleme: düz sayma yerine "yükleniyor" hissi
        let target = Math.round((1 - Math.pow(1 - p, 1.7)) * 100);
        if (!loaded) target = Math.min(target, 90);
        if (target > shown) shown += Math.max(1, Math.round((target - shown) * 0.35));
        shown = Math.min(shown, target);
        count.textContent = String(shown).padStart(3, "0");
        if (shown >= 100) return done();
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });

    (async () => {
      await wait(120);
      loader.classList.add("is-ready");      // M çizgileri kendini çizer
      await wait(1500);
      loader.classList.add("is-breathing");  // yarılar hafifçe nefes alır
      await count100();                      // 000 → 100
      await wait(180);
      loader.classList.add("is-split");      // M aralanır
      await wait(650);
      loader.classList.add("is-done");       // perde ikiye yarılır
      await wait(350);
      document.body.classList.remove("is-loading");
      lenis && lenis.start();
      start();                               // hero başlığı yükselir
      store.set("md-loaded", "1");
      await wait(1100);
      loader.remove();
    })();
  } else {
    loader && loader.classList.add("is-skip");
    // sayfa geçişi perdesini kaldır
    const curtain = $(".curtain");
    if (curtain && store.get("md-transition")) {
      curtain.style.transition = "none";
      curtain.classList.add("is-in");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        curtain.style.transition = "";
        curtain.classList.remove("is-in");
        curtain.classList.add("is-out");
      }));
      store.set("md-transition", "");
    }
    start();
  }

  /* ---------- Sayfa geçişi (iç linkler) ---------- */
  const curtain = $(".curtain");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || !curtain || reduced) return;
    const href = a.getAttribute("href");
    if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (!href || href.startsWith("#") || /^(mailto|tel|https?):/.test(href)) return;
    e.preventDefault();
    curtain.classList.remove("is-out");
    void curtain.offsetWidth;
    curtain.classList.add("is-in");
    store.set("md-transition", "1");
    setTimeout(() => { location.href = href; }, 720);
  });
  // geri tuşu ile önbellekten dönüşte perdeyi aç
  addEventListener("pageshow", (e) => { if (e.persisted && curtain) { curtain.classList.remove("is-in"); curtain.classList.add("is-out"); } });

  /* ---------- Çapa linkleri Lenis ile ---------- */
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length < 2) { e.preventDefault(); return; } // boş "#": geçersiz seçici, sayfa başa zıplamasın
    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { offset: 0 }) : target.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  }));

  /* ---------- Mobil menü ---------- */
  const menuBtn = $(".menu-btn");
  const menu = $(".mobile-menu");
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuBtn && (menuBtn.textContent = "Menü", menuBtn.setAttribute("aria-expanded", "false"));
    lenis && lenis.start();
  }
  menuBtn && menuBtn.addEventListener("click", () => {
    const open = !menu.classList.contains("is-open");
    if (!open) return closeMenu();
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuBtn.textContent = "Kapat";
    menuBtn.setAttribute("aria-expanded", "true");
    lenis && lenis.stop();
    const first = $("a, button", menu);
    first && first.focus({ preventScroll: true });
  });
  addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !menu || !menu.classList.contains("is-open")) return;
    closeMenu();
    menuBtn && menuBtn.focus();
  });

  /* ---------- Sosyal medya bağlantıları (data.js → agency.social) ---------- */
  // adres boşsa bağlantı yerine soluk metin: tıklanıp hiçbir yere gitmeyen "#" kalmasın
  const social = (window.MD_DATA && window.MD_DATA.agency && window.MD_DATA.agency.social) || {};
  $$("[data-social]").forEach((box) => {
    const asList = box.tagName === "UL";
    Object.entries(social).forEach(([name, url]) => {
      const el = document.createElement(url ? "a" : "span");
      el.textContent = asList && url ? `${name} ↗` : name;
      if (url) {
        el.href = url; el.target = "_blank"; el.rel = "noopener";
        el.dataset.magnet = "";
      } else {
        el.className = "muted";
        el.title = "Hesap henüz eklenmedi";
      }
      if (asList) { const li = document.createElement("li"); li.append(el); box.append(li); }
      else box.append(el);
    });
  });

  /* ---------- Yatay görsel şeridi: fareyle sürükleyerek kaydır ---------- */
  $$(".strip").forEach((strip) => {
    let d = null, suppress = false;
    strip.addEventListener("click", (e) => { if (suppress) { e.preventDefault(); e.stopPropagation(); } }, true);
    strip.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      e.preventDefault(); // metin seçimi / görsel sürükleme başlamasın
      d = { x: e.clientX, left: strip.scrollLeft, moved: 0 };
      strip.classList.add("is-drag");
    });
    addEventListener("pointermove", (e) => {
      if (!d) return;
      d.moved = Math.max(d.moved, Math.abs(e.clientX - d.x));
      strip.scrollLeft = d.left - (e.clientX - d.x);
    });
    addEventListener("pointerup", () => {
      if (!d) return;
      // sürükleme sonrası gelen tıklama bağlantı açmasın
      suppress = d.moved > 6;
      d = null;
      strip.classList.remove("is-drag");
      setTimeout(() => { suppress = false; }, 0);
    });
  });

  /* ---------- Hizmet akordeonu ---------- */
  $$(".services button").forEach((b) => b.addEventListener("click", () => {
    const li = b.closest("li");
    const open = li.classList.toggle("is-open");
    b.setAttribute("aria-expanded", String(open));
  }));

  /* ---------- Özel imleç ---------- */
  const cursor = $(".cursor");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const cur = { ...pos };
  if (cursor && fine) {
    addEventListener("mousemove", (e) => { pos.x = e.clientX; pos.y = e.clientY; });
    const follow = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      cursor.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      requestAnimationFrame(follow);
    };
    follow();
    const label = $(".cursor__label", cursor);
    document.addEventListener("mouseover", (e) => {
      const view = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button");
      cursor.classList.toggle("is-view", !!view);
      cursor.classList.toggle("is-hover", !view && !!link);
      if (view) label.textContent = view.dataset.cursor;
    });
  } else if (cursor) {
    cursor.remove();
  }

  /* ---------- İş listesi hover önizleme ---------- */
  const works = $(".works");
  const preview = $(".preview");
  if (works && preview && fine) {
    const track = $(".preview__track", preview);
    const p = { x: 0, y: 0 }, c = { x: 0, y: 0 };
    works.addEventListener("mousemove", (e) => { p.x = e.clientX; p.y = e.clientY; });
    $$("li", works).forEach((li, idx) => {
      li.addEventListener("mouseenter", () => {
        preview.classList.add("is-on");
        track.style.transform = `translateY(${-idx * 100}%)`;
      });
    });
    works.addEventListener("mouseleave", () => preview.classList.remove("is-on"));
    const move = () => {
      c.x += (p.x - c.x) * 0.12;
      c.y += (p.y - c.y) * 0.12;
      const w = preview.offsetWidth, h = preview.offsetHeight;
      preview.style.left = `${c.x - w / 2}px`;
      preview.style.top = `${c.y - h / 2}px`;
      requestAnimationFrame(move);
    };
    move();
  }

  /* ---------- Mıknatıslı öğeler ---------- */
  if (fine && !reduced) {
    $$("[data-magnet]").forEach((el) => {
      const s = parseFloat(el.dataset.magnet) || 0.3;
      el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Uşak yerel saati ---------- */
  const clock = $$("[data-clock]");
  if (clock.length) {
    const fmt = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Istanbul" });
    const tick = () => clock.forEach((c) => (c.textContent = fmt.format(new Date())));
    tick(); setInterval(tick, 1000);
  }
  $$("[data-year]").forEach((y) => (y.textContent = new Date().getFullYear()));

  /* ---------- Gece / gündüz ---------- */
  window.mdTheme && window.mdTheme.sync();
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-theme-toggle]")) window.mdTheme && window.mdTheme.toggle();
  });
})();
