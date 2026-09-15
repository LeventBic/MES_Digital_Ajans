# DijitalAjans — DEVARP bakım sayfası (Astro'suz kopya)

Bu klasör, `devarp-web` deposundaki Astro tabanlı bakım sayfasının
(`src/pages/maintenance.astro`) bağımlılıksız, tek dosyalık HTML kopyasını
taşır. DijitalAjans projesinde tasarım referansı / hazır şablon olarak
kullanılmak üzere hazırlandı: derleme adımı, paket kurulumu ve sunucu tarafı
mantık yok — `index.html` tek başına açılır.

## Nasıl açılır

Doğrudan dosyadan:

```bash
open index.html
```

Yerel sunucuyla (video ve font dosyaları için daha güvenilir yol):

```bash
python3 -m http.server 8765
# http://localhost:8765/index.html
```

## Dosya yapısı

```
index.html                                  sayfanın tamamı (stil + script gömülü)
maintenance.astro.orig                      referans: dönüştürülen Astro kaynağı
assets/
  fonts/eina04-{light,regular,semibold,bold}.woff2   Eina 04 (300 / 400-500 / 600 / 700-900)
  maintenance/DEVARP_VIDEO.mp4              arka plan videosu
  maintenance/DEVARP_VIDEO-poster.jpg       video yüklenene kadar gösterilen kare
  maintenance/devarp_logo_white.svg         logo (395x100)
  maintenance/favicon.svg                   favicon
```

## Astro sürümünden farkları

- Frontmatter, `import`'lar ve `url()` yardımcısı kaldırıldı; tüm varlık
  yolları göreli (`assets/...`).
- `<FontFaces />` bileşeninin ürettiği `@font-face` blokları elle yazıldı,
  yalnızca Eina 04 için (JetBrains Mono bu sayfada kullanılmıyor).
- İki script bloğu TypeScript'ten düz JavaScript'e çevrildi ve gövdenin sonuna
  alındı (Astro'da işaretlemeden önce duruyorlardı; düz HTML'de orada
  çalışsalar `getElementById` null döner).
- Videoya `poster` özniteliği eklendi.

CSS, işaretleme, metinler ve `data-tr/data-en/data-de` çevirileri birebir aynıdır.
Tasarımda bir değişiklik yapılmadı — karşılaştırma için `maintenance.astro.orig`
dosyasına bakılabilir.
