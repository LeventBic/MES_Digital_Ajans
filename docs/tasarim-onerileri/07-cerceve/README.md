# Mes Dijital — 07 Çerçeve

Statik, çok sayfalı site iskeleti. Derleme adımı yok; dosyaları bir sunucuda
açmak yeterli (yerelde: `py -m http.server 5173 --directory mes-dijital`).

## Sayfalar

| Dosya | Ne gösterir |
|---|---|
| `index.html` | Açılış animasyonu + kategori seçici (Dikey / Yatay / Izgara görünüm) |
| `kategori.html?k=<slug>` | Kategori sayfası: giriş, hizmetler, çalışmalar ve ekran görüntüleri |
| `proje.html?k=<slug>&p=<slug>` | Çalışma sayfası: künye, özet, ekran görüntüleri, sonraki çalışma |
| `ajans.html` | Ajans: tanıtım, görsel şeridi, hizmetler, sektörler, ödüller, ekip, katalog, iletişim |

## İçerik nasıl doldurulur

Bütün kategoriler ve çalışmalar **`assets/js/data.js`** dosyasından gelir.
Ana sayfa, kategori sayfaları ve proje sayfaları bu dosyadan otomatik çizilir.

- Kategori eklemek, silmek ya da sıralamak için `categories` dizisini düzenle.
- Görsel eklemek için görseli `assets/img/` altına koy ve yolunu yaz:
  - ana sayfa kartı: kategoride `cover: "assets/img/web/kapak.jpg"`
  - çalışma kapağı: çalışmada `cover`
  - ekran görüntüleri: `shots: [{ src: "assets/img/web/1.jpg", ratio: "16x9", caption: "Ana sayfa" }, ...]`
- `ratio` değerleri: `16x9`, `21x9` (tam genişlik), `4x5` (ikili), `3x4` (üçlü), `1x1`.
- Şu an `ph(...)` yardımcı fonksiyonu her kategoriye 4 yer tutucu çalışma üretiyor.
  Gerçek çalışmalar gelince `works: [...]` dizisini elle yaz.

Ajans sayfasındaki metinler (tanıtım, sektörler, ödüller, ekip) doğrudan
`ajans.html` içinde `[ ... ]` işaretli yer tutuculardır.

## Özellikler

- **Açılış**: ince çizgili, ikiye bölünmüş M kendini çizer, dolar; yarılar
  aralanır ve arada kategori kareleri akar; sonra yarılar seçili kartın iki
  yanına geçip çerçeve olur. Oturumda bir kez oynar, `?loader` ile zorlanır.
- **Seçici**: tekerlek, sürükleme, ok tuşları; soldaki liste ve kart sütunu
  sonsuz döngü. Yatay görünümde çerçeve 90° döner.
- **Gece / Gündüz**: üst menüdeki anahtar; seçim tarayıcıda hatırlanır,
  seçim yoksa cihaz ayarı izlenir.
- Sayfa geçiş perdesi, özel imleç, kelime kelime açılan başlıklar, perde gibi
  açılan görseller, parallax, Lenis ile yumuşak kaydırma.
- `prefers-reduced-motion` açıksa animasyonlar kapanır.

## Dosyalar

```
assets/css/style.css   ortak stil + gece modu değişkenleri + iç sayfalar
assets/css/home.css    ana sayfa (açılış, seçici, görünümler)
assets/js/theme.js     gece/gündüz (head içinde, CSS'ten önce)
assets/js/data.js      İÇERİK
assets/js/pages.js     kategori / proje / ajans sayfalarını veriden çizer
assets/js/main.js      ortak etkileşimler (geçiş, imleç, açılma efektleri…)
assets/js/home.js      ana sayfa açılışı ve seçici
```

Obys'in açılış ve seçim akışından ilham alındı; kod, logo, metin ve
görseller sıfırdan yazıldı, Obys'ten dosya alınmadı.
