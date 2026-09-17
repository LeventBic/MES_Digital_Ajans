# Mes Dijital — mesdijital.com.tr

Uşak merkezli dijital pazarlama ajansı Mes Dijital'in kurumsal sitesi.
Astro, statik çıktı, cPanel (LiteSpeed) üzerinde yayın. Sunucuda Node yok;
`npm run build` ile üretilen `dist/` klasörü FTP ile `public_html`'e kopyalanır.

## Kurulum

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run check      # astro check (tip + şablon)
```

## Dizin yapısı

```
public/               olduğu gibi dist/ köküne kopyalanır
  .htaccess           yönlendirmeler, bakım anahtarı, önbellek, güvenlik başlıkları
  maintenance.html    bakım sayfası — bağımsız, gömülü stil; tek başına açılır
  maintenance.php     bakım açıkken 503 + Retry-After ile maintenance.html'i basar
  assets/fonts/       Eina 04 woff2 (300 / 400-500 / 600 / 700-900)
  assets/img/         mes-logo.png ve diğer görseller
  favicon*.png, favicon.ico, apple-touch-icon.png
src/
  layouts/Base.astro  ortak <head>, favicon, font preload, global.css
  styles/global.css   @font-face + renk/tipografi tokenları
  pages/index.astro   ana sayfa (şu an yer tutucu)
  pages/404.astro
scripts/deploy.py     FTP deploy + bakım anahtarı (Python 3, ek paket yok)
.env.deploy           FTP bilgileri — git dışı (bkz. .gitignore)
```

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

## Sunucu notları

- Alan: `mesdijital.com.tr`, IP `104.247.161.131`, cPanel + LiteSpeed, PHP açık.
- FTP sunucusu TLS ilan ediyor ama sertifika yok; bağlantı düz FTP'ye düşer
  (`deploy.py` uyarı basar). cPanel'de FTP TLS açılırsa script otomatik TLS'e geçer.
- Eski WordPress kurulumu 17 Eylül 2026'da `~/eski-wp/` altına taşındı (web kökü
  dışı, erişilemez). Veritabanı duruyor; gerekmiyorsa cPanel'den silinebilir.
