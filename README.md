# Mes Dijital — mesdijital.com.tr

Uşak merkezli dijital pazarlama ve influencer ajansı Mes Dijital'in kurumsal sitesi.
Astro, statik çıktı, cPanel (LiteSpeed) üzerinde yayın. Sunucuda Node yok;
`npm run build` ile üretilen `dist/` klasörü FTP ile `public_html`'e kopyalanır.

## Durum (26 Eylül 2026)

| Konu | Durum |
|---|---|
| Canlı site | Bakım modu açık; ziyaretçi bakım sayfasını görür (503) |
| Ana sayfa | `src/pages/index.astro` yer tutucu, tasarım henüz seçilmedi |
| Tasarım önerileri | 7 statik öneri `docs/tasarim-onerileri/` altında; seçilen öneri Astro'ya taşınacak |
| SEO altyapısı | `robots.txt`, otomatik `sitemap-index.xml`, her sayfada `canonical` hazır |
| Araştırma | Rakip, referans site ve Obys SEO raporları `docs/arastirma/` altında |

## Kurulum

```bash
npm ci             # package-lock.json'dan birebir kurulum (npm install da olur)
npm run dev        # http://localhost:4321
npm run build      # dist/ (sayfalar + sitemap-index.xml + sitemap-0.xml)
npm run check      # astro check (tip + şablon)
```

## Dallar

- `develop`: çalışma dalı. Yeni işler buraya commit'lenir.
- `main`: onaylanmış durum. Şimdiye kadar `develop`'tan ileri sarma
  (fast-forward) ile güncellendi; 26 Eylül 2026'da `develop`'un araştırma ve
  tasarım önerilerini içeren hâline (`9e224f1`) ilerletildi.

Depoda CI yok; push canlıyı değiştirmez. Canlıya çıkış yalnızca `npm run deploy` ile olur.

## Dizin yapısı

```
public/               olduğu gibi dist/ köküne kopyalanır
  .htaccess           yönlendirmeler, bakım anahtarı, önbellek, güvenlik başlıkları
  robots.txt          tüm botlara açık, bakım sayfaları hariç, sitemap adresi
  maintenance.html    bakım sayfası — bağımsız, gömülü stil; tek başına açılır
  maintenance.php     bakım açıkken 503 + Retry-After ile maintenance.html'i basar
  assets/fonts/       Eina 04 woff2 (300 / 400-500 / 600 / 700-900)
  assets/img/         mes-logo.png ve diğer görseller
  favicon*.png, favicon.ico, apple-touch-icon.png
src/
  layouts/Base.astro  ortak <head>: title, description, canonical, sitemap linki,
                      favicon, font preload, global.css
  styles/global.css   @font-face + renk/tipografi tokenları
  pages/index.astro   ana sayfa (şu an yer tutucu)
  pages/404.astro
astro.config.mjs      site adresi, statik çıktı, @astrojs/sitemap entegrasyonu
scripts/deploy.py     FTP deploy + bakım anahtarı (Python 3, ek paket yok)
docs/arastirma/       rakip ve referans site raporları (bkz. docs/arastirma/README.md)
docs/tasarim-onerileri/  7 statik ana sayfa önerisi (Astro build'ine girmez)
.env.deploy           FTP bilgileri — git dışı (bkz. .gitignore)
```

## SEO

- **robots.txt**: `public/robots.txt`. Tüm arama motorlarına açık;
  `/maintenance.html` ve `/maintenance.php` taranmaz. Sitemap adresini gösterir.
- **Sitemap**: `@astrojs/sitemap` her build'de `dist/sitemap-index.xml` ve
  `dist/sitemap-0.xml` üretir. `src/pages/` altındaki her sayfa otomatik girer,
  404 girmez; elle düzenleme gerekmez. Adresler `astro.config.mjs` içindeki
  `site` değerinden gelir.
- **canonical**: `Base.astro` her sayfaya tam adresli canonical yazar.
- **Bakım modu ve SEO**: bakım açıkken `robots.txt` ve sitemap de 503 döner.
  Arama motorları bunu "geçici kapalı" sayar, sıralama etkilenmez.
- **Site açılınca yapılacak**: Google Search Console'da alan adını doğrula ve
  `https://mesdijital.com.tr/sitemap-index.xml` adresini gönder. Aynı adımı
  Bing Webmaster Tools için tekrarla.

Sıradaki SEO işleri (Obys incelemesinden, bkz. `docs/arastirma/04-obys-seo-ve-gorunurluk.md`):
sayfa başına açıklama ve paylaşım görseli (`og:image`), LocalBusiness JSON-LD,
zorunlu görsel `alt` metinleri, Google İşletme Profili.

## Yayın

```bash
npm run deploy               # build + dist/ → public_html (ekle/güncelle)
python3 scripts/deploy.py deploy --prune   # + dist/'te olmayan sunucu dosyalarını sil
python3 scripts/deploy.py ls [yol]         # sunucu dizinini listele
```

`.env.deploy` içeriği: `FTP_HOST`, `FTP_USER`, `FTP_PASS`, `FTP_ROOT`
(varsayılan `public_html`). Dosya yoksa aynı adlı ortam değişkenleri okunur.

`--prune` şunlara dokunmaz: `.well-known`, `cgi-bin`, `.user.ini`, `php.ini`,
`.maintenance`.

## Bakım modu

```bash
npm run maintenance:on       # public_html/.maintenance oluşturur → site 503
npm run maintenance:off      # dosyayı siler → site normal
npm run maintenance:status
```

Bakım açıkken her istek (varlıklar ve `.well-known` hariç) `maintenance.php`'ye
gider; yanıt **503 + Retry-After: 3600**, gövde `maintenance.html`. Arama
motorları 503'ü geçici sayar, sıralama etkilenmez.

Bakım açıkken siteyi görmek için tarayıcıya `mes_preview=1` çerezi koy
(adres çubuğuna `javascript:document.cookie="mes_preview=1;path=/"`) ya da
`curl -b mes_preview=1 https://mesdijital.com.tr/`.

Tipik güncelleme akışı: `maintenance:on` → `deploy` → çerezle kontrol →
`maintenance:off`.

## Tasarım önerilerini yerelde açmak

01–06 tek dosyalık sayfalardır; `index.html` dosyasını tarayıcıda doğrudan açmak
yeterli. 07 Çerçeve çok sayfalıdır ve bir statik sunucu ister:

```bash
python -m http.server 5173 --directory docs/tasarim-onerileri/07-cerceve
```

Python yoksa herhangi bir statik sunucu olur (ör. VS Code Live Server). Ayrıntılar:
`docs/tasarim-onerileri/README.md`.

## Sunucu notları

- Alan: `mesdijital.com.tr`, IP `104.247.161.131`, cPanel + LiteSpeed, PHP açık.
- FTP sunucusu TLS ilan ediyor ama sertifika yok; bağlantı düz FTP'ye düşer
  (`deploy.py` uyarı basar). cPanel'de FTP TLS açılırsa script otomatik TLS'e geçer.
- Eski WordPress kurulumu 17 Eylül 2026'da `~/eski-wp/` altına taşındı (web kökü
  dışı, erişilemez). Veritabanı duruyor; gerekmiyorsa cPanel'den silinebilir.
