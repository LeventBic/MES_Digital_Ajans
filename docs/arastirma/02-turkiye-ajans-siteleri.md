# Türkiye Ajans Siteleri İncelemesi — Mes Dijital için Referans Listesi

**Tarih:** 17 Eylül 2026
**Amaç:** Uşak merkezli küçük bir dijital ajans (Mes Dijital) için kendi sitesini tasarlarken referans olacak liste.

**Yöntem:** Her site `curl` ile ham HTML olarak çekildi; `@font-face` bildirimleri, Google Fonts / Adobe Fonts (Typekit) linkleri, bağlı CSS dosyaları ve kaynaktaki hex renkler doğrudan koddan okundu. Sayfa yapısı ve navigasyon ayrıca WebFetch ile doğrulandı. Kaynaktan okunamayan şeyler açıkça "kaynaktan okunamadı / görsel tahmin" diye işaretlendi. Uydurma veri yok.

---

## Özet Tablo

| Ajans | URL | Fontlar (kaynaktan) | Zemin / Vurgu | Bölüm yapısı (kısaca) | Puan |
|---|---|---|---|---|---|
| TBWA\İstanbul | tbwa.com.tr | **TBWA Grotesk** (özel, woff2) + TBWAGroteskBackslash | Açık / sarı `#fecc00`, koyu `#0a0a0d` | Hero slogan → Disruption® manifesto → 3 iş kartı → footer | 4.5 |
| Zeo Agency | zeo.org | **Gilroy** (başlık) + **Akagi Pro** (metin), self-hosted | Koyu `#080808` + `#f8f8f8` / `#cc0a4d` | Hero+CTA → testimonial → 6 hizmet → ödüller → case → logo grid → kaynaklar → kültür | 5 |
| SEM | semtr.com | **Manrope** + **Fira Code** (self-hosted variable) + Poppins/Roboto/Roboto Slab | Beyaz + lacivert `#000e24` / `#06aeef` | Hero → 6 hizmet kartı → istatistik → testimonial → ürün → 4 case → logo duvarı → CTA | 4.5 |
| Concept | concept.com.tr | **Neue Haas Grotesk Display + Text** (Adobe Typekit `ger0eho`) | Kaynakta hex yok; `color:#fff` baskın, koyu zemin — görsel tahmin | Hero slider → iş/logo grid → footer | 3.5 |
| Alametifarika (alametholistic) | alametifarika.com.tr | Özel self-hosted **"holistic"** fontu | Görsel hero / kırmızı `#eb1c23` | Hero görsel + slogan + tek CTA → sosyal linkler | 3 |
| CreatorDen | creatorden.com | **Quicksand** (Google) + Nunito | Koyu `#0a0a0a` / pembe `#ff4f81`, mor `#7d8dff` | Hero → marka logoları → ajans logoları → hizmet → 2 case → ürünler → footer | 4.5 |
| İnfluencer360 | influencer360.com.tr | **Euclid Circular A** (self-hosted OTF) + **Age Digital One** (display) + Nunito | Beyaz / magenta `#e91e63` | Randevu formu → hero → logolar → paneller → hizmet → karşılaştırma tablosu → 11 hizmet → metrik → blog → SSS | 3.5 |
| Creator Station | creatorstation.com | **Open Sans** (Google, WP teması) | Açık / turkuaz `#25afb4`, `#252525` | Video hero → misyon → 5 süreç bölümü → iletişim formu | 3 |
| T.I.P Effect | tipeffect.com | **Raleway** + **Dancing Script** (Google) | Açık / kırmızı `#ec1d23`, `#1d222c` | Hero → konumlandırma → 3 hedef CTA → 6 kategori kartı → biz kimiz → 4 hizmet → 3 adım → haber | 3 |
| Fevreka | fevreka.com | **Montserrat** + **Abril Fatface** + Open Sans | Beyaz / sarı `#ffb902`, lacivert `#003f71` | Hero slider → biz kimiz → iş kartları → hizmetler → footer | 3.5 |
| Cremicro | cremicro.com | **Dosis** (Salient/Nectar WP teması) | Beyaz / mavi `#00a6e2`, `#0f5578` | Hero → 25+ logo → neden biz → hizmet → güvenlik → sürdürülebilirlik → testimonial → sektörler → portfolyo → ofisler → SSS | 2.5 |
| Tribal | tribal.com.tr | **Open Sans** + **Playfair Display** + Montserrat | Beyaz / mavi `#0c4da2`, kırmızı `#fd0025`, mor `#a65bf4` | Hero → kurumsal özet → 4 değer kartı → blog | 2.5 |
| Sherpa | sherpa.com.tr | **Inter** (Google) — Soft Design System Pro şablonu | Beyaz / mavi `#0799d4`, `#052a50` | Hero → 4 hizmet kartı → ekip → yöntem → 1 case → altyapı → stack → felsefe → bülten | 3.5 |
| Fikri Mühim | fikrimuhim.com | **Inter** (`--fm-font` değişkeni) | Açık / amber `#f4a61f` | Hero + app linkleri → kayıt formu → fayda → marka logoları → açıklama → istatistik → liderlik → vizyon | 3 |

---

## Detaylar

### TBWA\İstanbul — https://tbwa.com.tr/
Konum İstanbul, global ağın Türkiye ofisi. Tek vurgu: "We Are The Disruption® Company". Kaynakta dört adet özel woff2 var: `TBWAGrotesk-Regular`, `TBWAGrotesk-SemiBold`, `TBWAGrotesk-Italic` ve `TBWAGroteskBackslash-Regular` — yani tipografi tamamen markaya ait, hiçbir Google Fonts çağrısı yok. Sarı `#fecc00` tek vurgu rengi, kalanı nötr gri skalası (`#0a0a0d`, `#4d4d4d`, `#868686`, `#d0d0d0`). Navigasyon sadece dört öğe: Disruption®, İşlerimiz, Hakkımızda, İletişim. Hizmet sayfası, blog ve kariyer sayfası yok.

**Etkileşim:** Hero'da başlat/durdur kontrollü bir karusel dönüyor. Ana sayfada yalnızca üç iş kartı (Hayalet Ağlar / CarrefourSA, Atasay, Akbank) ve her birinde "Devamını oku". Kaynakta GSAP/Swiper/Locomotive izine rastlanmadı; animasyon yoğunluğu az–orta.

**Puan 4.5 —** İyi: az sayfa, az renk, özel font; güven veren minimalizm. Kötü: hizmetlerin hiç anlatılmaması küçük bir ajans için kopyalanamaz bir lüks.

### Zeo Agency — https://zeo.org/
Merkezi Londra olarak duyuruluyor, kökeni Türkiye. Teknik SEO, GEO (üretken arama optimizasyonu), içerik pazarlaması, PPC, veri analizi ve yeni olarak üretken yapay zeka danışmanlığı. Kaynakta `--ff-head: Gilroy` ve `--ff-text: Akagi Pro` CSS değişkenleri var; fontlar UUID adlı woff/woff2 dosyaları olarak self-hosted (ör. `982fe39c-a96c-4e0a-809d-8866b1be31ad.woff2`). Zemin `#080808` koyu ile `#f8f8f8` açık arasında bölümler halinde alternatifleniyor, vurgu `#cc0a4d`; ikincil `#403294` mor.

**Yapı:** Hero ve "Create your AI roadmap" CTA → altı müşteri görüşü → altı hizmet kartı → ödüller → sayısal sonuçlu beş vaka ("%82 organik oturum artışı") → müşteri logo ızgarası → kaynak merkezi (blog, araçlar, SEO sözlüğü, etkinlikler) → kültür/değerler. React tabanlı tek sayfa uygulaması (kaynakta 24 `react` referansı).

**Puan 5 —** İyi: her bölüm bir sonraki satın alma itirazını karşılıyor, vakalar rakamla konuşuyor. Kötü: sayfa uzun ve React'e bağlı, ilk yükleme ağır.

### SEM — https://semtr.com/
İstanbul merkezli performans ve büyüme ajansı; "Breaking Barriers, Hacking Growth" / "Your Growth Partner with Technology & AI". Kaynakta `Manrope-VariableFont_wght.woff2` ve `FiraCode-VariableFont_wght.woff2` self-hosted; ayrıca WordPress/Elementor üzerinden Google Fonts'tan Poppins, Roboto ve Roboto Slab çağrılıyor. Dört aile bir arada, gereksiz yük. Palet beyaz zemin, `#000e24` lacivert metin, `#06aeef` camgöbeği vurgu, `#121f33` ve `#121127` koyu bölümler.

**Yapı:** Hero → altı hizmet kategorisi kartı (Technology & AI, Strategy & Growth Consulting, Data, Partner Technology, Media, Customer Journey Analytics) → istatistik → 2024 tarihli üç müşteri görüşü → Smartfeed ürün tanıtımı → dört vaka (Beymen, Bioderma, kişiselleştirme) → 50+ marka logo duvarı → ISO sertifika rozeti → CTA. Navigasyon: Technology & AI, Expertise, Cases, Let's Talk; üst şeritte SEM Academy, Technology & Tools, About Us, People & Culture, Blog, News.

**Puan 4.5 —** İyi: kanıt katmanı çok kalın (vaka + görüş + logo + sertifika). Kötü: dört font ailesi ve WP cache kalabalığı; ofis adresi ana sayfada yok.

### Concept — https://concept.com.tr/
İstanbul. Tipografi Adobe Typekit (`use.typekit.net/ger0eho.css`) üzerinden `neue-haas-grotesk-display` ve `neue-haas-grotesk-text` — Türkiye'de nadir görülen ciddi bir seçim, Helvetica'nın rafine akrabası. Kaynakta neredeyse hiç hex yok, renk kararları görsellerin içinde; `global.css`'te baskın olan `color:#fff`, koyu zemin olduğuna işaret ediyor ama bu **görsel tahmin**, kesin değil.

**Etkileşim:** `TweenMax.min.js` (GSAP), `player.vimeo.com/api/player.js` ve `jquery.fancybox` yüklü — yani scroll/hover animasyonu, video ve lightbox var. Animasyon yoğunluğu orta–yoğun. Navigasyon beş öğe: Ana sayfa, İşler, Hakkımızda, CV Gönder, İletişim. Ana sayfa neredeyse tamamen müşteri logolarından oluşan bir ızgara; A101, Adidas, Alfa Romeo, Allianz, Fiat, Hepsiburada, IKSV, Jeep, Maserati, Shell, Şekerbank, Türk Telekom, Vestel, WWF gibi 25 marka ve her logo kendi `/isler/` proje sayfasına gidiyor.

**Puan 3.5 —** İyi: logo ızgarasının doğrudan iş sayfalarına açılması, portfolyoyu ana sayfa haline getiriyor. Kötü: hero'da tek kelime metin yok, ajansın ne yaptığı anlaşılmıyor; `<title>` yalnızca "Ana sayfa".

### Alametifarika → alametholistic — https://alametifarika.com.tr/
Eski adıyla Alametifarika; site şimdi "alametholistic | Queen of two screens" olarak yeniden markalanmış. Nuxt ile kurulu (`/_nuxt/css/...`), tipografi `font-family: holistic` adlı tek bir self-hosted özel aile. Tek hex `#eb1c23` kırmızı. Sayfa fiilen tek ekran: logo, "Stories, icons and music for instant fame & instant sales" satırı ve "Start the journey" butonu. Navigasyon iki öğe — Watch Videos ve Get in touch. Footer'da Instagram, Vimeo, YouTube, LinkedIn.

**Puan 3 —** İyi: tek cümlelik konumlandırma ve tek CTA, cesur bir sadelik. Kötü: iş, hizmet, ekip, iletişim bilgisi hiç yok; köklü bir ajansın mirasını görünmez kılıyor.

### CreatorDen — https://creatorden.com/ *(influencer marketing)*
19 Mayıs Caddesi, UBM Plaza, Şişli / İstanbul. Veri odaklı influencer marketing ve kendi teknolojisi (CreatorHub, CreatorX, Monitor). Kaynakta Google Fonts'tan `Quicksand:400,700`, gövdede `Nunito` — ikisi de yumuşak, dostane grotesk. Zemin `#0a0a0a` koyu, vurgular `#ff4f81` pembe ve `#7d8dff` lavanta; turuncu geçişler (`#ff6d0c`, `#ff6800`, `#ff4800`) de kaynakta.

**Yapı:** Hero değer önermesi ("Maximize the Performance of your Influencer Marketing Collaborations") ve iki CTA (marka için iletişim / influencer kaydı) → Spotify, Netflix, Google marka logoları → ajans partner logoları → özel program anlatımı → iki sayısal vaka (Wasa "%100 satış hacmi artışı", Nescafe Xpress) → CreatorHub ve CreatorX ürün tanıtımı → footer. Navigasyon: CREATORHUB, BRANDS & AGENCIES, CREATORX, MONITOR + EN/TR.

**Puan 4.5 —** İyi: influencer ajansı olmasına rağmen kendini teknoloji şirketi gibi konumlandırıyor; markaya ve influencer'a ayrı giriş kapısı açıyor. Kötü: sadece iki vaka, portfolyo derinliği zayıf.

### İnfluencer360 — https://influencer360.com.tr/ *(influencer marketing)*
İstanbul. Tipografi ilginç: `css/fonts.css` içinde self-hosted `Euclid Circular A` (Light / Regular / Medium / SemiBold / Bold, `.otf`) ve `Age Digital One` adlı display fontu, ayrıca Google'dan `Nunito`. Not: `.otf` dosyaları `format('truetype')` olarak yanlış bildirilmiş — teknik hata. Vurgu `#e91e63` magenta; Instagram gradyan renkleri (`#feda75`, `#fa7e1e`, `#d62976`, `#962fbf`) de kaynakta duruyor.

**Yapı:** Sayfanın en üstünde randevu/toplantı formu — hero'dan bile önce → hero ("Veri Odaklı İnfluencer Marketing") → 12 marka logosu → üç panel girişi (Influencer / Marka / Ajans) → hizmet özeti → **rakiplerle karşılaştırma tablosu** → 11 hizmetin detayı → başarı metrikleri → CTA → üç blog yazısı → SSS → footer. Navigasyon: Influencerımız Ol, Markamız Ol, Ajanslar İçin, Platform, Hizmetler (11 alt öğe), Kurumsal (Hakkımızda, Referanslar, Kariyer, Basın, Blog), İletişim, TR/EN, Giriş.

**Puan 3.5 —** İyi: üç ayrı hedef kitleye üç ayrı panel; karşılaştırma tablosu net bir farklılaşma iddiası. Kötü: hero'dan önce form, 11 hizmet ve "Türkiye'nin En İyisi" iddiası odağı dağıtıyor.

### Creator Station — https://creatorstation.com/ *(influencer marketing)*
Türkiye; influencer marketing danışmanlığı, prodüksiyon ve yetenek yönetimi. WordPress 6.8, "creators" teması, Visual Composer. Tek font Google Fonts'tan `Open Sans` (400, 600) — `ebor-google-font-css` etiketinden okundu. Vurgu `#25afb4` turkuaz, metin `#252525`, zemin `#fafafa`.

**Yapı:** Video hero (oynatıcı + uzun hikâye alıntısı) → misyon → süreç anlatan beş bölüm: Stratejik Ortaklık, Kitle Odaklı Yetenek Seçimi, Yapay Zeka Bazlı Raporlama, Prodüksiyon, Yayın → iletişim formu (ad, e-posta, telefon, mesaj) → footer. Navigasyon yalnızca iki ana öğe: Influencer Marketing, Yetenek Yönetimi; artı altı alt başlıklı SSS.

**Puan 3 —** İyi: video hero ve süreç anlatımı hizmeti somutlaştırıyor. Kötü: vaka kartı, müşteri logosu ve yetenek profili yok — iddiaların hiçbiri kanıtlanmıyor.

### T.I.P Effect — https://www.tipeffect.com/en/ *(influencer marketing)*
İstanbul. Adı "talent – idea – production" açılımından geliyor. Fontlar Google'dan `Raleway` (gövde ve başlık) ve `Dancing Script` (el yazısı vurgu); ayrıca `fl-icons` tema ikon fontu. El yazısı fontu kurumsal tonla çelişiyor. Vurgu `#ec1d23` kırmızı, koyu `#1d222c`, ikincil `#446084` ve `#d26e4b`.

**Yapı:** Hero ("TURKEY'S INFLUENCER MARKETING AGENCY") → marka konumlandırma → üç hedef kitleye CTA (Influencer / Brand / Agency) → altı görsel kategori kartı (Gaming, Kids, Cosmetic, Fashion, Video Production, Technology) → Who Are We → dört hizmet kartı (Influencer Marketing, Social Expansion Plan, Video Production, Digital PR) → "3 Steps to Success" → haber/blog → geniş footer. Navigasyon: About Us, Services, Our Projects (6 alt kategori), Clients, Work Together, News, TR/EN.

**Puan 3 —** İyi: dikey uzmanlık kartları (oyun, kozmetik, moda) arama niyetini yakalıyor. Kötü: Dancing Script seçimi ucuzlatıyor; WooCommerce tema artıkları kaynakta duruyor.

### Fevreka — https://fevreka.com/
Caferağa Mah., Mühürdarbağı Sok. 16/4, Moda / Kadıköy / İstanbul. Reklam, içerik ve dijital ajans; 10 hizmet sayıyor. Google Fonts'tan `Abril Fatface` (display) ve `Montserrat` (regular + 700) çağrılıyor, gövdede `Open Sans`. Serif display artı geometrik grotesk ikilisinin tipik Türk WordPress yorumu. Vurgu `#ffb902` sarı, `#003f71` lacivert, `#ff8300` turuncu.

**Yapı:** Hero slider ("'Evreka!' Dedirten Heyecan Verici Fikirlerin Peşindeyiz") → Biz Kimiz? → İşlerimiz (Kikkoman, Bayer, İş Bankası, Koç/Avis, Otacı, Bioxcin, Häfele, Abdi İbrahim, Oyak Renault — her işte verilen hizmet yazıyor) → hizmetler → footer. Navigasyon: Ana sayfa, Neler yapıyoruz?, Kimlerle çalışıyoruz?, Blog, İletişim, EN. Ayrıca SEO odaklı uydu sayfalar (İçerik Ajansı, SEO Ajansı, Sosyal Medya Ajansı, Video İçerik Ajansı, Yerel SEO).

**Teknik not:** The7 teması + Visual Composer; kaynakta altı ayrı ikon fontu (`icomoon-the7-*`, `fontello`, `fa-solid-900`, `dashicons-fevreka`, `vc_grid_v1`, `revicons`). Ciddi şişkinlik.

**Puan 3.5 —** İyi: iş kartlarının her birinde verilen hizmetin yazması kapsamı somutlaştırıyor. Kötü: tema şişkinliği; hero slider 2015 kalıbı.

### Cremicro — https://cremicro.com/
İstanbul merkez; ayrıca Oregon, Bakü, Londra, Amsterdam ofisleri duyuruluyor. Tek font `Dosis` (Salient/Nectar WP teması) — yuvarlak uçlu, dar kullanım alanı olan bir aile; tam sayfa gövde metni için zayıf. Palet `#00a6e2` ve `#44aedd` mavi, `#0f5578` koyu mavi, `#0086e0`; ayrıca `#0de2b8` ve `#f9003a` gibi başıboş vurgular.

**Yapı (14 bölüm):** Hero → 25+ müşteri logosu (Turkcell, Avon, Estée Lauder) → neden Cremicro → hizmetler → güvenlik → sürdürülebilirlik → başarı yaklaşımı → müşteri görüşleri → sektör deneyimi → portfolyo → raporlama şeffaflığı → global ofisler → çok dillilik → SSS. Navigasyon: Hizmetlerimiz, Reklam Mecralarımız, Ürünlerimiz, Eğitim, Sektörler, Hakkımızda, Büyüme Blogu + çok sayıda hesaplama aracı. `<title>`: "2026'da da En İyi Dijital Pazarlama Ajansıyız | Cremicro".

**Puan 2.5 —** İyi: sektör bazlı sayfalar ve araçlar güçlü bir SEO uzun kuyruğu kuruyor. Kötü: 14 bölüm hiçbir hiyerarşi bırakmıyor; başlıktaki "en iyi" iddiası ve tema şişkinliği güveni düşürüyor.

### Tribal — https://tribal.com.tr/
Koşuyolu, Kadıköy / İstanbul (+90 216 545 09 60). Saha pazarlaması ve deneyimsel pazarlama: merchandising, marka aktivasyonları, yapay zeka dönüşüm, saha ekipleri, gizli müşteri, B2B uygulamaları. Google Fonts'tan `Open Sans` (300/400/600/700), ayrıca `Playfair Display` ve `Montserrat:700`. Vurgu `#0c4da2` mavi, ikincil `#fd0025` kırmızı ve `#a65bf4` mor — üç ayrı vurgu rengi bir arada.

**Yapı:** Hero ("Field Marketing Leader" / "Deneyimsel Pazarlama Çözümleri") → kurumsal özet ve temel değerler → dört değer kartı → blog yazıları. Navigasyon: Anasayfa, Kurumsal (Hakkımızda, Yönetim, Üyelikler, İşbirlikleri), Hizmetlerimiz, Ödüllerimiz, Müşterilerimiz, İletişim, Blog, English.

**Puan 2.5 —** İyi: hizmet listesi çok net, dar bir alanda konumlanıyor. Kötü: ana sayfada müşteri logosu ve vaka yok; sayfanın yarısı Nike/Starbucks tarihi anlatan genel blog yazıları.

### Sherpa — https://sherpa.com.tr/
Kadıköy / İstanbul. **Pazarlama ajansı değil**, "product engineering studio" — ürün mühendisliği, cloud & DevOps, veri & yapay zeka, UX & arayüz. Referans olarak alındı çünkü yapısı temiz ve ölçeği küçük ekibe uygun. Google Fonts'tan `Inter` (300–800); tema Creative Tim'in `soft-design-system-pro` şablonu. Vurgu `#0799d4`, koyu `#052a50`.

**Yapı:** Hero ("Guiding Ideas into Reality" + ürün görselleri) → dört hizmet kartı → ekip → How We Work → tek vaka (NauticIQ, white-label) → Architecture First / Delivery Cadence / Co-ownership → Integrations / Engineered to Scale / Security by Design → From Ops to Product → The Sherpa Stack → felsefe → bülten → footer. Navigasyon tek sayfa içi çapa bağlantıları: Services, Approach, Sherpa Stack, About, Contact + TR/EN.

**Puan 3.5 —** İyi: tek sayfa, beş çapa, net dört hizmet kartı — küçük ekip için doğru ölçek. Kötü: `<title>` boş, hazır şablon kokusu var, tek vaka portfolyo sayılmaz.

### Fikri Mühim — https://fikrimuhim.com/
Propa Plaza, Esentepe, Şişli / İstanbul. **Ajans değil**, anket ve tüketici araştırması platformu; listeye tipografi disiplini örneği olarak alındı. Tipografi tek CSS değişkeninde toplanmış: `--fm-font: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` ve `app_custom.css` içinde altı yerde yalnızca `var(--fm-font)` çağrılıyor. Google Fonts'tan `Inter` (300–800). Vurgu `#f4a61f` amber, `#f7e7c8` krem.

**Yapı:** Hero ("Cevapladıkça kazandıran sistem") + App Store / Google Play butonları → kayıt formu → "Şimdi katıl" CTA → fayda bölümü (Araştırma, Ödüller) → marka partner logoları (Coca-Cola, Unilever, Nestlé, L'Oréal, Trendyol) → Fikri Mühim nedir? → istatistikler → liderlik → vizyon → sosyal → iletişim → yasal footer. Navigasyon: Ana Sayfa, Fikri Mühim nedir?, Hakkımızda, SSS, Giriş yap.

**Puan 3 —** İyi: tek font değişkeni ile disiplinli tipografi; marka logoları güven veriyor. Kötü: Bootstrap, FontAwesome ve Georgia/Roboto artıkları temizlenmemiş.

---

## Erişilemeyen veya kategori dışı çıkanlar

Aday listesindeki bazı ajanslar doğrulanamadı. Uydurmak yerine durumlarını yazıyorum.

- **4129Grey** (`4129grey.com`): site bir GoDaddy şablonlu "Launching Soon" tutucu sayfası. Kaynaktaki Source Sans Pro, Playfair Display ve Montserrat şablona ait, ajansa değil. Değerlendirmeye alınmadı.
- **Rafineri** (`rafineri.net`): yalnızca HTTP üzerinden yanıt veriyor; HTTPS sertifikası süresi dolmuş (WebFetch "certificate has expired" hatası verdi). Sayfadaki tek font bildirimi `Arial, sans-serif`. Fiilen terk edilmiş. `rafineri.com.tr` yanıt vermiyor.
- **Wanda Digital** (`wandadigital.com`), **Boomads** (`boomads.com`, `boomads.com.tr`), **Medina Turgul DDB** (`medinaturgulddb.com`), **Ingage** (`ingage.com.tr`), **Havas İstanbul** (`havas.com.tr`), **Kapital Media** (`kapitalmedia.com.tr`), **Youthworks** (`youthworks.com.tr`), **Enterprise Digital** (`enterprisedigital.com.tr`), **Bee Interactive** (`beeinteractive.com.tr`): hiçbiri DNS/HTTPS üzerinden yanıt vermedi. Wanda Digital 2019'da Ogilvy İstanbul bünyesine katılmıştı; bağımsız sitesi kapanmış görünüyor. `ingage.agency` alan adı Safenames park sayfası.
- **Ogilvy** (`ogilvy.com`): Türkiye alt sayfası (`/tr`) 404 veriyor, global site ayakta. Not düşmeye değer: tipografi tamamen özel — `OgilvySansWeb-Light/Regular/Bold/RegularItalic` ve `OgilvySerifWeb-Regular/Bold/RegularItalic`, vurgu `#eb3f43`.
- **Adeo** (`adeo.com.tr`): dijital ajans değil, siber güvenlik şirketi (MDR, GRC, farkındalık eğitimi). Fontları Ubuntu + Kalam.
- **Digital Age** (`digitalage.com.tr`): ajans değil, MediaCat grubuna bağlı teknoloji/kültür yayını. Open Sans + Roboto, canlı bir mor–pembe palet (`#6533fd`, `#ff1053`, `#2ac4ea`).
- **Gambit** (`gambit.com.tr`): alan adı artık MobyTech adlı Amazon satıcı aracına yönleniyor. Inter, `#140e33`.
- **Wunder Digital** (`wunder.digital`, `wunderdigital.com`): 200 dönüyor ama gövde boş, içerik okunamadı.

---

## Türkiye ajans sitelerinde ortak kalıplar

1. **Tipografi keskin biçimde ikiye ayrılıyor.** Global ağ ofisleri ve üst segment yerli ajanslar özel ya da lisanslı font kullanıyor: TBWA Grotesk, Ogilvy Sans/Serif, Neue Haas Grotesk (Typekit), Gilroy + Akagi Pro, Euclid Circular A, "holistic". Geri kalan herkes Google Fonts'ta buluşuyor. Özel font, algılanan seviyeyi tek başına yükselten en güçlü sinyal.
2. **En sık görülen ücretsiz fontlar:** Inter, Open Sans, Montserrat, Nunito, Poppins, Roboto. İncelenen 14 siteden altısında Open Sans veya Inter var. Yani bu fontlar artık ayırt edici değil, varsayılan.
3. **Display font refleksi Playfair Display ve Abril Fatface.** Aynı kalıp iki sitede tekrar ediyor: serif display başlık + grotesk gövde. Tanıdık ama jenerikleşmiş.
4. **Vurgu rengi neredeyse her zaman tek ve doygun.** Sarı `#fecc00`, kırmızı `#eb1c23` / `#ec1d23`, magenta `#e91e63`, camgöbeği `#06aeef`, turkuaz `#25afb4`. Kurumsal ajanslar lacivert + tek parlak renk; influencer ajansları pembe–mor gradyanlara kayıyor.
5. **Tipik bölüm sırası:** hero + slogan → müşteri logo duvarı → hizmet kartları → sayısal vaka → müşteri görüşü → istatistik → blog → iletişim formu. Zeo ve SEM bunu eksiksiz uyguluyor ve listenin en yüksek puanlıları; tesadüf değil.
6. **Logo duvarı Türkiye'de vakanın yerine geçiyor.** Concept, Cremicro, Fikri Mühim ve İnfluencer360 sayfanın büyük kısmını logoya ayırıyor, ama arkasında ne yapıldığını anlatan bir vaka çoğu zaman yok. Logo "kimle çalıştık" der, vaka "ne başardık" der; ikincisi satar.
7. **En yaygın teknik hata WordPress şişkinliği.** Fevreka, Cremicro, Creator Station ve T.I.P Effect'te altıya varan ikon fontu, Visual Composer / Elementor artığı, cache dosyaları ve kullanılmayan Bootstrap var. İlk yüklemeyi doğrudan yavaşlatıyor.
8. **İkinci en yaygın hata hero'da mesaj olmaması.** Concept'in hero'sunda hiç metin yok; Alametifarika'da tek satır var ama ne yaptıkları yazmıyor. Marka bilinirliği olmayan küçük bir ajans için bu ölümcül. Ayrıca birkaç sitede `<title>` boş ya da "Ana sayfa" — temel SEO hatası.

---

## Küçük bir ajans için alınacak dersler

1. **Tek font ailesi, tek CSS değişkeni.** Fikri Mühim'in `--fm-font` yaklaşımı doğru: tipografiyi tek yerden yönet. Bir grotesk seçin ve ağırlıklarla hiyerarşi kurun. Ayırt edicilik istiyorsanız yalnızca başlıkta ikinci bir aile kullanın — Zeo'nun Gilroy + Akagi ikilisi gibi, SEM'in dört ailesi gibi değil.
2. **Beş sayfayı geçmeyin.** TBWA dört sayfayla, Sherpa tek sayfa ve beş çapayla idare ediyor. Uşak merkezli küçük bir ekip için doğru yapı: ana sayfa, işler, hizmetler, hakkımızda, iletişim. Blogu ancak gerçekten düzenli yazacaksanız ekleyin — Tribal'da olduğu gibi yarısı genel içerik olan bir blog ajansı küçültür.
3. **Üç vaka, rakamla.** Zeo'nun "%82 organik oturum artışı" ve CreatorDen'in "%100 satış hacmi artışı" kartları tüm logo duvarlarından daha ikna edici. Yirmi logo yerine, sonucu yazılmış üç iş gösterin. Küçük müşterilerin sonuçları da rakamdır.
4. **Nötr zemin + tek vurgu rengi.** Listedeki kazananların hepsi bunu yapıyor. Tribal'ın üç vurgu rengi (mavi, kırmızı, mor) neden olmadığını gösteriyor. Koyu zemin seçerseniz Zeo gibi bölüm bölüm açık zeminle alternatifleyin, tüm sayfayı siyah yapmayın.
5. **Hero'da ne yaptığınızı yazın, konumunuzu saklamayın.** Concept'in metinsiz hero'su ve SEM'in adres göstermemesi hata. Uşak merkezli olmak zayıflık değil: "Uşak'tan tüm Türkiye'ye" gibi net bir konumlandırma, İstanbul kalabalığında gerçek bir ayrışma noktasıdır. Hazır tema kullanacaksanız en azından fontu, paleti ve bölüm sırasını değiştirin ki Sherpa gibi şablon kokmasın.
