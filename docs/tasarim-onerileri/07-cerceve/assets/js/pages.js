/* =========================================================
   Mes Dijital — kategori ve proje sayfalarını data.js'ten çizer.
   main.js'ten ÖNCE yüklenir: açılma efektleri üretilen içeriğe de uygulanır.
     kategori.html?k=<kategori>
     proje.html?k=<kategori>&p=<çalışma>
   ========================================================= */
(() => {
  const DATA = window.MD_DATA;
  const root = document.querySelector("[data-page]");
  if (!DATA || !root) return;

  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const q = new URLSearchParams(location.search);
  const CATS = DATA.categories;
  const ci = CATS.findIndex((c) => c.slug === q.get("k"));
  const cat = CATS[ci];
  const setDesc = (t) => { const m = document.querySelector('meta[name="description"]'); if (m && t) m.content = t; };
  const catUrl = (c) => `kategori.html?k=${encodeURIComponent(c.slug)}`;
  const workUrl = (c, w) => `proje.html?k=${encodeURIComponent(c.slug)}&p=${encodeURIComponent(w.slug)}`;
  const ratioCls = { "16x9": "r-16x9", "21x9": "r-21x9", "4x5": "r-4x5", "3x4": "r-3x4", "1x1": "r-1x1" };

  // görsel ya da yer tutucu; data-parallax ile hafif kayma
  const shot = (s, label, extra = "") => {
    const r = ratioCls[s?.ratio] || "r-16x9";
    const inner = s?.src
      ? `<img src="${esc(s.src)}" alt="${esc(s.caption || label)}" loading="lazy">`
      : `<div class="ph mono">${esc(label)} — ${esc((s?.ratio || "16x9").replace("x", ":"))}</div>`;
    return `<div class="media ${r}" ${extra}><div class="media__inner" data-parallax="6">${inner}</div></div>`;
  };

  const page = root.dataset.page;

  /* ---------- Ajans sayfası: hizmetler = kategoriler ---------- */
  if (page === "ajans") {
    const ul = root.querySelector('[data-fill="services"]');
    if (ul) ul.innerHTML = CATS.map((c) => `<li><a href="${catUrl(c)}">${esc(c.name)}</a></li>`).join("");
    // katalog kartları sırayla kategorilere bağlanır
    root.querySelectorAll("#katalog .card").forEach((a, i) => {
      const c = CATS[i % CATS.length];
      a.href = catUrl(c);
      const t = a.querySelector(".card__title");
      const m = a.querySelector(".card > .mono.muted, :scope > .mono.muted");
      if (t) t.textContent = c.name;
      if (m) m.textContent = c.sub;
    });
    return;
  }

  // bilinmeyen ya da eksik kategori adresi: sessizce ilk kategoriyi göstermek yerine ana sayfaya dön
  if (!cat) { location.replace("index.html"); return; }

  /* ---------- Kategori sayfası ---------- */
  if (page === "kategori") {
    document.title = `${cat.name} — ${DATA.agency.name}`;
    setDesc(`${DATA.agency.name} ${cat.name} hizmetleri: ${(cat.services || []).join(", ")}. ${DATA.agency.city} merkezli dijital ajans.`);
    const next = CATS[(ci + 1) % CATS.length];
    const works = cat.works || [];

    const workBlock = (w, i) => {
      const s = w.shots || [];
      const cover = w.cover ? { src: w.cover, ratio: "16x9", caption: w.title } : s[0];
      const side = s.find((x, j) => j > 0 && (x.ratio === "4x5" || x.ratio === "3x4")) || s[1];
      const flip = i % 2 === 1;
      return `
      <article class="work">
        <a class="work__link" href="${workUrl(cat, w)}" data-cursor="Aç">
          <div class="grid work__head">
            <span class="mono muted work__n">${pad(i + 1)}</span>
            <h2 class="h2 work__title">${esc(w.title)}</h2>
            <span class="mono muted work__meta">${esc(w.client)} — ${esc(w.year)}</span>
          </div>
          <div class="grid work__media${flip ? " is-flip" : ""}">
            <div class="work__main">${shot(cover, "Ekran görüntüsü")}</div>
            <div class="work__side">${shot(side, "Ekran görüntüsü")}</div>
          </div>
          <div class="work__foot mono"><span class="muted">${esc(w.sector)}</span><span class="work__open">Projeyi aç <span aria-hidden="true">→</span></span></div>
        </a>
      </article>`;
    };

    root.innerHTML = `
    <section class="case-hero wrap">
      <div class="grid case-hero__top">
        <a class="back mono" href="index.html"><span class="arr">←</span> Kategoriler</a>
        <h1 class="h1 cat-title" data-split>${esc(cat.name)}</h1>
      </div>
      <div class="grid case-info">
        <div data-reveal><span class="mono muted">Kategori</span><span>${pad(ci + 1)} / ${pad(CATS.length)}</span></div>
        <div data-reveal><span class="mono muted">Odak</span><span>${esc(cat.sub)}</span></div>
        <div data-reveal><span class="mono muted">Hizmetler</span><span>${(cat.services || []).map(esc).join(", ")}</span></div>
        <div data-reveal><span class="mono muted">Çalışmalar</span><span>${pad(works.length)}</span></div>
      </div>
    </section>

    <section class="wrap case-media-full">
      ${shot(cat.cover ? { src: cat.cover, ratio: "21x9" } : { ratio: "21x9" }, `${cat.name} — kapak`)}
    </section>

    <section class="wrap grid case-block case-text">
      <p class="mono">(01) Yaklaşım</p>
      <p class="lead" data-split>${esc(cat.intro)}</p>
    </section>

    <section class="wrap grid case-block services-row">
      <p class="mono">(02) Hizmetler</p>
      <ol class="svc">
        ${(cat.services || []).map((s, i) => `<li data-reveal><span class="mono muted">${pad(i + 1)}</span><span>${esc(s)}</span></li>`).join("")}
      </ol>
    </section>

    <section class="wrap case-block works-list">
      <div class="grid section__head">
        <p class="mono">(03) Çalışmalar</p>
        <h2 class="h1" data-split>Seçili işler</h2>
      </div>
      ${works.map(workBlock).join("") || `<p class="mono muted" style="padding-top:40px">[ Bu kategoriye henüz çalışma eklenmedi. ]</p>`}
    </section>

    <section class="wrap">
      <a class="next" href="${catUrl(next)}" data-cursor="Sonraki">
        <div class="next__row mono muted"><span>Sonraki kategori</span><span>→</span></div>
        <p class="h1">${esc(next.name)}</p>
      </a>
    </section>`;
  }

  /* ---------- Proje sayfası ---------- */
  if (page === "proje") {
    const works = cat.works || [];
    const wi = works.findIndex((w) => w.slug === q.get("p"));
    const w = works[wi];
    if (!w) { location.replace(catUrl(cat)); return; }
    document.title = `${w.title} — ${DATA.agency.name}`;
    setDesc(`${w.title} — ${w.client}, ${cat.name}. ${DATA.agency.name} çalışması.`);

    // sonraki çalışma: aynı kategoride, bitince sonraki kategorinin ilki
    let nc = cat, nw = works[wi + 1];
    if (!nw) {
      for (let s = 1; s <= CATS.length; s++) {
        const c = CATS[(ci + s) % CATS.length];
        if (c.works && c.works.length) { nc = c; nw = c.works[0]; break; }
      }
    }

    // kapak: ayrı bir kapak görseli varsa o, yoksa ilk yatay ekran görüntüsü.
    // Kapak olarak kullanılan görüntü aşağıda tekrar edilmez, geri kalan hiçbiri de düşmez.
    const shots = w.shots || [];
    const hi = w.cover ? -1 : Math.max(0, shots.findIndex((s) => s.ratio === "16x9" || s.ratio === "21x9"));
    const hero = w.cover ? { src: w.cover, ratio: "16x9", caption: w.title } : shots[hi];
    const rest = shots.filter((_, i) => i !== hi);

    // kalanları orana göre grupla: yatay tam genişlik, 4:5 ve 1:1 ikili, 3:4 üçlü
    const rows = [];
    for (let i = 0; i < rest.length; ) {
      const r = rest[i].ratio;
      if (r === "4x5" || r === "3x4" || r === "1x1") {
        const per = r === "3x4" ? 3 : 2;
        const group = [];
        while (i < rest.length && rest[i].ratio === r && group.length < per) group.push(rest[i++]);
        rows.push(group);
      } else rows.push([rest[i++]]);
    }
    let n = hero ? 1 : 0;
    const rowHtml = rows.map((g) => {
      const span = g.length === 1 ? "span-12" : g.length === 2 ? "span-6" : "span-4";
      return `<section class="wrap grid case-block">${g.map((s) => {
        n++;
        return `<figure class="${span} shot">${shot(s, "Ekran görüntüsü")}<figcaption class="caption mono muted"><span>${esc(s.caption)}</span><span>${pad(n)}</span></figcaption></figure>`;
      }).join("")}</section>`;
    }).join("");

    root.innerHTML = `
    <section class="case-hero wrap">
      <div class="grid case-hero__top">
        <a class="back mono" href="${catUrl(cat)}"><span class="arr">←</span> ${esc(cat.name)}</a>
        <h1 class="h1" data-split>${esc(w.title)}</h1>
      </div>
      <div class="grid case-info">
        <div data-reveal><span class="mono muted">Müşteri</span><span>${esc(w.client)}</span></div>
        <div data-reveal><span class="mono muted">Kategori</span><a href="${catUrl(cat)}" class="live">${esc(cat.name)}</a></div>
        <div data-reveal><span class="mono muted">Hizmetler</span><span>${(cat.services || []).map(esc).join(", ")}</span></div>
        <div data-reveal><span class="mono muted">${esc(w.year)}</span>${w.live
          ? `<a class="live" href="${esc(w.live)}" target="_blank" rel="noopener">Canlı Site <span>↗</span></a>`
          : `<span class="muted">[ Canlı site bağlantısı ]</span>`}</div>
      </div>
    </section>

    <section class="wrap case-media-full">
      ${hero ? `<figure class="shot">${shot(hero, "Kapak")}<figcaption class="caption mono muted"><span>${esc(hero.caption)}</span><span>01</span></figcaption></figure>` : ""}
    </section>

    <section class="wrap grid case-block case-text">
      <p class="mono">(01) Proje</p>
      <p class="lead" data-split>${esc(w.summary)}</p>
    </section>

    ${rowHtml}

    <section class="wrap">
      <a class="next" href="${workUrl(nc, nw)}" data-cursor="Sonraki">
        <div class="next__row mono muted"><span>Sonraki çalışma — ${esc(nc.name)}</span><span>→</span></div>
        <p class="h1">${esc(nw.title)}</p>
      </a>
    </section>`;
  }
})();
