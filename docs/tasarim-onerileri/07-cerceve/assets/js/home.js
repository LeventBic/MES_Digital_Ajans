/* =========================================================
   Mes Dijital — ana sayfa: açılış + proje seçim ekranı
   Akış: M çizilir → dolar → yarılar aralanıp arada proje kareleri
   hızla değişir → zemin açılır, sütun yükselir, M yarıları seçili
   projenin iki yanına geçip çerçeve olur → kullanıcı seçene kadar bekler
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const force = new URLSearchParams(location.search).has("loader");
  const reduced = !force && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const body = document.body;
  const reel = $(".reel");
  const track = $(".reel__track");
  const items = $$(".reel__item");
  const frame = $(".frame");
  const intro = $(".intro");
  const flash = $(".intro__flash");
  const countEl = $(".intro__count");
  const N = items.length;
  if (!reel || !N) return;

  /* ---------- Ölçüler ---------- */
  let cw = 0, ch = 0, pitch = 0;
  const measure = () => {
    cw = items[0].offsetWidth;
    ch = items[0].offsetHeight;
    pitch = ch + parseFloat(getComputedStyle(items[0]).marginBottom);
  };
  const introSize = () => clamp(innerWidth * 0.11, 96, 168);
  const setFrame = (fh, open) => {
    frame.style.setProperty("--fh", `${fh}px`);
    frame.style.setProperty("--open", `${open}px`);
  };
  const selectorFrame = () => {
    const gapX = clamp(innerWidth * 0.02, 14, 32);
    setFrame(ch * 1.08, cw / 2 + gapX);
  };

  /* ---------- Sütun durumu ---------- */
  let pos = 0, target = 0, active = -1, ready = false;
  const render = () => {
    track.style.transform = `translate3d(-50%, ${-(pos * pitch) - ch / 2}px, 0)`;
    items.forEach((it, i) => it.style.setProperty("--d", Math.min(Math.abs(i - pos), 4).toFixed(3)));
  };

  const fields = Object.fromEntries($$("[data-f]").map((el) => [el.dataset.f, el]));
  const swap = (el, txt) => {
    if (!el || el.textContent === txt) return;
    el.classList.remove("is-swap");
    void el.offsetWidth;
    el.textContent = txt;
    el.classList.add("is-swap");
  };
  const pad = (n) => String(n).padStart(2, "0");
  fields.total && (fields.total.textContent = pad(N));

  const setActive = (i) => {
    if (i === active) return;
    active = i;
    items.forEach((it, k) => {
      it.classList.toggle("is-active", k === i);
      it.dataset.cursor = k === i ? "Aç" : "Seç";
      it.tabIndex = k === i ? 0 : -1;
    });
    const it = items[i];
    swap(fields.idx, pad(i + 1));
    swap(fields.title, it.dataset.title || "");
    swap(fields.cat, it.dataset.cat || "");
    swap(fields.year, it.dataset.date || "");
    fields.pos && (fields.pos.textContent = pad(i + 1));
  };

  const tick = () => {
    pos += (target - pos) * 0.12;
    if (Math.abs(target - pos) < 0.0005) pos = target;
    render();
    setActive(clamp(Math.round(pos), 0, N - 1));
    requestAnimationFrame(tick);
  };

  /* ---------- Etkileşim (yalnızca seçim ekranında) ---------- */
  let snapT;
  const snap = (delay = 140) => {
    clearTimeout(snapT);
    snapT = setTimeout(() => { target = clamp(Math.round(target), 0, N - 1); }, delay);
  };
  const go = (i) => { target = clamp(i, 0, N - 1); };

  addEventListener("wheel", (e) => {
    if (!ready || body.classList.contains("menu-open")) return;
    e.preventDefault();
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    target = clamp(target + dy / pitch * 0.8, -0.35, N - 1 + 0.35);
    snap();
  }, { passive: false });

  let drag = null;
  reel.addEventListener("pointerdown", (e) => {
    if (!ready || e.button !== 0) return;
    drag = { y: e.clientY, t: target, moved: 0, lastY: e.clientY, lastT: performance.now(), v: 0 };
    reel.setPointerCapture(e.pointerId);
    reel.classList.add("is-drag");
  });
  reel.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dy = e.clientY - drag.y;
    drag.moved = Math.max(drag.moved, Math.abs(dy));
    const now = performance.now();
    drag.v = (e.clientY - drag.lastY) / Math.max(1, now - drag.lastT);
    drag.lastY = e.clientY; drag.lastT = now;
    target = clamp(drag.t - dy / pitch, -0.35, N - 1 + 0.35);
  });
  const endDrag = () => {
    if (!drag) return;
    target = clamp(Math.round(target - drag.v * 6), 0, N - 1); // hafif savrulma
    reel.classList.remove("is-drag");
    setTimeout(() => { drag = null; }, 0);
  };
  reel.addEventListener("pointerup", endDrag);
  reel.addEventListener("pointercancel", endDrag);

  // tıklama: sürüklendiyse yok say, seçili değilse önce ortala, seçiliyse sayfaya git
  track.addEventListener("click", (e) => {
    const it = e.target.closest(".reel__item");
    if (!it) return;
    const i = items.indexOf(it);
    if (!ready || (drag && drag.moved > 6) || i !== active) {
      e.preventDefault();
      e.stopPropagation();
      if (ready && !(drag && drag.moved > 6)) go(i);
    }
  });

  addEventListener("keydown", (e) => {
    if (!ready || body.classList.contains("menu-open")) return;
    if (["ArrowDown", "PageDown", "j"].includes(e.key)) { e.preventDefault(); go(Math.round(target) + 1); }
    if (["ArrowUp", "PageUp", "k"].includes(e.key)) { e.preventDefault(); go(Math.round(target) - 1); }
    if (e.key === "Home") go(0);
    if (e.key === "End") go(N - 1);
    if (e.key === "Enter" && document.activeElement === reel) items[active].click();
  });

  addEventListener("resize", () => {
    measure();
    if (!body.classList.contains("is-intro")) selectorFrame();
    render();
  });

  /* ---------- Seçim ekranına geçiş ---------- */
  const toSelector = async (instant = false) => {
    body.classList.remove("is-intro");
    frame.classList.add("is-drawn", "is-filled", "is-dark");
    measure();
    render();
    if (instant) {
      frame.style.transition = "none";
      $$(".frame__half, .frame polygon").forEach((el) => (el.style.transition = "none"));
      selectorFrame();
      reel.style.transition = "none";
      reel.classList.add("is-in");
      void reel.offsetWidth;
      requestAnimationFrame(() => {
        frame.style.transition = "";
        $$(".frame__half, .frame polygon").forEach((el) => (el.style.transition = ""));
        reel.style.transition = "";
      });
    } else {
      selectorFrame();
      reel.classList.add("is-in");
      await wait(1300);
    }
    ready = true;
    reel.focus({ preventScroll: true });
  };

  /* ---------- Açılış ---------- */
  const buildFlash = () => {
    items.forEach((it, i) => {
      const img = it.querySelector("img");
      let slide;
      if (img) {
        slide = document.createElement("img");
        slide.src = img.currentSrc || img.src;
        slide.alt = "";
      } else {
        slide = document.createElement("div");
        slide.className = "ph mono";
        slide.style.backgroundColor = getComputedStyle(it.querySelector(".ph")).backgroundColor;
        slide.textContent = pad(i + 1);
      }
      flash.append(slide);
    });
  };

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
    buildFlash();
    const counter = runCounter(3800);

    await wait(120);
    frame.classList.add("is-drawn");          // 1) M çizgileri kendini çizer
    await wait(1450);
    frame.classList.add("is-filled");         // 2) M dolar
    await wait(450);

    setFrame(fh, fh * 0.31 + 8);              // 3) yarılar aralanır
    await wait(350);
    flash.classList.add("is-on");             //    arada proje kareleri değişir
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
