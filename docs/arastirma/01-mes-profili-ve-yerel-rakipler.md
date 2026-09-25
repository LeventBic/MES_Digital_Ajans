# Mes Dijital profili

## Doğrulanan bilgiler

| Alan | Bulgu | Kaynak |
|---|---|---|
| Tam ad | MES Digital / Mes Dijital Reklam Ajansı | [mesdijital.com.tr](https://mesdijital.com.tr/), [Yandex Haritalar](https://yandex.com.tr/maps/org/mes_dijital_reklam_ajansi/13086452734/) |
| Konum | Cumhuriyet Mah., Namık Kemal Cad. 9C, Uşak Merkez | [Yandex Haritalar](https://yandex.com.tr/maps/org/mes_dijital_reklam_ajansi/13086452734/) |
| Telefon | +90 539 497 43 27 (site), +90 541 186 64 37 (harita kaydı) | [mesdijital.com.tr](https://mesdijital.com.tr/), [Yandex](https://yandex.com.tr/maps/org/mes_dijital_reklam_ajansi/13086452734/) |
| E-posta | iletisim@mesdijital.com.tr | [mesdijital.com.tr](https://mesdijital.com.tr/) |
| Puan | 4.7 / 5 (Yandex, yorum sayısı belirtilmemiş) | [Yandex](https://yandex.com.tr/maps/org/mes_dijital_reklam_ajansi/13086452734/) |
| Konumlandırma | "Uşak merkezli dijital pazarlama ve influencer marketing ajansı" | [mesdijital.com.tr](https://mesdijital.com.tr/) |
| Hizmetler | Dijital Pazarlama, Sosyal Medya, Influencer Marketing, Web Tasarım, Reklam Yönetimi | [mesdijital.com.tr](https://mesdijital.com.tr/) |

Sitenin şu anki hâli bir "Çok yakında buradayız" bakım sayfası. Sayfadaki tam metin şu: *"Çok yakında buradayız / Uşak merkezli dijital pazarlama ve influencer marketing ajansı / Mes çok yakında burada! Bu sırada bize aşağıdaki kanallardan ulaşabilirsiniz."*

Ek olarak arama sonuçlarında ajansın kendini "İç Ege'nin en etkili dijital pazarlama ve tanıtım ajansı" diye tanımladığı bir açıklama metni görünüyor. Kaynak: [arama sonucu snippet'i, mesdijital.com.tr](https://mesdijital.com.tr/)

## Bakım sayfasından çıkan görsel dil

Bakım sayfası boş bir şablon değil, kurulu bir marka sistemi taşıyor. HTML kaynağından doğrudan okunanlar:

- **Tipografi:** Eina 04, dört ağırlıkta self-hosted woff2 (`/assets/fonts/eina04-light.woff2`, `-regular`, `-semibold`, `-bold`). Ticari, geometrik bir grotesk. Ağırlık eşlemesi kaynak yorumunda açıkça belgelenmiş: light→300, regular→400/500, semibold→600, bold→700/900. Bölgedeki hiçbir rakip ücretli font kullanmıyor.
- **Renk:** Marka kırmızısı `#e51b26`, açık temada WCAG kontrastı için `#c4141d`'ye düşürülüyor. Kaynak yorumunda bu gerekçe yazılı: "açık zeminde kırmızı metin için WCAG'a uygun ton".
- **Tema:** Koyu tema varsayılan (`--bg: #0d0d0d`, `--heading: #fff`), açık tema `#f4f4f4` zemin ve `#161616` başlık. `localStorage` ve `prefers-color-scheme` ile çalışan gerçek bir tema anahtarı var, FOUC engelleyen inline script ile.
- **Yüzeyler:** Yarı saydam cam kartlar (`--card-bg: rgba(255,255,255,0.07)`, `--card-border: rgba(255,255,255,0.12)`), ince ayrılmış metin tonları (`--text`, `--text-muted`, `--text-contact`), filigran katmanı (`--watermark`).
- **Ton:** Sade, kurumsal, İngilizce-Türkçe karışık. Başlıkta "MES Digital", gövde metni Türkçe, altbilgide "MES DİJİTAL".

Kaynak: [mesdijital.com.tr sayfa kaynağı](https://mesdijital.com.tr/)

## Bulunamayanlar

Aşağıdakiler için arama yapıldı ve **hiçbir doğrulanabilir kayıt bulunamadı**. Uydurulmadı:

- **Instagram, TikTok, Facebook, LinkedIn hesapları.** Bakım sayfasında hiç sosyal medya bağlantısı yok. `@mesdijital` araması eşleşme vermiyor, `site:instagram.com` araması da boş dönüyor. Dolayısıyla içerik türleri (reels, influencer iş birlikleri, müşteri paylaşımları) hakkında da yorum yapılamıyor.
- **Kuruluş yılı, ekip üyeleri, çalışan sayısı.**
- **Müşteri referansları, çalışılan markalar, yürütülen kampanyalar.**
- **Haber, basın bülteni, iş ilanı.**
- **Web arşivi kaydı.** [archive.org Wayback API](http://archive.org/wayback/available?url=mesdijital.com.tr) için snapshot yok, yani sitenin daha önce yayında olan bir sürümü de yok.
- **Ajans dizini kaydı.** [dijitalajanslar.com Uşak listesi](https://www.dijitalajanslar.com/dijital-reklam-ajanslari-usak/) "Henüz ajans bulunamadı" dönüyor, Mes orada kayıtlı değil.

Pratik sonuç: ajansın dijital ayak izi şu an neredeyse sıfır. Doğrulanabilen tek üçüncü taraf kaydı Yandex Haritalar girişi. Marka sistemi hazır, vitrin yok.

---

# Yerel rakipler

Önemli bir ayrım: aramalarda çıkan **Nexus Ajans, Rone Ajans, Ruber Media, Cube Ajans, Gözde Ajans, AdCraft360, Innovation Labs Studio ve sosyalmedyasirketi.com gerçek yerel ajanslar değil.** Bunlar her şehir için otomatik üretilmiş SEO iniş sayfaları olan ulusal ağlar; aynı içerik "Uşak reklam ajansı", "Manisa reklam ajansı", "Kütahya reklam ajansı" diye çoğaltılmış. Aşağıdaki on ajans gerçekten o şehirde yerleşik.

Font ve renk verileri WebFetch özetinden değil, sayfa kaynağı ve harici CSS dosyaları doğrudan curl ile çekilip `font-family`, `fonts.googleapis.com` bağlantıları ve hex kodları sayılarak okundu.

| # | Ajans | Şehir | Site | Tasarım | Font | Ana renkler | Teknoloji |
|---|---|---|---|---|---|---|---|
| 1 | Arı Medya | Uşak | [arimedya.org](https://arimedya.org/) | 4/5 | Poppins (400–800) | `#f9b041` amber, `#221d16` koyu kahve, `#f1ece1` krem | Özel kodlama |
| 2 | Reklamlarim | Uşak / Konya | [reklamlarim.com](https://www.reklamlarim.com/) | 3/5 | Kumbh Sans + Roboto + Catamaran + Merriweather + Shadows Into Light | `#fc653c` turuncu | Next.js |
| 3 | Anıl Dijital Medya | Denizli | [anildijitalmedya.com](https://anildijitalmedya.com/) | 4/5 | Inter (300–900) | `#ff5c00` turuncu, `#ffc400` sarı, `#1a1a1a` | React / Vite |
| 4 | MarifAd | Denizli | [marifad.com.tr](https://www.marifad.com.tr/) | 3/5 | Titillium Web | `#104cba` mavi, `#02218f` lacivert, `#091d3e` | Bootstrap şablon |
| 5 | Yobisi | Denizli | [yobisi.com](https://www.yobisi.com/) | 2.5/5 | Montserrat (400/600/700) | `#201f1f` koyu gri, `#b94a48` kiremit | Bootstrap 5 |
| 6 | Appa Ajans | Kütahya | [appaajans.com](https://www.appaajans.com/) | 2.5/5 | Roboto + Montserrat + Suez One + Helvetica | `#116dff` Wix varsayılan mavisi | Wix |
| 7 | Medyafyon | Afyonkarahisar | [medyafyon.com](https://medyafyon.com/) | 3.5/5 | Inter (300–800) | `#121212` siyah, `#11e44f` neon yeşil, `#dafae4` nane, `#f20000` | WordPress 7.1 + Elementor + Hello theme |
| 8 | Atölye 45 | Manisa | [atolye45.com](https://www.atolye45.com/) | 3/5 | Rubik (300–900) | `#27c9e8` camgöbeği, `#c10e0e` kırmızı, `#323232` | Özel + Bootstrap |
| 9 | İzmir Influencer | İzmir | [izmirinfluencer.com](https://www.izmirinfluencer.com/) | 3.5/5 | CSS değişkeni `--titlefontfam`, self-hosted | `#85ee00` limon yeşili, `#131315` siyah, `#eae7f3` | Bootstrap 5.3.6 |
| 10 | Astro Dijital | İzmir | [astrodijital.com](https://astrodijital.com/) | 5/5 | Helvetica Neue / sistem + Raleway + EB Garamond | `#b33901` yanık turuncu, `#69aaba` çamurlu mavi, `#1a1a1a` | Next.js |

Not: on sitenin tamamında `viewport` meta etiketi mevcut, yani hiçbiri tamamen mobil uyumsuz değil.

## Ajans ajans yorum

### 1. Arı Medya — Uşak

Mes'in en yakın coğrafi rakibi. Tabela, matbaa, promosyon ürünleri ve otobüs reklamcılığı gibi geleneksel işleri dijitalle birlikte satıyor, yani dijital-saf bir ajans değil. Sitesi bölgedeki en iyi kodlanmış işlerden biri: tek font ailesi, tutarlı sıcak amber-krem paleti ve hero → hizmetler → neden biz → projeler → blog → CTA akışı. Çalışan bir "Sizi Arayalım" geri arama modalı var (`callForm`, `callModalOverlay`), bu bölgede nadir. Hizmet başlıkları: Matbaa Baskı, Promosyon Ürünleri, Açık Hava Reklamcılığı, Web Tasarım & Yazılım, SEO & Google Ads. **Güçlü:** özel kodlama, net görsel kimlik, çoklu hero slaytı, blog. **Zayıf:** influencer marketing hizmet listesinde hiç geçmiyor; sosyal medya yönetimi öne çıkmıyor. [Kaynak](https://arimedya.org/)

### 2. Reklamlarim — Uşak / Konya

Uşak ve Konya'yı birlikte hedefleyen, ağırlığı yazılıma kayan bir ajans. Next.js üzerine kurulu ve yapısı dolu: Özel Yazılım Çözümleri, Süreç Nasıl İşler, IOS ve Android Mobil Uygulama, Programlarımız, Hizmetlerimiz, Referanslarımız, Müşteri Görüşleri, İletişim, Haberler & Blog. **Güçlü:** referans ve müşteri görüşü bölümlerinin ikisi de mevcut, modern teknoloji. **Zayıf:** tipografisi dağınık, tek sayfada beş ayrı Google font ailesi yükleniyor (Kumbh Sans, Roboto, Catamaran, Merriweather, Shadows Into Light) ve el yazısı font kurumsal görünümü bozuyor. Influencer tarafı yok, konumlandırma "yazılım ajansı"na kayıyor. [Kaynak](https://www.reklamlarim.com/)

### 3. Anıl Dijital Medya — Denizli

Bölgenin en agresif dönüşüm odaklı sitesi. Ana sayfa şu bölümlerle ilerliyor: hero → Dijital Pazarlamada Tam Çözüm → Sonuçlar Konuşuyor (istatistik) → Güvenen Markalar → Başarı Hikayeleri → 3 Şehirde 1 Ajans → 4 Adımda Büyüme → Ücretsiz Danışmanlık CTA. Bölüm kimlikleri düzgün adlandırılmış (`hizmetler`, `referanslar`, `surec`, `bolgeler`, `iletisim`). Meta açıklamasında telefon numarasını doğrudan veriyor. Denizli, Kuşadası ve Antalya'yı kapsıyor. GEO optimizasyonu ve TikTok reklamlarını ayrı hizmet olarak listeliyor, bu ileri görüşlü. **Güçlü:** en eksiksiz sayfa yapısı, güçlü CTA mimarisi, 150+ proje ve 5+ yıl iddiası. **Zayıf:** influencer marketing ayrı bir hizmet olarak konumlandırılmamış; palet (turuncu-sarı) bölgede fazlasıyla yaygın. [Kaynak](https://anildijitalmedya.com/)

### 4. MarifAd — Denizli

Adını "marifet" ve "ad" kelimelerinin birleşiminden türetmiş, 360 derece reklamcılık iddiasıyla çalışıyor ve "minimum bütçe, maksimum etkileşim" vaadi veriyor. Hazır Bootstrap şablonu üzerine kurulu, klasik kurumsal mavi paletli. "Kahveye Bekliyoruz" gibi samimi dokunuşları ve bir Teklif Formu modalı var. Hizmetler: Sosyal Medya Yönetimi, Dijital Reklam Yönetimi, Web Sitesi Tasarımı, Google SEO, Grafik Tasarım, Fotoğraf ve Video Çekimi. **Güçlü:** hizmet seti geniş, marka hikâyesi (isim türetimi) var, teklif formu erişilebilir. **Zayıf:** başlık hiyerarşisi çok zayıf, tüm ana sayfada sayılı H2 var; hizmet kartları dışında derinlik ve kanıt yok; şablon kokusu belirgin. [Kaynak](https://www.marifad.com.tr/)

### 5. Yobisi — Denizli

Listenin en sorunlu sitesi. H1 etiketi tek başına on ayrı anahtar kelimeyi virgülle sıralıyor: "Denizli web tasarım, Denizli mobil uygulama geliştirme, Denizli sosyal medya yönetimi, Denizli özel yazılım, Denizli reklam ajansı, Denizli SEO hizmetleri, Denizli harita kaydı, Denizli mail yönetimi, Yobisi dijital çözümler". H2 de aynı şekilde doldurulmuş. Bu hem okuyucuya hem arama motorlarına kötü bir sinyal. Montserrat ve Bootstrap 5 ile teknik altyapısı ayakta, tanıtım filmi modalı ve teklif modalı var. **Güçlü:** teklif ve tanıtım filmi modalları, geniş hizmet yelpazesi. **Zayıf:** anahtar kelime istifi, görsel kimlik yok, dört hizmet başlığı dışında içerik neredeyse boş, eski CDN bağımlılıkları (html5shiv, maxcdn). [Kaynak](https://www.yobisi.com/)

### 6. Appa Ajans — Kütahya

Wix ile kurulmuş ve varsayılan Wix mavisini (`#116dff`) hiç değiştirmemiş. Sayfa kaynağı 721 KB, bölgedeki en şişkin çıktı. Buna karşılık metin tonu listedeki en insancıl olanı: "SADECE SENİN İÇİN", "Ah gurur duyduğumuz Çalışmalarımız!", "Ayran İçmeyelim Ayrı Kalmayalım!", "İşletmeni Birlikte Uçuralım!", "Takımımıza Katılmak İstersen Eğer". Hizmetler: Sosyal Medya, Web Tasarım, Fotoğraf & Video, Markalaşma. **Güçlü:** özgün ve akılda kalıcı ses tonu, işe alım bölümü olan tek ajans, e-bülten kaydı. **Zayıf:** Wix'in şişkin çıktısı, karışık font seti (Roboto + Montserrat + Suez One + Helvetica), kimliksiz varsayılan renk, anlamsız otomatik üretilmiş bölüm kimlikleri. İyi bir ses kötü bir kabuğa hapsolmuş. [Kaynak](https://www.appaajans.com/)

### 7. Medyafyon — Afyonkarahisar

İçerik pazarlamasında bölgenin açık ara lideri. Ana sayfadan sektöre özel blog yazılarına bağlantı veriyor: "Afyonkarahisar Reklam Ajansı: İşletmeler İçin Dijital Büyüme Rehberi", "Afyon Sosyal Medya Ajansı: İşletmeler İçin 7 Strateji", "Termal Otel Google Ads Yönetimi: Afyon İçin 9 Strateji". Son başlık özellikle dikkat çekici, Afyon'un termal turizm nişini doğrudan hedefliyor. Görsel dili koyu zemin (`#121212`) üstüne neon yeşil (`#11e44f`) ve nane tonları; Elementor global renk değişkenlerinden okundu. Yapı: hero → Neden Medyafyon → istatistik (100+, Başarı Oranı) → Hizmetlerimiz → blog → CTA. **Güçlü:** yerel niş SEO içeriği, 100+ proje iddiası, Google Site Kit ile ölçüm kurulu, cesur renk seçimi. **Zayıf:** WordPress ve Elementor üstüne kurulu olduğu için sayfa ağır (232 KB HTML, 946 elementor referansı); influencer marketing yok; hizmetler jenerik. [Kaynak](https://medyafyon.com/)

### 8. Atölye 45 — Manisa

Kendini "kreatif reklam ajansı" diye tanımlıyor ve Rubik ile temiz, geniş ağırlık aralıklı bir tipografi seçmiş. Camgöbeği aksan rengi (`#27c9e8`) bölgedeki turuncu-mavi tekdüzeliğinden gerçekten ayrışıyor, logoda kırmızı-sarı gradyan kullanıyor. Bir SSS bölümü (`sorular`) var. **Güçlü:** özgün renk seçimi, temiz font, kendi kodlanmış CSS'i, SSS bölümü. **Zayıf:** yapı çok zayıf, tüm ana sayfada tek bir H1 ("Manisa Web Tasarım Reklam Ajansı") var ve altında anlamlı bir başlık hiyerarşisi kurulmamış; bu hem tarayıcıyı hem ziyaretçiyi yönsüz bırakıyor. Meta açıklaması ("Profesyonel ve kurumsal internet yazılımları ile işinizi büyütün") "kreatif ajans" iddiasıyla çelişiyor. [Kaynak](https://www.atolye45.com/)

### 9. İzmir Influencer — İzmir

Mes'in konumlandırma açısından **en doğrudan rakibi**. Tek işi influencer aracılığı ve sayfa yapısı buna göre kurulmuş. Bölüm akışı: hero ("İzmir'in Gücünü Etkiye Dönüştürüyoruz") → Etkiden Güce: İzmir'in Dijital Yüzüyüz → neler-yapiyoruz → Stratejiyi Sanata Dönüştürüyoruz → influencer profilleri → Bizi En İyi Onlar Anlatır (referans) → Merak Ettiklerinizi Cevapladık (SSS) → blog → CTA.

Influencer'ları isim isim listeliyor: Ayşe Korkmaz, Can Demirtaş, Elif Nur Aktaş, Murat Tunalı, Zeynep Yalçın, Berk Eren. SSS bölümü iki ayrı kitleye yazılmış ve bu modelin özü: "Influencer İzmir'e nasıl kayıt olabilirim?", "Marka olarak nasıl influencer bulabilirim?", "İş birliği süreci nasıl ilerliyor?", "Influencer olmak için minimum takipçi sayısı var mı?", "Kampanya sonuçlarını nasıl görebilirim?", "Influencer İzmir sadece İzmir'deki kullanıcılarla mı çalışıyor?". Blog da niş: "İzmir Yemek Influencerları ile Mekan Tanıtımı Nasıl Yapılır?", "İzmir Influencerları Kimlerdir? Hangi Kategorilerde Öne Çıkıyorlar?".

Siyah üstüne limon yeşili (`#85ee00`) bir palet ve mikro-influencer ağı vurgusu kullanıyor. **Güçlü:** kategoride en net konumlandırma, iki taraflı içerik modeli, influencer vitrini, niş blog. **Zayıf:** teknik olarak sıradan bir Bootstrap sitesi, CDN bağımlılığı yoğun, sayfa kaynağı ince (28 KB), tipografi CSS değişkenine gömülü ve zayıf. İçerik modeli örnek alınmaya değer, kabuk değil. [Kaynak](https://www.izmirinfluencer.com/)

### 10. Astro Dijital — İzmir

Listenin en profesyonel sitesi ve gerçek bir üst lig örneği. Next.js, ölçülü bir yanık turuncu paleti (`#b33901`, `#ff5200`) ve çamurlu mavi aksan (`#69aaba`); serif (EB Garamond) ile sans karışımından editoryal bir tipografi çıkmış. Başlıklar iddialı ve kısa: "Biz tasarım ve yazılım şirketiyiz.", "Tasarım. Yazılım. Ürün. Strateji.", "Dijital Ürünler ve Deneyimler Tasarlıyoruz", "Yapay Zeka Kodluyoruz".

En güçlü yanı kanıt: Arkas Heavy Lojistik, Toper Coffee Roasters, Dizitrack, YoPals!, WithThem, Paşa Country ED gibi gerçek marka işlerini vaka olarak gösteriyor ve on yılı aşkın tecrübe iddiasını bunlarla destekliyor. **Güçlü:** gerçek vaka çalışmaları, olgun tasarım sistemi, modern altyapı, erişilebilirlik için `main-content` atlama hedefi. **Zayıf:** influencer marketing'i hizmet olarak sayıyor ama kendini "yazılım ve tasarım şirketi" diye tanımlıyor, yani odak orada değil; yerel KOBİ'den çok kurumsal müşteriye konuşuyor, bu da Mes'in hedef kitlesiyle doğrudan çakışmıyor. [Kaynak](https://astrodijital.com/)

---

# Mes Dijital'in sitesi için çıkarımlar

**1. Influencer ağını isim isim, yüz yüz göster.**
İç Ege'deki on rakipten yalnızca biri, İzmir Influencer, influencer'ları profil olarak listeliyor ve o da İzmir'de. Uşak, Denizli, Afyon, Kütahya ve Manisa'daki dokuz ajansın hiçbirinde influencer havuzu yok, çoğunda hizmet kalemi olarak bile geçmiyor. Mes'in "influencer marketing ajansı" iddiası, İç Ege mikro-influencer'larını kategori (yemek, moda, yaşam), şehir ve erişim bilgisiyle gösteren bir vitrinle somutlaşırsa bölgede rakipsiz olur. Bu aynı zamanda bölgedeki en savunulabilir varlık, çünkü kopyalanması ay alır.
Kaynaklar: [izmirinfluencer.com](https://www.izmirinfluencer.com/), [arimedya.org](https://arimedya.org/), [anildijitalmedya.com](https://anildijitalmedya.com/), [medyafyon.com](https://medyafyon.com/)

**2. Kampanya sonucunu sayıyla ver, hizmet listesi sayma.**
Rakiplerin neredeyse tamamı aynı altı kalemi sıralıyor: web tasarım, SEO, Google Ads, sosyal medya, grafik tasarım, Meta reklamları. Gerçek kanıt sunan tek ajans Astro Dijital ve bunu Arkas ile Toper Coffee gibi isimlendirilmiş marka vakalarıyla yapıyor. Diğerleri "100+", "150+", "5+ yıl" gibi doğrulanamayan sayılarla yetiniyor. Erişim, etkileşim ve dönüşüm rakamları taşıyan üç dört gerçek kampanya vakası, on hizmet kartından daha çok iş getirir.
Kaynaklar: [astrodijital.com](https://astrodijital.com/), [medyafyon.com](https://medyafyon.com/), [anildijitalmedya.com](https://anildijitalmedya.com/), [marifad.com.tr](https://www.marifad.com.tr/)

**3. Zaten sahip olduğun tipografi avantajını kullan.**
Bakım sayfası self-hosted Eina 04'ü dört ağırlıkta yüklüyor. Bölgedeki on rakibin tamamı ücretsiz Google fontlarıyla çalışıyor: Inter iki kez, Poppins, Montserrat iki kez, Rubik, Titillium Web, Roboto. Biri beş fontu aynı anda yüklüyor, biri Wix varsayılanında kalmış. Tek, ticari bir aileye bağlı kalmak Mes'i daha ilk ekranda görsel olarak ayırır ve bu avantaj bedava değil, zaten satın alınmış durumda.
Kaynaklar: [mesdijital.com.tr](https://mesdijital.com.tr/), [reklamlarim.com](https://www.reklamlarim.com/), [appaajans.com](https://www.appaajans.com/), [anildijitalmedya.com](https://anildijitalmedya.com/)

**4. Kırmızıyı sahiplen, koyu temada kal.**
Bölge paleti turuncu ve mavide sıkışmış: Anıl turuncu, Reklamlarim turuncu, Astro yanık turuncu, Arı Medya amber, MarifAd mavi, Appa Wix mavisi, Yobisi kiremit, Atölye 45 camgöbeği. Koyu zemin kullanan iki ajans var (Medyafyon ve İzmir Influencer) ve ikisi de neon yeşile gitmiş. Mes'in `#e51b26` kırmızısı ile `#0d0d0d` zemini, İç Ege'de kimsenin sahiplenmediği tek kombinasyon. Açık tema için hazırlanmış `#c4141d` erişilebilirlik tonu da işin doğru yapıldığını gösteriyor; bu titizlik hiçbir rakipte yok.
Kaynaklar: [mesdijital.com.tr](https://mesdijital.com.tr/), [medyafyon.com](https://medyafyon.com/), [izmirinfluencer.com](https://www.izmirinfluencer.com/), [atolye45.com](https://www.atolye45.com/)

**5. Marka ve influencer için iki ayrı giriş kapısı aç.**
Rakiplerin tümü tek yönlü çalışıyor, sadece markaya satış yapıyor. Oysa influencer ajansı iki taraflı bir iştir ve İzmir Influencer bunu SSS'ini iki ayrı kitleye yazarak çözmüş: markaya "nasıl influencer bulurum", içerik üreticisine "nasıl kayıt olurum". Appa Ajans'ın işe alım bölümü de aynı fikrin zayıf bir versiyonu. Mes ana sayfada "Marka mısınız?" ve "Influencer mısınız?" diye ayrılan iki net yol sunarsa, hem müşteri kazanır hem de rakiplerin sahip olmadığı asıl varlığı, yani içerik üretici havuzunu, kendiliğinden büyütür.
Kaynaklar: [izmirinfluencer.com](https://www.izmirinfluencer.com/), [appaajans.com](https://www.appaajans.com/), [anildijitalmedya.com](https://anildijitalmedya.com/), [yobisi.com](https://www.yobisi.com/)

---

## Yöntem notu

Rakip sitelerin ana sayfa HTML'i ve harici CSS dosyaları `curl` ile doğrudan çekildi; `font-family` bildirimleri, `fonts.googleapis.com` bağlantıları, `@font-face` blokları, hex renk kodları ve Elementor global renk değişkenleri sayılarak okundu. Başlık hiyerarşisi ve bölüm kimlikleri aynı kaynaklardan çıkarıldı.

Ham dosyalar (on rakibin ana sayfa HTML'i, dört harici CSS dosyası ve Mes Dijital bakım sayfası) araştırma sırasında geçici bir klasörde tutuldu ve depoya alınmadı. Gerekirse aynı `curl` çekimiyle yeniden üretilebilir.

## Güncelleme — 26 Eylül 2026

- **Telefon tutarsızlığı hâlâ açık:** sitede +90 539 497 43 27, Yandex Haritalar kaydında +90 541 186 64 37. Google İşletme Profili açılırken ikisi tek numarada birleştirilmeli.
- **Sosyal medya hesabı hâlâ yok.** 07 Çerçeve önerisi hesapları `assets/js/data.js` → `agency.social` alanından okuyor; adres girilene kadar sitede tıklanamaz soluk metin olarak görünüyorlar.
- **WhatsApp** (`wa.me/905394974327`) yedi tasarım önerisinin hepsinde iletişim kanalı olarak var.
- Site dışı görünürlük için yapılacaklar (Google İşletme Profili, dizinler, ödül başvuruları): `04-obys-seo-ve-gorunurluk.md`.
