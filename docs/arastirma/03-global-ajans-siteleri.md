# Global Ajans Siteleri — Referans Araştırması

*Mes Dijital (Uşak) site tasarımı için • Tarih: 17 Eylül 2026*

**Yöntem notu:** Tüm font adları ve renk değerleri sitelerin ham HTML/CSS kaynağından (`@font-face`, `font-family`, CSS değişkenleri, `.woff2` dosya adları) okundu. Okunamayan yerler açıkça belirtildi. Animasyon yoğunluğu, kaynakta tespit edilen kütüphanelerden (GSAP, Lenis, WebGL, Locomotive Scroll) ve sayfa içeriğinden çıkarıldı. Toplam 27 site indirilip incelendi.

---

## Özet Tablo

### A) Büyük / Ünlü Ajanslar

| Ajans | URL | Fontlar (kaynaktan) | Zemin / Vurgu | Yapı kısaca | Animasyon | Puan |
|---|---|---|---|---|---|---|
| Huge | hugeinc.com | Huge Matter (özel kesim, ticari) | Açık + koyu bölümler / `#00ff75` yeşil, `#ff0090` macenta | Hero showreel → müşteri logoları → vaka → çözümler → fikirler | Orta | 4 |
| R/GA | rga.com | Helvetica Now Display/Text/Micro + özel Helvetica Variable (ticari) | Beyaz `#fff` / siyah | Hero cümle → ne yapıyoruz → haberler → kariyer → 9 ofis | Az-orta | 4 |
| Instrument | instrument.com | Instrument Sans (VF), Instrument Serif, Instrument Sans Mono — **ücretsiz, Google Fonts'ta** | Tema değişkenli `#070708` / `#e8e8e9` | İş → müşteri listesi → hizmetler → ödüller → amaç → bülten | Orta | 5 |
| Wieden+Kennedy | wk.com | Univers LT Std (Linotype, ticari) | Beyaz / siyah | Video hero → iş → hakkında → ofisler | Orta | 4 |
| Droga5 | droga5.com | Drotesk No.5 (özel) + GT Pressura & Pressura Mono (ticari) | Beyaz `#fff` / siyah | Tamamen JS ile üretiliyor, kaynaktan okunamadı | Orta-yoğun | 3 |
| DEPT | dept.global | **Kaynaktan okunamadı** (CSS JS ile enjekte) | Açık zemin ağırlıklı | Hero slogan → ürün → AI → iş → çözümler → kültür | Orta | 3 |
| AKQA | akqa.com | Season Sans / Season Serif / Season Mix (özel) + Inconsolata (ücretsiz) | İkili tema `#fff` ↔ `#000`/`#191919` | 3 slaytlı hero → iş → manifesto → haberler → CTA | Orta | 4 |
| Work & Co | work.co | Helvetica Now Display (ticari) + Adobe Garamond Pro (Typekit) | Beyaz / siyah | Manşet cümle → iş → uygulama alanları → müşteriler → 7 ofis | Az | 4 |
| Pentagram | pentagram.com | Plain (Optimo, ticari) + Neue Haas | Beyaz / renk işten gelir | Dev proje görseli → filtreli grid → retrospektifler → son işler | Az | 5 |
| Mother London | motherlondon.com | Basis + Basis Mono + Rongel (serif) | Değişkenli `#fff` / `#000` / `#222` | Motherverse → misyon sohbeti → quiz → logolar → favoriler | Orta | 4 |
| Uncommon | uncommon.studio | Maisonneue Book/Demi (ticari) — Webflow | Beyaz `#fff` / siyah | Logo → Live Feed / Editorial / Shop / Info | Az | 3 |
| BUCK | buck.co | Mabry & Mabry Light Pro (Colophon, ticari) | Açık / işten gelen renk | Hero cümle → öne çıkan iş → ofisler → bülten | Orta | 4 |
| Locomotive | locomotive.ca | PP Locomotive New (özel) + Helvetica Now Display | Tema başına `#000`, `#fff`, `#312DFB`, `#DA382E` | Hero → 5 iş → ajans → yazılar → kültür → mağaza | Yoğun (Locomotive Scroll) | 5 |
| Darkroom | darkroom.engineering | "sauce" + "therma" (adı gizlenmiş özel) + mono | Siyah `#000` / kırmızı `#e71419` | Hero → yetenekler → iş → açık kaynak → etkinlik günlüğü | Yoğun (Lenis + WebGL) | 5 |
| Dogstudio | dogstudio.co | Gilroy + GT Sectra Display + Heebo (ücretsiz) | Koyu `#131419` / işten gelen renk | "We Make Good Shit" → stüdyo → projeler → iletişim | Orta-yoğun | 4 |
| Obys | obys.agency | Obys / ObysSans4 (kendi özel fontu) | Açık zemin | 19 projelik grid → hakkında → iletişim | Yoğun | 5 |
| Active Theory | activetheory.net | NB Architekt Std (Neubau, ticari) | Koyu | Tamamen WebGL uygulaması, HTML kabuk 8 KB | Çok yoğun | 4 |

### B) Butik / Ödüllü Stüdyolar + Influencer Marketing

| Ajans | URL | Fontlar (kaynaktan) | Zemin / Vurgu | Yapı kısaca | Animasyon | Puan |
|---|---|---|---|---|---|---|
| Exo Ape | exoape.com | Lausanne 300/400/500 (ticari) | Açık | Hero → stüdyo → projeler → reel → basın → hikaye | Orta-yoğun | 5 |
| Unseen Studio | unseen.co | Neue Montreal + Saol Display (ticari) | `#fff` / metin `#0d0e13` | Giriş → 2025 Wrapped → Unseen World → projeler → merhaba | Orta (WebGL izi) | 5 |
| Form&Fun | formandfun.co | Aeonik + **FK Grotesk Trial** (deneme sürümü!) | Beyaz | Hero → iş → stüdyo → yetenek → ödüller → logolar | Yoğun (GSAP+Lenis+WebGL) | 4 |
| Cuberto | cuberto.com | Suisse Intl (ticari) + Manrope (ücretsiz) | `#fff` / metin `#000` | Hero → ne yaparız → 5 hizmet → iş → neden biz → SSS | Orta (Astro+GSAP+Lenis) | 4 |
| Basic/DEPT | basicagency.com | Scto Grotesk A (Schick Toikka, ticari) | Tema değişkenli | Hero → ödüller → işler → haberler → girişimler | Orta | 4 |
| Hello Monday | hellomonday.com | NB International Pro + Clarendon BT (ticari) | `#fff` / metin `#000` | Hero → iş → stüdyo → haberler | Orta (PixiJS) | 4 |
| Viral Nation | viralnation.com | **Inter + JetBrains Mono (ikisi de ücretsiz)** | Açık | Hero → logolar → AI → pazar verisi → rakip tablosu → 8 adım → vakalar → ödüller | Az | 4 |
| Billion Dollar Boy | billiondollarboy.com | Futura ND Condensed (ticari) — Webflow | `#fff` / metin `#333` | Hero → vaka karuseli → değer önerisi → logolar → yetenekler → CTA | Az-orta (Lenis) | 4 |
| Influencer.com | influencer.com | DM Sans (ücretsiz Google) — Webflow | `#fff` / metin `#333` | "We humanize brands" → partnerler → 3 teklif → platform → metrikler → vakalar | Az (GSAP) | 4 |
| Goat Agency | goatagency.com | **Kaynaktan okunamadı** (yönlendirme) | Açık | Hero → iş → logolar → 5 yetenek → ödüller → pazarlar → haberler | Az | 3 |

**Not:** Jam3 artık bağımsız değil. jam3.com bugün Monks (S4 Capital) içeriğine gidiyor ve Drupal üzerinde çalışıyor; eski WebGL kimliği kalmamış. Resn (resn.co.nz) yalnızca 4 KB'lık eski bir kabuk döndürüyor, aktif bir portfolyo sunmuyor. Ueno kapandı, atlandı.

---

## Site Detayları

### A Grubu

**Huge** — hugeinc.com, New York + global, "deneyim tasarımı ve ürün".
Tek font ailesiyle yürüyor: `HugeMatter_Regular/Medium/SemiBold.woff2`, yani Matter'ın kendilerine özel kesimi. Marka paletinde iki agresif renk tanımlı: `--color-brand-green: #00ff75` ve `--color-brand-magenta: #ff0090`, siyah-beyaz temelin üstünde.
Ana sayfa sırası: showreel hero → değer cümlesi → müşteri logoları → seçilmiş vakalar → "Never one and done" → 6 kutuluk çözüm gridi → fikirler → footer.
Next.js, ağır kütüphane yok. 300 KB HTML, animasyon ölçülü.
**Puan 4.** İki floresan vurgu rengini tek bir nötr tipografiyle dengeleyerek kurumsal olmadan ciddi duruyor.

**R/GA** — rga.com, 9 ülke, "zeki marka sistemleri".
Kaynakta tam Helvetica Now ailesi var: Display, Text ve Micro kesimleri, artı `HelveticaVariableforRGAW05` adlı kendilerine lisanslanmış değişken sürüm. Beyaz zemin `#fff`, tek vurgu siyah.
Hero tek cümle: "We design intelligent brand systems that help businesses get ahead." Sonra ne yaptıkları, 4 haber, kariyer çağrısı, 9 ofis.
44 KB'lık çok hafif HTML. Animasyon neredeyse yok.
**Puan 4.** Tek bir font ailesinin üç optik boyutunu kullanarak, hiç renk harcamadan hiyerarşi kuruyor.

**Instrument** — instrument.com, Portland, "dijital öncelikli tasarım ajansı".
Küçük ajanslar için en önemli örnek: kendi fontlarını yapıp bedava dağıtmışlar. Kaynakta `InstrumentSansVF.woff2`, `InstrumentSerif-Regular/Italic.woff2`, `InstrumentSansMono-Regular.woff2` var. Instrument Sans ve Instrument Serif Google Fonts'tan ücretsiz indirilebiliyor.
Tema değişkenleri açık/koyu geçişi yapıyor: `--theme-accent-background` `#070708` ile `#e8e8e9` arasında. Bölüm bölüm zemin rengi değişiyor.
Sıra: filtrelenebilir son işler → müşteri listesi → hizmetler (marka/pazarlama/ürün) → ödüller → amaç → haberler → bülten → iletişim.
**Puan 5.** Ücretsiz üç fontla (grotesk + serif + mono) tam bir tipografik sistem kurmuş, kopyalanabilir.

**Wieden+Kennedy** — wk.com, Portland + 10 ofis, reklam.
Univers LT Std'in Light, Regular, Bold, Black ve eğik kesimleri `@font-face` ile yükleniyor, alt-küme haline getirilmiş. Beyaz zemin, siyah metin.
Ana sayfa neredeyse tümüyle video: Nike, LEGO, McDonald's, Absolut, YETI işleri hero karuselinde oynuyor. Sonra portfolyo, hakkında, ofis listesi.
Framer Motion ve GSAP izleri var, 340 KB.
**Puan 4.** İşin kendisi tasarım olduğu için arayüzü tamamen sıfırlamış, sadece video ve Univers.

**Droga5** — droga5.com, New York, reklam (Accenture Song bünyesinde).
Özel Drotesk No.5 ailesi (Regular/Medium/Bold) ana font, yanında GT Pressura ve GT Pressura Mono. Japonca sürüm için Noto Sans JP yüklüyor. Zemin `#fff`.
Sayfa tamamen JavaScript ile kuruluyor; ham HTML'de tek bir bağlantı bile yok, bu yüzden bölüm sırasını kaynaktan doğrulayamadım.
**Puan 3.** Tipografisi güçlü ama JS'siz hiçbir içerik sunmaması SEO ve erişilebilirlik açısından kötü bir örnek.

**DEPT** — dept.global (deptagency.com buraya yönleniyor), Amsterdam + global.
Font bildirimlerini okuyamadım: CSS runtime'da enjekte ediliyor, ham kaynakta sadece `font-family: inherit` var. Görsel tahmin gerektirir, uydurmuyorum.
Hero: "THE GROWTH INVENTION COMPANY". Sonra ürün tanıtımı, AI dönüşümü, işler, Gartner rozeti, 5 çözüm alanı, kültür karuseli, içgörüler.
Footer'da alt ajansları listeliyor: Basic, Dogstudio, Hello Monday, Studio Dumbar.
**Puan 3.** İçerik olarak zengin ama kurumsal SaaS sitesi gibi duruyor, kreatif ayrışması zayıf.

**AKQA** — akqa.com, London + global, "the frontier agency".
Üç özel font: `SeasonSans_Regular`, `SeasonSerif`, `SeasonMix`. Kod bloklarında Inconsolata (ücretsiz). Renk sistemi tam ikili tema: `--color-backgrounds-default` hem `#fff` hem `#000`, ikincil zemin `#e9e9e9` / `#262626`.
Üç slaytlı hero ("IMAGINE WHAT'S NEXT", "MAKE WHAT MATTERS"), ardından Montblanc/UPS/Nestlé işleri, manifesto bölümü, haberler, kapanış CTA'sı.
**Puan 4.** Sans + serif + karma üçlüsüyle aynı ailenin içinde ton değiştirebiliyor.

**Work & Co** — work.co, Brooklyn + 7 ofis, ürün tasarımı ve mühendisliği.
Helvetica Now Display'in Hair'den Black'e kadar tüm ağırlıkları ve eğikleri yükleniyor, yanında Typekit üzerinden Adobe Garamond Pro.
Manşet: "We solve complex problems through design & technology". Navigasyon Outcomes, Process, Leadership, Careers. İşler JW Anderson, Celanese, Pfizer üzerinden anlatılıyor. Ofisler Brooklyn, Portland, LA, Atlanta, Kopenhag, São Paulo, Rio.
Animasyon minimal, tipografi taşıyor.
**Puan 4.** Hair'den Black'e tek ailenin 9 ağırlığıyla, sıfır dekorasyonla hiyerarşi kurmuş.

**Pentagram** — pentagram.com, London + New York, tasarım.
Plain (Optimo döküm, François Rappo) Thin/Light/Regular kesimleriyle yükleniyor; `--plain: Plain, Arial, Sans-Serif` değişkeni tüm başlıkları besliyor. Palet sadece `--black: #000000` ve `--white: #FFFFFF`; renk yalnızca işlerden geliyor.
Ana sayfa dev bir proje görseliyle açılıyor, sonra disipline ve sektöre göre filtrelenen grid, retrospektif yazılar, ortakların alıntıları.
1,1 MB HTML ama neredeyse tümü içerik, animasyon kütüphanesi yok.
**Puan 5.** Arayüzü bilerek görünmez kılmış; 54 yıllık arşivi filtreleyen grid tek yıldız.

**Mother London** — motherlondon.com, London, bağımsız kreatif.
Basis (Basis Grotesque) ve Basis Mono ana ikili, başlıklarda Rongel adlı serif. Renk değişkenleri üç zemin tanımlıyor: `#fff`, `#000`, `#222`, bölüm bölüm geçiş yapıyor.
Hero "Explore the Motherverse™" animasyonlu GIF ile açılıyor. Sonra sohbet biçiminde misyon, "How Mother are you?" uyum testi, logolar, güncel favoriler (Anthropic, Uber Eats, KFC, M&S, IKEA).
**Puan 4.** Mono fontu ve oyunlaştırılmış quiz'iyle ajans kişiliğini arayüze taşıyor.

**Uncommon Creative Studio** — uncommon.studio, London.
Maisonneue Book ve Demi kesimleri kullanılıyor, site Webflow üzerinde. Zemin `#fff`, metin `#333`.
Navigasyon alışılmadık: Work veya Services yok; Live Feed, Editorial, Shop, Info var. Ana sayfa neredeyse boş, sadece göz logosu ve menü.
20 KB, en hafif sitelerden biri.
**Puan 3.** Cesur bir redüksiyon ama yeni bir müşterinin ne satın aldığını anlaması zor.

**BUCK** — buck.co, LA/NY/Sydney/Amsterdam/London, animasyon ve tasarım.
Mabry ve Mabry Light Pro (Colophon) yükleniyor; site Chakra UI üzerine kurulu, `--chakra-fonts-heading: Mabry`. Tipografi ölçeği 0.8rem'den 8rem'e kadar tanımlı.
Hero tek cümle, sonra J.P. Morgan, Kia, Dunkin' işleri, 5 ofis, bülten. Games ve Goods gibi yan markalara bağlantı var.
720 KB, video ağırlıklı.
**Puan 4.** Hareket işi yaptığı için siteyi sakin tutup tüm enerjiyi iş örneklerine bırakmış.

**Locomotive** — locomotive.ca, Montreal.
PP Locomotive New Light (Pangram Pangram özel kesimi) ve Helvetica Now Display. Renk değişkeni `--color-bg` dört değer alıyor: `#000000`, `#FFFFFF`, `#312DFB` (mavi), `#DA382E` (kırmızı) — bölümler arası tam renk geçişi.
Ana sayfa: hero → 5 öne çıkan iş (Scout Motors, Dulcedo, Lightship, The Drake Hotel, Wolverine) → ajans → yazılar → yıllık ekip gezileri ("Locomotive in Jamaica") → mağaza.
Kendi geliştirdikleri Locomotive Scroll kütüphanesini kullanıyor, 68 KB HTML.
**Puan 5.** Kültür bölümü ve mağazayla ajansı bir marka gibi satıyor, ödül avcılığı yapmadan karakterli.

**Darkroom** — darkroom.engineering (eski Studio Freight), geliştirme stüdyosu.
Fontlar `sauce` ve `therma` takma adlarıyla tanımlanmış, gerçek isimleri kaynakta gizli; ayrıca bir mono ailesi var. Zemin `--color-primary: #000`, vurgu `#e71419` kırmızı.
Hero: "Darkroom is a development studio that turns ambitious products... into work that ships." Ardından yetenekler, işler, açık kaynak projeler (Lenis, Satus, Hamo, Tempus) ve tarihli bir etkinlik günlüğü.
Kendi Lenis kütüphaneleri ve WebGL kullanılıyor.
**Puan 5.** Açık kaynak projelerini vitrine koyarak teknik güvenilirliği vaka çalışmasından daha güçlü anlatıyor.

**Dogstudio** — dogstudio.co, Belçika + Chicago/Amsterdam/Paris (DEPT bünyesinde).
Gilroy (Regular/Medium/Bold) ve GT Sectra Display (Medium/Bold) yükleniyor, üçüncü olarak Heebo — bu sonuncusu Google Fonts'ta ücretsiz. Zemin koyu: `#131419`.
Hero: "We Make Good Shit" + showreel. Sonra stüdyo tanımı, Tomorrowland, Navy Pier, Kennedy Center gibi projeler.
**Puan 4.** Grotesk + editoryal serif eşleşmesi koyu zeminde sinematik duruyor.

**Obys** — obys.agency, Ukrayna.
Kendi fontlarını yapmışlar: `ObysSans4.woff2`, `font-family: Obys, serif`. Açık zemin.
Ana sayfa tek bir 19 projelik grid: Makhno, Porsche Taycan, Peter Lindbergh, Miro, Eminente, Abetka. Her projede hizmet etiketleri: Creative Direction, Web Design/Dev, Identity, Concept, 3D. Footer'da CET saati canlı gösteriliyor.
92 KB, sayfa hafif ama etkileşim yoğun.
**Puan 5.** Sadece iş gridiyle, hiç pazarlama metni olmadan güven kuruyor.

**Active Theory** — activetheory.net, Los Angeles.
NB Architekt Std (Light/Regular/Bold, Neubau) üç formatta yükleniyor. HTML kabuğu yalnızca 8 KB; site tamamen WebGL uygulaması olarak açılıyor, bu yüzden bölüm sırasını kaynaktan çıkaramadım.
**Puan 4.** Teknik iddiası siteyle kanıtlanıyor, ama küçük bir ajans için kopyalanabilir değil.

### B Grubu — Butik ve Ödüllü

**Exo Ape** — exoape.com, Roermond, Hollanda.
Lausanne'ın 300/400/500 ağırlıkları `--font-f-lausanne-*` değişkenleriyle. Nuxt üzerinde, 120 KB.
Hero: küresel dijital tasarım stüdyosu tanımı, "Digital / Design / Experience" üçlüsü. Sonra stüdyo, öne çıkan projeler (Ottografie, Amaterasu, Columbia Pictures, Cambium), hareketli reel, basın, hikaye.
Yumuşak kaydırma ve görsel maskeleme ağırlıklı, sayfa yine de hafif.
**Puan 5.** Tek ağırlık farkıyla çalışan sakin tipografi ve büyük görselle, az elemanla premium hissi veriyor.

**Unseen Studio** — unseen.co, Bristol + London.
Neue Montreal Regular ve Saol Display Light/LightItalic. Zemin `#fff`, metin `#0d0e13`. WordPress üzerinde ama WebGL izi var.
Navigasyon dört kelime: Index, Projects, Contact, World. "Our 2025 Wrapped" için ayrı alt alan adı (2025.unseen.co) açmışlar.
**Puan 5.** Grotesk + kontrastlı serif eşleşmesi ve "World" bölümüyle stüdyo kişiliğini işten ayrı anlatıyor.

**Form&Fun** — formandfun.co, global kreatif teknoloji stüdyosu.
Aeonik ana font; ancak kaynakta `Fkgrotesktrial` de tanımlı — yani FK Grotesk'in deneme sürümü canlı sitede duruyor. Bu, lisans açısından kopyalanmaması gereken bir hata. Webflow + GSAP + Lenis + WebGL.
Sıra: hero → seçilmiş işler (Oreo x Pacman, DoorDash, Powerade Mindzone) → stüdyo → yetenekler → ödüller → logolar.
**Puan 4.** AR/VR işlerini vaka sayfalarında iyi kurguluyor, ama font lisansı ve sayfa ağırlığı zayıf noktası.

**Cuberto** — cuberto.com, Alexandria VA + Prag.
Suisse Intl (Light/Regular/Medium/Bold) ticari font, yanında ücretsiz Manrope. Zemin `#fff`, metin `#000`. Astro + GSAP + Lenis, 72 KB.
Klasik satış hunisi: hero → ne yaparız → 5 hizmet sayfası → müşteri logoları → seçilmiş iş → neden biz → içgörüler → SSS → CTA.
**Puan 4.** Astro ile hafif kalıp yine de zengin hareket veriyor; Mes Dijital'in teknik kurgusuna en yakın örnek.

**Basic/DEPT** — basicagency.com, San Diego + 7 ofis.
Scto Grotesk A tek ailesi (Schick Toikka), tema değişkenli açık/koyu zemin. Next.js + Sanity.
Hero uzun bir tanım cümlesi, ardından ödüller, Google/KFC/Wilson/AT&T/Patagonia işleri, haberler, iç girişimler. Slogan: "Easy to understand, impossible to ignore.™"
**Puan 4.** Ödülleri hero'nun hemen altına koyarak güveni erken kuruyor.

**Hello Monday** — hellomonday.com, Danimarka + New York (DEPT bünyesinde).
NB International Pro Light/Regular ve Clarendon BT Light. Zemin `#fff`, metin `#000`. PixiJS ile 2D efektler.
Hero → iş → stüdyo → haberler. 224 KB.
**Puan 4.** Clarendon gibi beklenmedik bir serif seçerek grotesk denizinde ayrışıyor.

### Influencer Marketing Odaklı

**Viral Nation** — viralnation.com, Toronto + global.
**Sadece ücretsiz font kullanıyor:** Inter (ana) ve JetBrains Mono (vurgu/veri). Açık zemin. Animasyon kütüphanesi yok, 108 KB.
En uzun ana sayfa: hero ("Creators are your most powerful channel. Run them like one.") → logolar → AI ürünü → pazar istatistikleri → ajans/platform/araç karşılaştırma tablosu → 8 adımlı süreç → vakalar → referanslar → ödüller → marka güvenliği.
Hizmetler açıkça listelenmiş: iş zekası, sosyal strateji, influencer marketing, ücretli medya, içerik stüdyosu, topluluk yönetimi, TikTok.
**Puan 4.** Rakip karşılaştırma tablosu ve 8 adımlı süreç şeması, influencer ajansı için en ikna edici anlatım kalıbı.

**Billion Dollar Boy** — billiondollarboy.com, London + New York.
Futura ND Condensed ana font, Webflow + Lenis. Zemin `#fff`, metin `#333`.
Hero: "The social agency with creator Instinct®". Ödül karuseli, vaka karuseli (Lipton, Puma, Candy Crave), logolar, IKEA/Stitch Fix/Desperados işleri, 5 yetenek (Creators, Content, Community, Commerce, Media), tescilli "Creator Instinct®" metodolojisi.
**Puan 4.** Metodolojisine tescilli bir isim vererek fiyat pazarlığını hizmetten metoda kaydırıyor.

**Influencer.com** — influencer.com, London + global.
DM Sans (Google Fonts, ücretsiz), Webflow + GSAP. Zemin `#fff`.
Hero sadece üç kelime: "We humanize brands". Sonra partnerler, üç teklif (Creative, Media, Commerce), kendi Waves platformu, ölçek metrikleri, Spotify/Coca-Cola/ASOS/Monzo vakaları, hatırlanma verileri.
**Puan 4.** Üç kelimelik hero ve arkasından gelen sert veri, küçük ajansın taklit edebileceği en ucuz güven formülü.

**The Goat Agency** — goatagency.com, London + New York.
Font kaynaktan okunamadı; thegoatagency.com yalnızca 114 baytlık bir yönlendirme döndürüyor ve asıl alan adında CSS'e ulaşamadım.
Hero: "Welcome to the human media revolution". 5 yetenek (Media, Discovery, Strategy, Content, Commerce), IBEX adlı veri ürünü, ödüller, pazar haritası. Footer'da siteyi KOTA'nın yaptığı yazıyor.
**Puan 3.** İçerik kurgusu sağlam, tasarım ayrışması zayıf.

---

## Global Ajans Sitelerinde 2025-2026 Ortak Kalıplar

**1. Nötr grotesk tek başına hakim, serif ikinci ses olarak dönüyor.** İncelenen 27 sitenin büyük çoğunluğu Helvetica Now, Suisse Intl, Neue Montreal, Scto Grotesk, Basis, Aeonik, Lausanne, Univers gibi İsviçre kökenli groteskler kullanıyor. Serif artık gövde metni değil, tek bir vurgu cümlesi veya alıntı için giriyor: Instrument Serif, Saol Display, GT Sectra, Adobe Garamond, Rongel.

**2. Mono font yeni standart aksesuar.** Instrument Sans Mono, Basis Mono, GT Pressura Mono, JetBrains Mono, Inconsolata; etiketlerde, tarihlerde, hizmet listelerinde ve sayaçlarda kullanılıyor. Teknik yetkinlik sinyali veriyor ve hiçbir maliyeti yok.

**3. Özel font yaptırmak büyük ajansta zorunluluk haline geldi.** Huge Matter, Season Sans, Drotesk No.5, PP Locomotive New, Obys Sans, R/GA'nın Helvetica varyantı hep özel kesim. Instrument ise tersini yapıp kendi fontunu ücretsiz dağıtarak hem kimlik hem pazarlama kazanmış.

**4. Tek zemin rengi bitti, bölüm bazlı tema geçişi geldi.** AKQA, Instrument, Mother, Locomotive ve Basic'te CSS değişkenleri aynı sayfada birden fazla zemin tanımlıyor. Locomotive tam renkli zeminlere (mavi `#312DFB`, kırmızı `#DA382E`) geçiyor. Koyu zemin artık teknik/geliştirme stüdyolarının işareti (Darkroom, Dogstudio, Active Theory); marka ve reklam ajansları beyazda kalıyor.

**5. Hero üç tipte toplandı.** Ya tam ekran video/showreel (W+K, Huge, Dogstudio), ya tek cümlelik pozisyon beyanı (R/GA, Work & Co, Darkroom, Exo Ape), ya da doğrudan iş gridi (Pentagram, Obys). Slogan üstüne slogan yığan hero kalmadı.

**6. Vaka çalışmaları filtreleniyor, anlatılmıyor.** Pentagram disipline ve sektöre göre, Instrument kategoriye göre filtreliyor. Obys her projenin yanına hizmet etiketleri koyuyor. Ziyaretçi kendi ilgi alanını seçiyor, ajans sıralamayı dayatmıyor.

**7. Hareket dili yumuşak kaydırmaya indi.** WebGL artık sadece teknik iddiası olan stüdyolarda (Darkroom, Active Theory, Form&Fun, Unseen). Geri kalanın ortak paydası Lenis veya benzeri yumuşak kaydırma, GSAP ile giriş animasyonları ve görsel maskeleme. Özel imleç ve yatay kaydırma gözle görülür şekilde azalmış.

**8. Sayfa ağırlığı iki uca ayrıldı.** R/GA 44 KB, Uncommon 20 KB, Locomotive 68 KB, Cuberto 72 KB gibi çok hafif siteler ile Instrument 3,4 MB, Work & Co ve Pentagram 1,1 MB gibi ağır siteler yan yana. Hafif olanlar statik üretim (Astro, Nuxt) kullanıyor; ağır olanlar tüm içeriği HTML'e gömüyor.

**9. Ajanslar kendi yan ürünlerini vitrine koyuyor.** Locomotive'in mağazası ve Locomotive Scroll kütüphanesi, Darkroom'un Lenis ve Satus açık kaynakları, Obys'in tasarım kitapları, BUCK'ın Games ve Goods markaları. Hizmet dışı bir ürün, ajansın canlı olduğunun kanıtı sayılıyor.

---

## Küçük Bir Türk Ajansın Kopyalayabileceği 5 Şey

**1. Ücretsiz ama "pahalı duran" üçlü font sistemi kur.** Instrument Sans + Instrument Serif + Instrument Sans Mono üçlüsü Google Fonts'ta bedava ve tam olarak bu araştırmadaki premium sitelerin tipografik mantığını veriyor. Alternatif: Inter + JetBrains Mono (Viral Nation'ın seçimi) veya DM Sans (Influencer.com). Ticari font lisansına tek kuruş harcamadan aynı seviyede görünmek mümkün. Form&Fun'ın deneme sürümü fontu canlıda bırakması gibi bir hataya asla düşmeyin; deneme lisansları ticari kullanım için geçersiz.

**2. Tek cümlelik pozisyon hero'su yazın, slogan yığmayın.** R/GA, Work & Co, Darkroom ve Exo Ape'in yaptığı gibi tek bir tam cümle: kime, neyi, neden yaptığınız. Influencer.com'un üç kelimesi ("We humanize brands") artı hemen arkasından gelen sert veri, en ucuz güven formülü. Uşak merkezli olmak bir eksik değil, cümlenin içine konum ve uzmanlık girdiğinde ayrıştırıcı.

**3. İş gridine hizmet etiketleri koyun.** Obys her projenin yanında "Identity, Web Design/Dev, 3D" yazıyor. Bu, ayrı bir hizmet sayfası okumadan ne sattığınızı anlatıyor ve vaka sayısı azken bile portfolyoyu dolu gösteriyor. Influencer marketing için etiketler "Kreatör seçimi, İçerik üretimi, Ücretli medya, Raporlama" olabilir.

**4. Süreç şeması ve karşılaştırma tablosu ekleyin.** Viral Nation'ın 8 adımlı yürütme şeması ve "Ajanslar / Platformlar / Ticaret araçları / Biz" karşılaştırma tablosu, influencer ajansı için bu listedeki en ikna edici anlatım kalıbı. Ödül ve büyük müşteri logosu olmadan güven kurmanın en verimli yolu bu. Billion Dollar Boy'un metodolojisine tescilli isim vermesi (Creator Instinct®) de aynı işi görüyor.

**5. Bölüm bazlı zemin geçişi yapın, WebGL'e dokunmayın.** Locomotive ve AKQA'nın yaptığı gibi CSS değişkenleriyle aynı sayfada beyaz, siyah ve tek bir marka renginde zeminler arasında geçin. Sıfır JavaScript maliyeti, yüksek görsel etki. Bir de Lenis benzeri yumuşak kaydırma ekleyin; bu ikisi, pahalı sitelerin hissinin büyük kısmını veriyor.

## Kaçınması Gereken 3 Şey

**1. WebGL ve tam ekran 3D deneyim.** Active Theory'nin 8 KB'lık HTML kabuğu aslında megabaytlarca WebGL yüklüyor; Darkroom ve Form&Fun aynı şekilde. Bunlar teknik iddiası olan stüdyoların kendi vitrini. Statik Astro sitesinde bu yükü taşımak, mobil performansı ve Google sıralamasını doğrudan düşürür. Hareket ihtiyacını CSS geçişleri, `IntersectionObserver` ile giriş animasyonları ve videoyla karşılayın.

**2. İçeriği tamamen JavaScript'e bırakmak.** Droga5'in ham HTML'inde tek bir bağlantı bile yok; Active Theory ve Resn'de de durum aynı. Bu siteler arama motoru ve erişilebilirlik açısından boş sayfa. Küçük bir ajansın organik trafiğe ihtiyacı büyük bir ajanstan fazla; Astro'nun statik HTML üretmesi tam da bu yüzden doğru seçim, bu avantajı JS'e gömerek harcamayın.

**3. Uncommon tarzı aşırı minimalizm ve ticari font yükü.** Uncommon'ın ana sayfasında ne hizmet ne iş var, sadece bir logo ve dört kelime; bu, 20 yıllık ün ve ödülle taşınabilir bir lüks. Tanınmayan bir ajansta aynı boşluk "içerik yok" olarak okunur. Aynı şekilde Suisse Intl, Aeonik, Lausanne, Maisonneue gibi ticari fontlar web lisansında yıllık ücret istiyor; bu bütçe kalemi küçük bir ajans için gereksiz, çünkü ücretsiz alternatifler aynı işi görüyor.
