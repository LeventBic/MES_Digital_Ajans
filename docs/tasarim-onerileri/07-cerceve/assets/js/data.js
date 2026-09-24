/* =========================================================
   Mes Dijital — içerik verisi
   Sitedeki bütün kategoriler ve çalışmalar buradan gelir.
   İçerik doldurmak için yalnızca bu dosyayı düzenlemek yeterli.

   Kategori alanları
     slug      adres için kısa ad (kategori.html?k=slug)
     name      kategori adı
     sub       kısa alt başlık (ana sayfada solda)
     services  hizmet listesi (ana sayfada sağda, kategori sayfasında)
     intro     kategori sayfasındaki giriş metni
     cover     ana sayfa kartı görseli, ör. "assets/img/web/kapak.jpg" (boşsa yer tutucu)
     shape     ana sayfa kartı biçimi: "port" (4:5), "sq" (1:1), "land" (3:2)
     works     çalışmalar

   Çalışma alanları
     slug, title, client, year, sector, live (canlı site adresi)
     summary   proje sayfasındaki özet
     cover     kapak görseli
     shots     ekran görüntüleri: { src, ratio, caption }
               ratio: "16x9" | "21x9" | "4x5" | "3x4" | "1x1"
               src boşsa yer tutucu çizilir
   ========================================================= */
(() => {
  // yer tutucu çalışma üretici — gerçek içerik gelince bu kısım silinip
  // works dizileri elle yazılabilir
  const ph = (catSlug, n) => Array.from({ length: n }, (_, i) => ({
    slug: `${catSlug}-${i + 1}`,
    title: `[ Çalışma ${String(i + 1).padStart(2, "0")} ]`,
    client: "[ Müşteri ]",
    year: String(2026 - Math.floor(i / 2)),
    sector: "[ Sektör ]",
    live: "",
    summary: "[ Projenin kısa özeti: markanın ihtiyacı, bizim yaklaşımımız ve sonuç — iki üç cümle. ]",
    cover: "",
    shots: [
      { src: "", ratio: "16x9", caption: "[ Ana ekran ]" },
      { src: "", ratio: "4x5", caption: "[ Detay ]" },
      { src: "", ratio: "4x5", caption: "[ Detay ]" },
      { src: "", ratio: "21x9", caption: "[ Geniş görünüm ]" },
      { src: "", ratio: "3x4", caption: "[ Mobil ]" },
      { src: "", ratio: "3x4", caption: "[ Mobil ]" },
      { src: "", ratio: "3x4", caption: "[ Mobil ]" },
    ],
  }));

  const cat = (slug, name, sub, services, shape, works = 4) => ({
    slug, name, sub, services, shape,
    intro: `[ ${name} kategorisini anlatan giriş metni: ne yapıyoruz, nasıl yapıyoruz, markaya ne kazandırıyor. İki üç cümle. ]`,
    cover: "",
    works: ph(slug, works),
  });

  window.MD_DATA = {
    agency: {
      name: "Mes Dijital",
      tagline: "Dijital & Influencer Ajansı",
      city: "Uşak",
      about: "[ Ajansı anlatan iki üç cümlelik kısa tanıtım metni buraya gelecek. ]",
      email: "iletisim@mesdijital.com.tr",
      phone: "+90 539 497 43 27",
      address: "Cumhuriyet Mah., Namık Kemal Cad. No: 9C, Uşak",
    },
    categories: [
      cat("web-tasarim", "Web Tasarım", "Kurumsal site, landing", ["Arayüz Tasarımı", "Geliştirme", "Bakım"], "port"),
      cat("sosyal-medya", "Sosyal Medya", "Hesap yönetimi", ["İçerik Planı", "Yönetim", "Raporlama"], "land"),
      cat("influencer", "Influencer Pazarlama", "Kreatör kampanyaları", ["Kreatör Eşleştirme", "Kampanya", "Ölçümleme"], "port"),
      cat("marka-kimligi", "Marka Kimliği", "Logo ve kimlik", ["Logo", "Kurumsal Kimlik", "Marka Rehberi"], "sq"),
      cat("produksiyon", "Prodüksiyon", "Fotoğraf ve video", ["Fotoğraf", "Video", "Kurgu"], "land"),
      cat("reklam", "Reklam Yönetimi", "Performans reklamı", ["Meta Ads", "Google Ads", "Analiz"], "port"),
      cat("seo", "SEO & İçerik", "Arama görünürlüğü", ["Teknik SEO", "İçerik", "Raporlama"], "sq"),
      cat("e-ticaret", "E-Ticaret", "Mağaza ve pazaryeri", ["Mağaza Kurulumu", "Pazaryeri", "Operasyon"], "land"),
    ],
  };
})();
