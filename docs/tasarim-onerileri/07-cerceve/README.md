# Mes Dijital — 07 Çerçeve

Statik, çok sayfalı site iskeleti. Derleme adımı yok; dosyaları bir statik
sunucuda açmak yeterli. Depo kökünden:

```bash
python -m http.server 5173 --directory docs/tasarim-onerileri/07-cerceve
# → http://localhost:5173   (açılışı yeniden izlemek için: /?loader)
```

Python yoksa herhangi bir statik sunucu olur (ör. VS Code Live Server).

## Sayfalar

| Dosya | Ne gösterir |
|---|---|
| `index.html` | Açılış animasyonu + kategori seçici (Dikey / Yatay / Izgara görünüm) |
| `kategori.html?k=<slug>` | Kategori sayfası: giriş, hizmetler, çalışmalar ve ekran görüntüleri |
| `proje.html?k=<slug>&p=<slug>` | Çalışma sayfası: künye, özet, ekran görüntüleri, sonraki çalışma |
| `ajans.html` | Ajans: tanıtım, görsel şeridi, hizmetler, sektörler, ödüller, sosyal, ekip, katalog, iletişim |

Bilinmeyen kategori adresi ana sayfaya, bilinmeyen çalışma adresi kendi
kategorisine yönlenir (sessizce ilk kaydı göstermez).

## İçerik nasıl doldurulur

Bütün kategoriler ve çalışmalar **`assets/js/data.js`** dosyasından gelir.
Ana sayfa, kategori sayfaları ve proje sayfaları bu dosyadan otomatik çizilir.

- Sosyal medya hesaplarını `agency.social` altına yaz (ör. `Instagram: "https://instagram.com/..."`).
  Adresi boş kalan hesap sitede tıklanamaz soluk metin olarak görünür; boş `#` bağlantı üretilmez.
  Ajans sayfasındaki "Sosyal" listesi ve iç sayfaların alt bilgisi buradan dolar.
- İletişim bilgileri (`email`, `phone`, `whatsapp`, `address`) `agency` altında durur.
  **Not:** alt bilgi ve ana sayfadaki iletişim satırları şimdilik HTML'e de elle
  yazılı; bir bilgi değişirse dört HTML dosyasında da güncellenmeli.
- Kategori eklemek, silmek ya da sıralamak için `categories` dizisini düzenle.
- Görsel eklemek için görseli `assets/img/` altına koy ve yolunu yaz:
  - ana sayfa kartı: kategoride `cover: "assets/img/web/kapak.jpg"`
  - çalışma kapağı: çalışmada `cover`
  - ekran görüntüleri: `shots: [{ src: "assets/img/web/1.jpg", ratio: "16x9", caption: "Ana sayfa" }, ...]`
- `ratio` değerleri: `16x9`, `21x9` (tam genişlik), `4x5` ve `1x1` (ikili), `3x4` (üçlü).
- Proje sayfasında kapak: `cover` varsa o, yoksa ilk yatay (`16x9`/`21x9`) ekran
  görüntüsü kullanılır; kapak olan görüntü aşağıda tekrar edilmez, diğerlerinin
  hiçbiri düşmez.
- Şu an `ph(...)` yardımcı fonksiyonu her kategoriye 4 yer tutucu çalışma üretiyor.
  Gerçek çalışmalar gelince `works: [...]` dizisini elle yaz.

Ajans sayfasındaki metinler (tanıtım, sektörler, ödüller, ekip) doğrudan
`ajans.html` içinde `[ ... ]` işaretli yer tutuculardır.

## Özellikler

- **Açılış**: ince çizgili, ikiye bölünmüş M kendini çizer, dolar; yarılar
  aralanır ve arada kategori kareleri akar; sonra yarılar seçili kartın iki
  yanına geçip çerçeve olur. Oturumda bir kez oynar, `?loader` ile zorlanır.
- **Seçici**: tekerlek, sürükleme, ok tuşları, Tab; soldaki liste ve kart sütunu
  sonsuz döngü. Ortadaki karta tıklamak kategoriyi açar, yandaki karta tıklamak
  önce onu ortalar. Yatay görünümde çerçeve 90° döner.
- **Gece / Gündüz**: üst menüdeki anahtar; seçim tarayıcıda hatırlanır,
  seçim yoksa cihaz ayarı izlenir. Açılış animasyonu iki temada da görünür.
- **İletişim**: e-posta, telefon, WhatsApp ve "Haritada aç" linki; mobil menüde de WhatsApp.
- Sayfa geçiş perdesi, özel imleç, kelime kelime açılan başlıklar, perde gibi
  açılan görseller, parallax, Lenis ile yumuşak kaydırma, fareyle sürüklenen görsel şeridi.
- `prefers-reduced-motion` açıksa animasyonlar kapanır.

## SEO ve erişilebilirlik

- Her sayfada `description`, Open Graph ve `theme-color`; kategori ve proje
  sayfalarında başlık ve açıklama veriden üretilir.
- Ana sayfada `ProfessionalService` JSON-LD (ad, adres, telefon, e-posta).
- Her sayfada tek `h1` (ana sayfada ekran okuyucuya özel), "İçeriğe geç" linki,
  klavye odak çerçevesi, mobil menü Esc ile kapanır.
- Kırmızı metin açık zeminde `#c4141d`, koyu zeminde `#ff4a52` (WCAG AA);
  marka kırmızısı `#e51b26` yalnızca dolgu/süs için. Favicon kırmızı M.

## Dosyalar

```
assets/css/style.css   ortak stil + gece modu değişkenleri + iç sayfalar
assets/css/home.css    ana sayfa (açılış, seçici, görünümler)
assets/js/theme.js     gece/gündüz (head içinde, CSS'ten önce)
assets/js/data.js      İÇERİK (kategoriler, çalışmalar, iletişim, sosyal)
assets/js/pages.js     kategori / proje / ajans sayfalarını veriden çizer
assets/js/main.js      ortak etkileşimler (geçiş, imleç, açılma efektleri, sosyal, menü…)
assets/js/home.js      ana sayfa açılışı ve seçici
assets/img/logo.svg    favicon (kırmızı M)
```

CSS ve JS dosyaları HTML'de `?v=13` sorgusuyla bağlanır (tarayıcı önbelleğini
kırmak için); CSS/JS değişince dört HTML dosyasındaki sürüm numarası birlikte artırılmalı.

## Astro'ya taşırken dikkat

- **Font**: öneri Inter Tight kullanıyor; marka fontu Eina 04 (`public/assets/fonts/`).
- **Tekrar eden parçalar**: header, mobil menü ve alt bilgi dört HTML'de kopya;
  Astro'da tek bileşen olmalı ve iletişim bilgisi tek kaynaktan gelmeli.
- **Görsel açılma efekti**: `.media` başta `clip-path: inset(100% 0 0 0)` ile
  tamamen kırpılı. Chrome böyle bir öğeyi IntersectionObserver'da hiç "görünür"
  saymaz; bu yüzden görselin kendisi değil **kapsayıcısı** izlenir (`main.js`).
- **Seçicide tıklama**: `setPointerCapture` basılır basılmaz çağrılırsa tıklama
  karta değil `.reel`'e düşer ve kart açılmaz; yakalama yalnızca 6 px'lik
  gerçek sürüklemeden sonra başlar (`home.js`).
- **Açılış renkleri**: siyah zemin üstündeki M ve sayaç temadan bağımsız sabit
  `#f3f1ec`; `var(--paper)` kullanılırsa gece modunda kaybolur.
- **Lenis** jsDelivr'den yükleniyor; Astro'da paket olarak eklenmeli.

Obys'in açılış ve seçim akışından ilham alındı; kod, logo, metin ve
görseller sıfırdan yazıldı, Obys'ten dosya alınmadı. Obys sitesinin SEO
incelemesi: `docs/arastirma/04-obys-seo-ve-gorunurluk.md`.
