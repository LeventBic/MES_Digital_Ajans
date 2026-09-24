# Ana sayfa tasarım önerileri — 24 Eylül 2026

`docs/arastirma/03-global-ajans-siteleri.md` içindeki 27 global siteden yalnızca
sıradışı olanlar incelendi ve her biri farklı bir ajans grubundan ilham alan
altı site hazırlandı. Önerilerin renkleri, tipografisi, sayfa yapısı ve
etkileşimleri birbirinden farklı.

Her öneri tek dosyalık, bağımsız bir HTML sayfası. CSS ve JS dosyanın içinde,
dış kaynak olarak yalnızca Google Fonts var (03'te ayrıca Matter.js, cdnjs'ten).
Astro build'ine girmez. Dosyayı tarayıcıda doğrudan açmak yeterli.
`index.html` hepsinin özetini ve ilham alınan ajans listesini gösterir.

| # | Klasör | Fikir | Fontlar | İlham |
|---|---|---|---|---|
| 01 | `01-sinyal/` | Siyah-kırmızı mühendislik stüdyosu; başlıklar genişlik ekseniyle tam genişliğe oturur | Archivo (wdth 62–125), JetBrains Mono | Darkroom, Locomotive, Obys |
| 02 | `02-mecmua/` | Ajans dergisi: künye, başyazı, röportaj, seri ilanlar, test, sözlük, mektup formu | Fraunces, Instrument Sans | Unseen, Hello Monday, Mother |
| 03 | `03-evren/` | Kırmızı oyun alanı: fizik etiketleri, "Markayım / Kreatörüm" anahtarı, eşleştirici | Bricolage Grotesque | Active Theory, Billion Dollar Boy, Mother |
| 04 | `04-mes-os/` | Ajans işletim sistemi: pencereler, terminal, teklif sihirbazı, çöp kutusu | Pixelify Sans, Geist, Geist Mono | Uncommon, Hello Monday, Active Theory |
| 05 | `05-afis/` | İsviçre tipografi afişleri: 12 kolon ızgara (G tuşu), ağırlık merdiveni | Inter Tight (100–900) | Pentagram, Work & Co, R/GA, Obys |
| 06 | `06-sahne/` | Ajans filmi: geri sayım, senaryo, film şeridi, kurgu zaman çizelgesi, jenerik | Bodoni Moda, Courier Prime, DM Mono | Dogstudio, W+K, Exo Ape |

## Notlar

- Vakalar ve rakamlar **yer tutucu** ("Örnek" diye işaretli), gerçek vakalarla
  değiştirilecek. Adres, telefon ve e-posta gerçek.
- Fontların hepsi ücretsiz Google Fonts ailesi ve Türkçe karakterleri destekliyor. Seçilen
  öneri Astro'ya taşınırken marka fontu Eina 04 ile yeniden değerlendirilmeli.
- Hepsi mobil öncelikli (375 px'te yatay kaydırma yok) ve `prefers-reduced-motion`
  ayarına uyuyor.
- Yapım: 01, 04, 05, 06 Claude (Opus 5.5); 02 ve 03 Claude alt-ajanları.
