# Obys Agency — SEO ve web görünürlüğü incelemesi (26 Eylül 2026)

[obys.agency](https://obys.agency) 07 Çerçeve önerisinin ilham kaynağı. Bu rapor
sitenin tasarımını değil, arama motorlarında ve web'de nasıl öne çıktığını
inceler: teknik SEO, sayfa içi etiketler, performans ve site dışı görünürlük.

**Özet:** Obys'in görünürlüğü teknik SEO'dan değil, site dışı otoriteden geliyor
(ödül platformları, basın, kendi ürettiği ücretsiz kaynaklar). Teknik altyapı çok
hafif ve hızlı, ama klasik SEO'da ciddi boşlukları var. Mes Dijital'in onların
site dışı stratejisini kopyalayıp teknik boşluklarını tekrar etmemesi gerekiyor.

## Yöntem

- Ana sayfa, `/about` ve `/work/porsche-taycan` HTML'i `curl` ile çekildi;
  `<head>` etiketleri, başlık hiyerarşisi, görseller ve linkler sayıldı.
- `robots.txt`, `sitemap.xml`, `llms.txt`, manifest ve `security.txt` gibi dosyalar
  ile yanıt başlıkları (sıkıştırma, önbellek, güvenlik) tek tek istendi.
- Yükleme performansı headless Chrome ile ölçüldü (masaüstü 1440×900 ve yavaş
  4G + 4× yavaş CPU mobil). PageSpeed Insights API'nin anahtarsız günlük kotası
  dolu olduğu için Google'ın gerçek kullanıcı (CrUX) verisi **alınamadı**.
- Site dışı kısım bir alt-ajanla web araması üzerinden tarandı. Ödül, basın ve
  alt alan adı kaynaklarının 10 bağlantısından 9'u açılarak doğrulandı (Clutch
  erişimi engelliyor); ödül sayıları Obys'in kendi About sayfasıyla örtüşüyor.

## 1. Teknik SEO — iyi yaptıkları

| Konu | Bulgu |
|---|---|
| Sayfa başlıkları | Sayfaya özel: `Porsche Taycan - Obys Agency`, `About - Obys Agency` |
| Sunucu tarafı HTML | İçerik ve 20 proje linki (`/work/...`) ilk HTML'de; tarayıcı JS çalıştırmadan okuyabiliyor. Googlebot'a aynı HTML dönüyor (gizleme yok) |
| Open Graph / Twitter | `og:title`, `og:description`, `og:image` (1200×630), `summary_large_image` |
| Varlık boyutları | JS 37 KB, CSS ~3 KB (masaüstü/mobil ayrı paket), font 6 KB (alt küme) |
| Önbellek | Varlıklar sürüm etiketli, `max-age=31536000, immutable`; Brotli sıkıştırma |
| Görseller | WebP, `srcset` ile çoklu boyut, `width`/`height` tanımlı, `loading="lazy"`, ayrı CMS alan adından |
| Favicon seti | SVG + PNG + ICO + apple-touch-icon + web manifest (192/512 maskable) |
| Yönlendirmeler | `http→https` ve `www→kök` 301; bilinmeyen adres gerçek 404 döner |
| Hız (ölçüm) | İlk içerik 0,39 s, en büyük içerik 0,45 s (masaüstü); yavaş mobilde 0,66 s |
| Güvenlik başlıkları | Sıkı CSP (nonce), COOP/CORP/COEP, Permissions-Policy, nosniff |
| Analitik | Google Analytics 4 (gtag) |

## 2. Teknik SEO — eksikleri (kopyalanmamalı)

- **`robots.txt` yok** (404) ve **`sitemap.xml` yok**; Google sayfaları yalnızca
  link takibiyle buluyor.
- **Açıklama her sayfada aynı**: proje sayfaları da ajansın genel tanıtım
  cümlesini kullanıyor. Arama sonucunda sayfalar birbirinden ayrışmıyor.
- **`og:image` her sayfada aynı**: bir projeyi paylaşınca genel Obys görseli çıkıyor.
- **Ana sayfada ve About'ta `<h1>` yok** (proje sayfalarında var).
- **Yapılandırılmış veri (JSON-LD) hiç yok**: Organization / LocalBusiness bilgisi verilmiyor.
- **Görsel `alt` metni eksik**: ana sayfadaki 38 görselin 34'ünde boş.
- **Geçersiz `sizes`** (`sizes="--w(2, 1)"`): tarayıcı `100vw` varsayıp gereğinden
  büyük görsel indiriyor.
- **HTTP/1.1** (HTTP/2 yok) ve HTML `Cache-Control: no-store` (geri/ileri önbelleği kapalı).
- **`canonical` göreli** (`href="/about"`); çalışır ama tam adres önerilir.
- **Yükleme sırasında kayma**: ölçümümüzde CLS masaüstü ana sayfada 1.0, proje
  sayfasında 0.92 çıktı (iyi eşik 0.1). Tasarım CSS/JS'i sayfa yüklendikten sonra
  enjekte ediyor. Gerçek kullanıcı verisi olmadığı için kesin değil.

## 3. Site dışı görünürlük — asıl güçleri

**Ödül platformları** (her biri profil + proje sayfası = güçlü geri link):
Awwwards Studio of the Year ve 30+ Site of the Day, CSSDA 4× Studio of the Year ve
35+ Website of the Day (2025 Designer of the Year adayı), Red Dot Best of the Best,
European Design Awards jüri ödülü, 3× Communication Arts, Best of Behance.
Kaynaklar: [awwwards.com/obys](https://www.awwwards.com/obys/),
[cssdesignawards.com](https://www.cssdesignawards.com/doty2025/nominees/obys),
[thefwa.com](https://thefwa.com/profiles/obys-agency),
[red-dot.org](https://www.red-dot.org/obys-agency), [obys.agency/about](https://obys.agency/about)

**Basın ve konuşmalar:** Codrops'ta en az 4 makale ve kendi yazar sayfası
([tympanus.net/codrops/author/obys](https://tympanus.net/codrops/author/obys/)),
FWA ve Red Dot Magazine röportajları, Awwwards Valencia (2024) ve The Geek
Gathering (2025) konuşmaları.

**Kendi ürünleri (link mıknatısı):** her biri ayrı alt alan adında, her biri ayrı
bir haber konusu oldu:
[library.obys.agency](https://library.obys.agency/) (tasarım kitapları),
[des.obys.agency](https://des.obys.agency/) (tasarım eğitimi serisi),
[typographyprinciples.obys.agency](https://typographyprinciples.obys.agency/),
[experiment.obys.agency](https://experiment.obys.agency/) (deney arşivi),
kendi yazı karakteri OTF Obys NG.

**Sosyal medya:** her platformda aynı kullanıcı adı (`obys_agency`): Instagram,
LinkedIn, X, Behance, Dribbble. Takipçi sayıları (Instagram ~22 bin, LinkedIn ~4,3 bin,
X ~3,7 bin) alt-ajan aramasından; **doğrulanmadı**.

**Zayıf nokta:** genel ticari aramalarda ("creative web design agency Ukraine")
ilk sonuçlarda çıkmıyorlar; güçleri marka aramasında ve ödül ekosisteminde.
Wikipedia/Wikidata kaydı bulunamadı; trafik tahmini (Similarweb/Ahrefs) doğrulanamadı.

## 4. Mes Dijital için yapılacaklar

Teknik (Astro'da, Obys'ten daha iyi):

| # | İş | Durum |
|---|---|---|
| 1 | `robots.txt` + otomatik sitemap (`@astrojs/sitemap`) | **Yapıldı** (26 Eylül 2026, `59568b3`) |
| 2 | Sayfa başına `description` ve `og:image` | Bekliyor (`Base.astro`'ya prop) |
| 3 | Tam adresli `canonical` | Zaten var (`Base.astro`) |
| 4 | LocalBusiness / ProfessionalService JSON-LD | 07 önerisinde hazır, Astro'ya taşınacak |
| 5 | Görsellerde zorunlu `alt`, geçerli `sizes` | Bekliyor (tasarım Astro'ya taşınırken) |

Site dışı (yerel ajans için daha da önemli):

1. **Google İşletme Profili**: "Uşak dijital ajans" aramalarında en hızlı sonuç;
   site yayında olmadan da açılabilir. Yandex Haritalar kaydındaki telefonla
   (+90 541 186 64 37) sitedeki telefon (+90 539 497 43 27) eşitlenmeli.
2. **Kendi siteni vitrin projesi yap**: yeni siteyle Awwwards, CSSDA ve Kristal
   Elma'ya başvur (Obys'in "Designing Ourselves" yaklaşımı).
3. **Ücretsiz bir kaynak üret**: ör. "Uşak KOBİ'leri için sosyal medya rehberi"
   ya da influencer iş birliği şablonu; ayrı sayfada, paylaşılabilir.
4. **Sosyal hesapları tek kullanıcı adıyla aç**; adresler 07 önerisinde
   `assets/js/data.js` → `agency.social` alanına yazılır.
5. **Ajans dizinleri**: Clutch, Sortlist, DesignRush, dijitalajanslar.com
   (Uşak listesinde şu an hiç ajans yok, bkz. rapor 01).
