# Ana sayfa tasarım önerileri — 24–26 Eylül 2026

`docs/arastirma/03-global-ajans-siteleri.md` içindeki 27 global siteden yalnızca
sıradışı olanlar incelendi ve her biri farklı bir ajans grubundan ilham alan
altı site hazırlandı (01–06, 24 Eylül). 07 Çerçeve, Obys'in açılış ve seçim
akışından ilham alan çok sayfalı yedinci öneri (25–26 Eylül). Önerilerin
renkleri, tipografisi, sayfa yapısı ve etkileşimleri birbirinden farklı.

01–06 tek dosyalık, bağımsız birer HTML sayfası. CSS ve JS dosyanın içinde,
dış kaynak olarak yalnızca Google Fonts var (03'te ayrıca Matter.js, cdnjs'ten).
Dosyayı tarayıcıda doğrudan açmak yeterli. 07 ise ayrı CSS/JS dosyalarından ve
dört sayfadan oluşur; bir statik sunucuyla açılır (aşağıda). Hiçbiri Astro
build'ine girmez. `index.html` hepsinin özetini ve ilham alınan ajans listesini gösterir.

```bash
# depo kökünden, 07 için
python -m http.server 5173 --directory docs/tasarim-onerileri/07-cerceve
# → http://localhost:5173
```

| # | Klasör | Fikir | Fontlar | İlham |
|---|---|---|---|---|
| 01 | `01-sinyal/` | Siyah-kırmızı mühendislik stüdyosu; başlıklar genişlik ekseniyle tam genişliğe oturur | Archivo (wdth 62–125), JetBrains Mono | Darkroom, Locomotive, Obys |
| 02 | `02-mecmua/` | Ajans dergisi: künye, başyazı, röportaj, seri ilanlar, test, sözlük, mektup formu | Fraunces, Instrument Sans | Unseen, Hello Monday, Mother |
| 03 | `03-evren/` | Kırmızı oyun alanı: fizik etiketleri, "Markayım / Kreatörüm" anahtarı, eşleştirici | Bricolage Grotesque | Active Theory, Billion Dollar Boy, Mother |
| 04 | `04-mes-os/` | Ajans işletim sistemi: pencereler, terminal, teklif sihirbazı, çöp kutusu | Pixelify Sans, Geist, Geist Mono | Uncommon, Hello Monday, Active Theory |
| 05 | `05-afis/` | İsviçre tipografi afişleri: 12 kolon ızgara (G tuşu), ağırlık merdiveni | Inter Tight (100–900) | Pentagram, Work & Co, R/GA, Obys |
| 06 | `06-sahne/` | Ajans filmi: geri sayım, senaryo, film şeridi, kurgu zaman çizelgesi, jenerik | Bodoni Moda, Courier Prime, DM Mono | Dogstudio, W+K, Exo Ape |
| 07 | `07-cerceve/` | Açılışta ikiye bölünmüş M çizilir, arada kareler akar; yarılar ayrılıp kategori sütununu çerçeveler. Dikey/Yatay/Izgara görünüm, veri dosyasından çizilen kategori ve çalışma sayfaları, gece/gündüz | Inter Tight, JetBrains Mono | Obys |

## Notlar

- Vakalar ve rakamlar **yer tutucu** ("Örnek" diye işaretli), gerçek vakalarla
  değiştirilecek. Adres, telefon, e-posta ve WhatsApp (`wa.me/905394974327`) gerçek.
- Fontların hepsi ücretsiz Google Fonts ailesi ve Türkçe karakterleri destekliyor. Seçilen
  öneri Astro'ya taşınırken marka fontu Eina 04 ile yeniden değerlendirilmeli.
- Hepsi mobil öncelikli (375 px'te yatay kaydırma yok) ve `prefers-reduced-motion`
  ayarına uyuyor.
- Yapım: 01, 04, 05, 06 Claude (Opus 5.5); 02 ve 03 Claude alt-ajanları.

### 07 Çerçeve (25 Eylül 2026)

Çok sayfalı iskelet; ayrıntılar `07-cerceve/README.md` içinde. Bütün kategori
ve çalışmalar `07-cerceve/assets/js/data.js` dosyasından gelir: ana sayfa
seçicisi, `kategori.html?k=…` ve `proje.html?k=…&p=…` sayfaları bu dosyadan
çizilir. Ajans sayfası (`ajans.html`) tanıtım, görsel şeridi, hizmetler,
sektörler, ödüller, ekip ve katalog bölümlerinden oluşur. Gece/gündüz anahtarı
var. Yumuşak kaydırma için Lenis jsDelivr'den yüklenir. İçerik yer tutucudur.
Obys'in açılış ve seçim akışından ilham alındı; kod, logo, metin ve görseller
sıfırdan yazıldı. Yapım: Claude (Opus 5.5).

**26 Eylül 2026 düzeltmeleri** (`fdf47c1`), gerçek Chrome'da 11 otomatik testle doğrulandı:

- Ana sayfada karta tıklamak kategoriyi açmıyordu → düzeldi.
- Kategori, proje ve ajans sayfalarındaki görsellerin hiçbiri açılmıyordu → düzeldi.
- Gece modunda açılıştaki M ve sayaç görünmüyordu; mobilde ana sayfa menüsü
  kapatılamıyordu; boş `#` sosyal linkler JS hatası veriyordu → düzeldi.
- Eklenenler: WhatsApp ve harita linkleri, `data.js`'ten sosyal medya, paylaşım
  önizlemesi (Open Graph), LocalBusiness JSON-LD, `h1` ve "içeriğe geç" linki,
  klavye odağı, WCAG uyumlu kırmızı metin (`#c4141d`), kırmızı favicon.
- Ana sayfa üst bandındaki Uşak saati kaldırıldı (ajans sayfası ve alt bilgideki
  "Yerel saat" duruyor).
