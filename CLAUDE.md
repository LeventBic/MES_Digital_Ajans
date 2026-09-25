# Mes Dijital — AI ajanları için kurallar

Astro (statik), cPanel/LiteSpeed, FTP deploy. `README.md` insan için giriş
noktasıdır (kurulum, dizin yapısı, yayın, bakım modu); bu dosya depodan
okunamayan kuralları ve tuzakları taşır. **devarp-web'in CLAUDE.md'si bu
projeye uygulanmaz**: onun dal disiplini, Cloudflare Pages, `npm run ci`, Sanity
burada yok.

Dallar: iş `develop`'a commit'lenir; `main` kullanıcı isteyince `develop`'tan
ileri sarılır (fast-forward). CI yok; push canlıyı değiştirmez, canlıya yalnızca
`npm run deploy` çıkar.

## Model'e göre çalışma modu

Kullanıcının diğer depolarındaki (devarp-web, gods-eye, Levo-Researches)
kuralla aynı: **Fable seçiliyken `src/` altına kod yazılmaz, delege edilir.**
`Agent` aracı, her çağrıda açıkça `model: "opus"`. Fable'da kalanlar:
mimari, brief yazmak, `.htaccess` / `scripts/` / dokümantasyon, deploy,
doğrulama (curl, ekran görüntüsü), git. Alt-ajan raporu kanıt değildir:
diff'i oku, `npm run build && npm run check` koş, canlıyı `curl -I` ile ölç.
İstisnayı yalnızca kullanıcı verir ("sen hallet" gibi açık bir sözle).
Opus / Sonnet seçiliyken bu bölüm uygulanmaz.

## Yayın akışı — sıra önemli

1. `npm run maintenance:on` — ziyaretçi bakım sayfasını görmeye başlar (503).
2. `npm run deploy` — build + FTP. Silme gerekiyorsa `deploy --prune`.
3. `curl -b mes_preview=1 https://mesdijital.com.tr/` ile canlıyı doğrula.
4. `npm run maintenance:off`.

Deploy önce `.htaccess`'i değil, önce varlıkları yüklemez — hepsini alfabetik
yükler. Riskli bir `.htaccess` değişikliğinde önce `.htaccess`'i tek başına
yükleyip (`scripts/deploy.py` içindeki `connect` + `storbinary`) test et.

## Tuzaklar (yaşandı, tekrarlanmasın)

- **LiteSpeed rewrite 503'lerinde `ErrorDocument 503` çalışmaz**; kendi
  jenerik sayfasını basar. Bu yüzden bakım yanıtı `maintenance.php` üzerinden
  (dahili rewrite + `http_response_code(503)`). `R=503` bayrağına dönme.
- **www/https yönlendirmesi bakım bloğundan ÖNCE durmalı.** Tersi olursa
  `REQUEST_URI` `/maintenance.php`'ye dönüşür ve www → `/maintenance.php`'ye
  yönlenir (17 Eylül 2026'da görüldü).
- **`maintenance.html` yalnızca mutlak yol kullanır** (`/assets/...`,
  `/favicon.ico`). Sayfa `/hizmetler/x` gibi derin bir URL'de gövde olarak
  döndüğü için göreli yol kırılır.
- **`maintenance.html` bağımsız kalır**: `global.css` import etmez, stil
  gömülüdür, Astro pipeline'ından geçmez (`public/`). Token değişikliği
  oraya elle taşınır.
- **FTP düz metin.** Sunucu `AUTH TLS`'e "500 not implemented" döner.
  `.env.deploy` şifre içerir, git dışıdır; sohbete yazılan şifre değiştirilmeli.
- **Bakım bayrağı `public_html/.maintenance`'dır**, repoda yoktur, deploy
  ve prune ona dokunmaz (`KEEP` listesi). `.htaccess` dışarıdan okunmasını
  engeller (403 yerine bakım açıkken 503 görünür, normaldir).
- **`assets/` deploy'da tamamen yönetilir**: sunucuya elle dosya atma, prune
  siler. Kalıcı bir şey `public/` altına girer.

## Tasarım

Bakım sayfasıyla tutarlılık: Eina 04, marka kırmızısı `#e51b26` (dolgu/logo),
metin kırmızısı `#c4141d` (açık zeminde WCAG için), zemin `#fcfbfb`, kart
`#ffffff`. Logo `public/assets/img/mes-logo.png` (şeffaf), favicon seti
kırmızı "M". Ana sayfa tasarımı henüz yapılmadı; `src/pages/index.astro`
yer tutucudur ve canlıda bakım modu açık. Yedi statik tasarım önerisi
`docs/tasarim-onerileri/` altında (01–06: 24 Eylül, 07 Çerçeve: 25–26 Eylül
2026); seçilen öneri Astro'ya taşınacak, içlerindeki vaka ve rakamlar yer
tutucudur. 07'yi taşırken `07-cerceve/README.md` "Astro'ya taşırken dikkat"
bölümündeki tarayıcı tuzaklarını (clip-path + IntersectionObserver, pointer
capture) oku.

## SEO

`public/robots.txt` elle, sitemap `@astrojs/sitemap` ile her build'de üretilir
(`site` değeri `astro.config.mjs`'te). Sitemap dosyalarını `public/`'e koyma,
bakım bloğuna robots/sitemap istisnası ekleme: bakımda 503 dönmeleri doğru.
Sıradaki işler ve gerekçeleri: `docs/arastirma/04-obys-seo-ve-gorunurluk.md`.
