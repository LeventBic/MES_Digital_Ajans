/* =========================================================
   Mes Dijital — ana sayfa: açılış + kategori seçim ekranı
   Akış: M çizilir → dolar → yarılar aralanıp arada kareler akar →
   zemin açılır, sütun yükselir, M yarıları ortadaki kartın iki yanına
   geçip çerçeve olur → kullanıcı seçene kadar bekler.

   Görünümler: Dikey (v), Yatay (h), Izgara (g). Seçim tarayıcıda hatırlanır.
   Sütun ve soldaki liste sonsuz döngüdür: öğeler üç kopya halinde
   dizilir, konum ortadaki kopyanın dışına çıkınca bir set kaydırılır.
   İçerik assets/js/data.js'ten gelir.

   Portfolyo görünümü: ortadaki karta (ya da ızgaradaki karta) tıklayınca
   sayfa değişmeden kategori görünümü açılır; adres index.html?k=slug olur,
   tarayıcının geri tuşu, "Geri" ve Esc kapatır (aşağıda "Portfolyo" bölümü).
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
    `<a class="reel__item${shapeCls[c.shape] || ""}" href="index.html?k=${encodeURIComponent(c.slug)}" draggable="false">${media(c, i)}</a>`
  ).join("");
  list.innerHTML = CATS.map((c) => `<li><button type="button">${esc(c.name)}</button></li>`).join("");
  gridv.innerHTML = CATS.map((c, i) => `
    <a class="gcard" href="index.html?k=${encodeURIComponent(c.slug)}" style="--i:${i}" data-k="${i}" data-cursor="Aç">
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
    if (pf !== null) gTick(); // portfolyonun görsel sütunu da aynı döngüde akar
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
  // portfolyo açıkken (pf) seçici tekerlek/ok/sürüklemeye tepki vermez
  const busy = () => !ready || view === "g" || body.classList.contains("menu-open") || pf !== null;

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

  // kart tıklaması: sürüklendiyse yok say; ortadaki değilse önce ortala; ortadakiyse portfolyoyu aç
  track.addEventListener("click", (e) => {
    const it = e.target.closest(".reel__item");
    if (!it) return;
    const j = items.indexOf(it);
    const dragged = drag && drag.moved > 6;
    if (busy() || dragged || j !== Math.round(pos)) {
      e.preventDefault();
      e.stopPropagation();
      if (!busy() && !dragged) target = j;
      return;
    }
    // Ctrl/Cmd/Shift ile tıklama: bağlantı (index.html?k=…) yeni sekmede açılsın
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    // main.js'in belge düzeyindeki perde geçişine ulaşmasın
    e.preventDefault();
    e.stopPropagation();
    openPf(mod(j, N));
  });

  // ızgara kartı: sayfaya gitmek yerine portfolyoyu aç
  gridv.addEventListener("click", (e) => {
    const card = e.target.closest(".gcard");
    if (!card || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
    if (ready && pf === null) openPf(Number(card.dataset.k));
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
    if (!body.classList.contains("is-intro")) (pf !== null ? pfFrame() : selectorFrame());
    render();
    if (pf !== null) gMeasure(false);
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

  /* =========================================================
     Portfolyo görünümü
     Obys'in proje görünümünün yapısı ve hareketi, kendi kodumuzla:
     1) seçici çekilir (liste satırları yukarı maskelenir, kartlar söner),
        M yarıları ortada kapanır, üstte ince çizgi soldan sağa dolar
     2) yazı logo sol üste küçülür, bilgiler satır satır açılır,
        görseller sağdan sırayla gelir
     Geri, Esc ya da tarayıcının geri tuşu tersini oynatır; seçici aynı
     kartta ve aynı görünümde (Dikey / Yatay / Izgara) kalır.
     ========================================================= */
  const stage = $(".stage");
  const pfEl = $(".pf");
  const pfTitle = $(".pf__title");
  const gallery = $(".pf__gallery");
  const gTrack = $(".pf__track");
  const bar = $(".pf-bar");
  const pfF = Object.fromEntries($$("[data-pf]").map((el) => [el.dataset.pf, el]));
  const baseTitle = document.title;
  const slugIndex = (s) => (s ? CATS.findIndex((c) => c.slug === s) : -1);

  let pf = null;          // açık kategorinin sırası (kapalıyken null)
  let pfBusy = false;     // açılış / kapanış hareketi sürüyor
  let pfPushed = false;   // arkada ana sayfa kaydı var mı (Geri → history.back)
  let pfWantClose = false;

  // bir değişikliği geçişsiz uygula: html.pf-snap iki kare boyunca tüm geçişleri kapatır
  const instantly = (fn) => {
    const root = document.documentElement;
    root.classList.add("pf-snap");
    fn();
    void body.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("pf-snap")));
  };

  // kapanmış M: iki yarı bitişik, ekranın ortasında ~9vw
  const pfFrame = () => setFrame(clamp(innerWidth * 0.09, 72, 150), 0);

  /* ---------- Görseller: her çalışmanın kapağı (varsa) + ekran görüntüleri ---------- */
  const ratioOf = (r) => {
    const [a, b] = String(r || "16x9").split("x").map(Number);
    return a && b ? [a, b] : [16, 9];
  };
  const pfShots = (c) => (c.works || []).flatMap((w, wi) =>
    [...(w.cover ? [{ src: w.cover, ratio: "16x9", caption: "" }] : []), ...(w.shots || [])]
      .map((s) => ({ ...s, w, wi })));

  const buildGallery = (c) => {
    gTrack.innerHTML = pfShots(c).map((s, i) => {
      const [a, b] = ratioOf(s.ratio);
      const wide = a / b > 1.2; // yatay / geniş kareler 50vw, dikey olanlar 42.5vw
      const href = `proje.html?k=${encodeURIComponent(c.slug)}&p=${encodeURIComponent(s.w.slug)}`;
      const media = s.src
        ? `<img src="${esc(s.src)}" alt="${esc(s.caption || s.w.title)}" loading="lazy" draggable="false">`
        : `<div class="ph mono tone-${(i % 4) + 1}"><span>Çalışma ${pad(s.wi + 1)} — ${a}:${b}</span></div>`;
      return `<a class="pf__item${wide ? " is-wide" : ""}" href="${href}" data-cursor="Aç" draggable="false"><div class="pf__media" style="aspect-ratio:${a} / ${b}">${media}</div></a>`;
    }).join("");
  };

  /* ---------- Sonsuz sütun ----------
     Her öğenin set içindeki yeri (o) sabit; ekrandaki yeri
     y = mod(o - kaydırma + pay, setBoyu) - pay. Böylece son görselden sonra
     yine ilki gelir. Set ekranı dolduramayacak kadar kısaysa kopyalanır. */
  let gItems = [], gS = 0, gPad = 0, gVh = 0, gCur = 0, gTarget = 0, gDrawn = null, gDrag = null;
  const gPlace = () => {
    if (!gS) return;
    // tam piksele yuvarla: yarım pikselde iki karenin arasında ince çizgi görünür
    const c = Math.round(gCur);
    gItems.forEach((it) => {
      it.y = mod(it.o - c + gPad, gS) - gPad;
      it.el.style.transform = `translate3d(0, ${it.y}px, 0)`;
    });
  };
  const gMeasure = (reset = true) => {
    const frac = gS ? gCur / gS : 0;
    $$(".is-clone", gTrack).forEach((n) => n.remove());
    const base = [...gTrack.children];
    gVh = gallery.clientHeight || innerHeight;
    let off = 0, maxH = 0;
    // yükseklik oran + genişlikten gelir; tam piksele sabitlenir ki kareler arasında boşluk kalmasın
    base.forEach((el) => (el.firstElementChild.style.height = ""));
    const hs = base.map((el) => Math.round(el.getBoundingClientRect().height));
    gItems = base.map((el, j) => {
      const h = hs[j];
      el.firstElementChild.style.height = `${h}px`;
      const it = { el, o: off, h };
      off += h; maxH = Math.max(maxH, h);
      return it;
    });
    gS = 0;
    if (!off) return;
    let copies = 1;
    while (off * copies < gVh + maxH * 2) copies++;
    for (let n = 1; n < copies; n++) base.forEach((el, j) => {
      const cl = el.cloneNode(true);
      cl.classList.add("is-clone");
      cl.setAttribute("aria-hidden", "true");
      cl.tabIndex = -1;
      gTrack.append(cl);
      gItems.push({ el: cl, o: gItems[j].o + n * off, h: gItems[j].h });
    });
    gS = off * copies;
    gPad = maxH;
    // ilk açılışta ilk görsel dikeyde ortada (üstünde döngüden son görsel görünür)
    gCur = gTarget = reset ? gItems[0].h / 2 - gVh / 2 : frac * gS;
    gDrawn = null;
    gPlace();
  };
  const gTick = () => {
    gCur += (gTarget - gCur) * (reduced ? 1 : 0.1);
    if (Math.abs(gTarget - gCur) < 0.05) gCur = gTarget;
    // sayılar büyüyüp durmasın: birkaç tur ötedeyse ikisini birlikte geri al
    if (gS && Math.abs(gCur) > gS * 4) {
      const s = Math.trunc(gCur / gS) * gS;
      gCur -= s; gTarget -= s;
      if (gDrag) gDrag.t -= s;
    }
    if (gCur !== gDrawn) { gPlace(); gDrawn = gCur; }
  };

  /* ---------- Aç / kapat ---------- */
  const openPf = async (k, { push = true, instant = false } = {}) => {
    const c = CATS[k];
    if (!c || pf !== null || pfBusy) return;
    pf = k; pfBusy = true; pfWantClose = false;
    pfPushed = !instant; // doğrudan ?k= ile gelindiyse arkada ana sayfa kaydı yok
    const url = `${location.pathname}?k=${encodeURIComponent(c.slug)}`;
    if (push) history.pushState({ pf: c.slug }, "", url);
    else history.replaceState({ pf: c.slug }, "", url);

    // seçici bu kartta dursun: kapanınca aynı kart ortada olur
    if (mod(Math.round(pos), N) !== k) pos = target = N + k;
    else pos = target = Math.round(pos);
    drawn = null;

    pfF.name.textContent = c.name;
    pfF.sub.textContent = c.sub || "";
    pfF.services.textContent = (c.services || []).join(", ");
    pfF.link.href = `kategori.html?k=${encodeURIComponent(c.slug)}`;
    gallery.setAttribute("aria-label", `${c.name} — çalışma görselleri`);
    buildGallery(c);
    document.title = `${c.name} — Mes Dijital`;

    const leave = () => {
      pfEl.hidden = false;
      stage.inert = true;               // gizlenen seçici klavye ve ekran okuyucudan da çıkar
      body.classList.add("pf-out");
      frame.classList.add("is-pf");
      pfFrame();
      gMeasure(true);
    };

    if (instant || reduced) {
      instantly(() => { leave(); body.classList.add("pf-on"); });
      pfTitle.focus({ preventScroll: true });
    } else {
      leave();
      bar.classList.remove("is-run", "is-done");
      void bar.offsetWidth;
      bar.classList.add("is-run");       // üst çizgi dolar
      await wait(600);
      bar.classList.add("is-done");
      // ekrandaki görseller yukarıdan aşağı sırayla gelsin, sütun hafifçe yukarı otursun
      gItems
        .map((it) => ({ it, y: mod(it.o - gTarget + gPad, gS) - gPad }))
        .filter((x) => x.y < gVh && x.y + x.it.h > 0)
        .sort((a, b) => a.y - b.y)
        .forEach((x, n) => x.it.el.style.setProperty("--k", n));
      gCur = gTarget - 90;
      body.classList.add("pf-on");
      pfTitle.focus({ preventScroll: true });
      await wait(450);
      bar.classList.remove("is-run", "is-done");
      await wait(650);
    }
    pfBusy = false;
    if (pfWantClose) closePf();
  };

  const closePf = async () => {
    if (pf === null) return;
    if (pfBusy) { pfWantClose = true; return; }
    pfBusy = true;
    const k = pf;
    const back = () => {
      body.classList.remove("pf-out");
      stage.inert = false;
      // karışımı renk geçişi kapalıyken kaldır: yoksa çerçeve bir an beyaz görünür
      frame.style.transition = "opacity .5s, transform 1.1s var(--ease-io)";
      frame.classList.remove("is-pf");
      void frame.offsetWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => { frame.style.transition = ""; }));
      selectorFrame();
    };
    if (reduced) {
      instantly(() => { body.classList.remove("pf-on"); back(); });
    } else {
      body.classList.remove("pf-on");   // bilgiler kapanır, görseller sağa çekilir, logo büyür
      await wait(450);
      back();                           // liste, kartlar ve açık çerçeve geri gelir
      await wait(900);
    }
    document.title = baseTitle;
    pfEl.hidden = true;
    gTrack.innerHTML = "";
    gItems = []; gS = 0;
    pf = null; pfBusy = false; pfPushed = false;
    if (view === "g") {
      const card = $(`.gcard[data-k="${k}"]`, gridv);
      card && card.focus({ preventScroll: true });
    } else {
      reel.focus({ preventScroll: true });
    }
  };

  // Geri / Esc / logo: bizim eklediğimiz kayıt varsa tarayıcı geçmişinde geri git
  // (popstate kapatır), yoksa adresi temizleyip doğrudan kapat
  const requestClose = () => {
    if (pf === null) return;
    if (pfPushed && history.state && history.state.pf) history.back();
    else { history.replaceState(null, "", location.pathname); closePf(); }
  };

  addEventListener("popstate", () => {
    const k = slugIndex(new URLSearchParams(location.search).get("k"));
    if (k >= 0 && pf === null) openPf(k, { push: false });
    else if (k < 0 && pf !== null) closePf();
  });

  /* ---------- Portfolyoda etkileşim ---------- */
  pfEl.addEventListener("click", (e) => {
    if (!e.target.closest(".pf__back") || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation(); // main.js perde geçişi yapmasın
    requestClose();
  });
  // üst banttaki ana sayfa bağlantıları (logo, "Kategoriler") görünümü kapatır
  $(".top").addEventListener("click", (e) => {
    const a = e.target.closest('a[href="index.html"]');
    if (!a || pf === null || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
    requestClose();
  });

  // tekerlek sayfanın her yerinde sütunu kaydırır
  addEventListener("wheel", (e) => {
    if (pf === null || body.classList.contains("menu-open")) return;
    e.preventDefault();
    let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    else if (e.deltaMode === 2) d *= gVh;
    gTarget += d;
  }, { passive: false });

  // sürükleme (fare ve dokunma)
  gallery.addEventListener("pointerdown", (e) => {
    if (pf === null || e.button !== 0) return;
    gDrag = { y: e.clientY, t: gTarget, moved: 0, last: e.clientY, lastT: performance.now(), v: 0, id: e.pointerId };
  });
  gallery.addEventListener("pointermove", (e) => {
    if (!gDrag) return;
    const d = e.clientY - gDrag.y;
    gDrag.moved = Math.max(gDrag.moved, Math.abs(d));
    // yakalama yalnızca gerçek sürüklemede: basılır basılmaz yakalanırsa bağlantı tıklanmaz
    if (gDrag.moved > 6 && !gallery.hasPointerCapture(gDrag.id)) {
      gallery.setPointerCapture(gDrag.id);
      gallery.classList.add("is-drag");
    }
    const now = performance.now();
    gDrag.v = (e.clientY - gDrag.last) / Math.max(1, now - gDrag.lastT);
    gDrag.last = e.clientY; gDrag.lastT = now;
    gTarget = gDrag.t - d;
  });
  const gEnd = () => {
    if (!gDrag) return;
    if (performance.now() - gDrag.lastT < 80) gTarget -= gDrag.v * 220; // hafif savrulma
    gallery.classList.remove("is-drag");
    const d = gDrag;
    setTimeout(() => { if (gDrag === d) gDrag = null; }, 0);
  };
  gallery.addEventListener("pointerup", gEnd);
  gallery.addEventListener("pointercancel", gEnd);
  gallery.addEventListener("pointerleave", () => { if (gDrag && !gallery.hasPointerCapture(gDrag.id)) gEnd(); });
  // sürükleme sonrası gelen tıklama çalışmayı açmasın
  gallery.addEventListener("click", (e) => {
    if (gDrag && gDrag.moved > 6) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // Tab ile gelinen görsel ekranda değilse sütunu ona kaydır
  gallery.addEventListener("focusin", (e) => {
    const it = gItems.find((x) => x.el === e.target.closest(".pf__item"));
    if (!it || !gS) return;
    const y = mod(it.o - gTarget + gPad, gS) - gPad;
    if (y < 0 || y + it.h > gVh) gTarget += y - Math.max(0, (gVh - it.h) / 2);
  });

  // oklar ve Esc (yakalama aşamasında: menü açıkken Esc'yi main.js'e bırak)
  addEventListener("keydown", (e) => {
    if (pf === null || body.classList.contains("menu-open")) return;
    if (e.key === "Escape") { e.preventDefault(); requestClose(); return; }
    const step = { ArrowDown: 140, ArrowUp: -140, PageDown: gVh * 0.85, PageUp: -gVh * 0.85 }[e.key];
    if (step) { e.preventDefault(); gTarget += step; }
  }, true);

  /* ---------- Başlat ---------- */
  // index.html?k=slug: açılış animasyonu atlanır, görünüm geçişsiz açılır
  const deepK = slugIndex(new URLSearchParams(location.search).get("k"));
  if (deepK >= 0) { pos = target = N + deepK; store.set("md-loaded", "1"); }

  if (flash) buildFlash();
  triple(track, base);
  items = [...track.children];
  triple(list, [...list.children]);
  lis = [...list.children];
  markView();
  measure();
  render();
  requestAnimationFrame(tick);

  if (!intro || reduced || deepK >= 0 || (!force && store.get("md-loaded"))) {
    intro && intro.remove();
    toSelector(true);
    if (deepK >= 0) openPf(deepK, { push: false, instant: true });
  } else {
    runIntro();
  }
})();
