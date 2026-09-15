# devarp-web

DEVARP Mekatronik kurumsal sitesi. Astro 6, statik çıktı, Cloudflare Pages.
Sanity CMS blog ve projeler için. Site `devarp.dev/website/` altında yayınlanıyor
(`astro.config.mjs` içindeki `base: '/website'`).

Dosya düzeni: `README.md` insan için giriş noktasıdır (kurulum, dizin yapısı, ortam
değişkenleri, yayın reçetesi), `DEVIR.md` depodan okunamayan açık maddelerin listesidir (**oturuma başlarken §7 "kaldığımız yer"i oku**),
bu dosya ise AI ajanları için kuralları taşır.

## Dal (branch) disiplini — önce bunu oku

**Geliştirme `develop` dalında yapılır.** `main` yayın dalıdır: oraya push
Cloudflare Pages deploy'unu tetikler, yani canlıya çıkar. Yeni bir işe
başlarken `develop`te olduğundan emin ol; değilsen `git checkout develop`.
`main`'e yalnızca `develop` üzerinden, iş doğrulandıktan sonra geçilir.

CI (`.github/workflows/ci.yml`) hem `main` hem `develop` push'unda koşar,
yani develop'ta da tip/derleme/test kapısı geçerli.

Bu depoda **iki uzak** var ve ikisi bağımsız ilerliyor:

| Uzak         | Depo                     | Not                                                       |
| ------------ | ------------------------ | --------------------------------------------------------- |
| `origin`     | LeventBic/Devarp_WebSite | günlük çalışma buraya push'lanıyor; **deploy TETİKLEMEZ** |
| `devarp-web` | yecolakoglu/devarp-web   | **deploy buradan** — Cloudflare Pages bu depoyu izliyor   |

**Yayın zinciri** (9 Eylül 2026'da Cloudflare API'sinden doğrulandı):

```
devarp.dev/website/*  →  Worker "devarp-website-proxy"
                      →  Pages projesi "devarp-web"
                      →  kaynak: yecolakoglu/devarp-web @ main
```

Pages projesinin domainleri: `devarp-web.pages.dev`, `devarp.com`, `www.devarp.com`.
`devarp.dev` ayrı bir zone; `/website*` yolu Worker route'uyla bu projeye
bağlanıyor.

Bu tablo eskiden tersini söylüyordu ("deploy origin'den") ve 9 Eylül 2026'da
buna güvenilerek `origin/main`'e push edildi: CI yeşil geçti, hiçbir deploy
tetiklenmedi, `dbbe9ca`'dan sonraki 24 commit deploy etmeyen depoda birikti.
**Canlıya çıkarmak için `git push devarp-web develop:main` gerekiyor**; yalnızca
`origin`'e push etmek yayın değildir.

8 Eylül 2026'da şu oldu: bir oturum boyunca `ci/pipeline-and-typecheck` dalında
çalışıldı. O dal `origin/main`'den 8 commit gerideydi ve nav'daki beş sayfa
(`cozumler`, `teknolojiler`, `sektorler`, `kurumsal`, `muhendislik`) çalışma
kopyasında hiç yoktu. Aynı hero düzeltmesi iki depoda iki kez yapıldı. Sorun
oturumun sonunda, kullanıcı "sayfalar nerede" diye sorunca fark edildi.

Bunun tekrarlanmaması için:

1. **İşe başlamadan önce dalı söyle.** Oturum başındaki kanca
   (`.claude/hooks/branch-guard.sh`) dalı ve uzaklara göre ileride/geride
   durumunu bağlama enjekte eder. "Geride" yazan bir satır varsa, işe
   başlamadan önce o commitlerin bu görevi etkileyip etkilemediğine bak.
2. **Yan dalda "bitti" deme.** Ana dala girmemiş iş bitmiş iş değildir. Bir
   görevi tamamladığında hangi dalda olduğunu ve ana dala nasıl gideceğini
   birlikte söyle.
3. **Dosya bulamıyorsan önce dala bak.** Bir sayfa/bileşen beklendiği yerde
   yoksa, silinmiş olduğunu varsaymadan önce `git log --all --oneline -- <yol>`
   ve `git branch -a --contains <commit>` ile başka dalda olup olmadığını
   kontrol et. Bu vakada tam olarak bu adım atlanmıştı.
4. **Kayıp iş iddiasını doğrula.** "Şu değişiklik gitmiş" denince suçu üstlenme
   ya da reddetme — `git log -L`, `git rev-list --all` ve reflog ile o satırın
   gerçek geçmişini çıkar. Bu vakada "yuvarlak buton kayboldu" denen değişiklik
   aslında üç ay önce kasıtlı bir commit'le kaldırılmıştı.

## Model'e göre çalışma modu — Fable = orkestrasyon, kod yazmaz

Hangi modelde çalıştığını sistem istemi söylüyor (`claude-fable-*`,
`claude-opus-*`, …). **Fable 5.1 seçiliyken bu oturum KESİNLİKLE KOD YAZMAZ;
orkestrasyon yapar.** Politikanın tamamı
`.claude/skills/fable-orchestration/SKILL.md`'de (kaynak: avenoxai/avenoxskills,
MIT) — her delegasyondan önce `Skill` aracıyla yükle. Bu depoya uyarlanmış
özeti:

- **Fable'ın işi:** mimari, spec/brief yazmak, karar vermek, entegrasyon ve
  çakışma çözümü, sentez, alt-ajan çıktısını doğrulamak, kullanıcıyla
  konuşmak. Okuma/arama/ölçüm (Read, Grep, salt-okur Bash, curl, Cloudflare
  API sorgusu), git (commit/push/merge), `npm run ci` koşmak, CLAUDE.md /
  hafıza / devir notu yazmak Fable'da kalır — bunlar kod değil.
- **Fable'ın yapmadığı:** `src/`, `functions/`, `workers/`, `tests/`,
  `astro.config.mjs`, `wrangler.toml`, `package.json`, `.github/` ve stil
  dosyalarına dokunmak. Tek satırlık düzeltme de olsa delege edilir. "Küçük
  iş, ben yapayım" istisnası yok — istisnayı yalnızca kullanıcı verir.
  Skill'deki "limitler sağlıklıyken ana döngü işi kendisi yapsın" maddesi bu
  depoda kullanıcı kararıyla geçersiz.
- **Kime delege edilir (zorluk eksenine göre):**
  - Bağlam toplama, keşif, inceleme, doğrulama, iyi tanımlı basit uygulama
    (var olan bir kalıbın kopyası, şablon UI işi) → `Agent` aracı, **her
    çağrıda açıkça `model: "opus"`**. Model parametresi boş bırakılmaz: parent
    Fable olduğu için miras Fable'ı çoğaltır.
  - Zor / hassas / geniş uygulama (güvenlik, doğruluk-kritik yollar, büyük
    yüzeyler, refactor/migrasyon) → Codex lane: `codex exec`, `codex-fleet`
    skill'i (`.claude/skills/codex-fleet/`; makinede codex-cli 0.153.2 var).
    Codex improvize etmez, spec'i harfiyen uygular — brief'in kalitesi
    çıktının tavanıdır. Spec'i Fable yazar, Codex'e verir.
  - Fable alt-ajan olarak spawn edilmez.
- **Her delegasyon brief'i şunları taşır:** dal (`develop`), dokunulacak ve
  dokunulmayacak dosyalar, dondurulmuş şeyler (çerez metni/ölçüsü, logo
  rengi vb. — bkz. hafıza), doğrulama şartı (`npm run ci` altı adım; CSS
  değişikliğinde `npm run dev` ile göz kontrolü), commit kuralı (Türkçe
  mesaj + Co-Authored-By satırı), **push ve deploy YOK** — onları Fable,
  kullanıcı isteyince yapar.
- **Alt-ajan raporu kanıt değildir.** Diff'i oku, `npm run ci`'ı kendin koş,
  görsel iş için ekran görüntüsünü kendin al, canlıda `content-type` ile
  doğrula. 9 Eylül 2026'da bir alt-ajanın rapor ettiği ölçü kendi formülüyle
  tutmuyordu; 10 Eylül'de deploy monitörü eski CSS hash'ini bekleyip yanlış
  alarm verdi. İkisi de raporu değil ölçümü okuyunca anlaşıldı.
- Opus / Sonnet seçiliyken bu bölüm uygulanmaz; normal çalış.

## Tasarım sistemi

Tek kaynak: **`devarp-sheet/`** (`DEVARP-SHEET.md` + `devarp-sheet.css`).
MES ve sonraki uygulamalar bu dosyayı kopyalayarak aynı tipografiyi ve rengi
kullanır. `src/styles/global.css` içindeki `:root` bloğu bu sheet ile hizalı.

Renkte **dört ayrı kırmızı** var, hiçbiri diğerinin yerine geçmez:

- `--accent` `#e51b26` — kimlik ve **dolgu**. Logo SVG'si bu değeri içerir, sabittir.
- `--accent-ui` `#fc3344` — etkileşim **dolgusu** (arama butonu).
- `--accent-text` `#c4141d` — açık zeminde kırmızı **metin**. Marka kırmızısı
  metin olarak WCAG 4.5:1'i geçmiyor (beyazda 4.65, `--surface` üstünde 4.27).
- `--accent-text-dark` `#ff6b76` — koyu zeminde kırmızı metin.

**Kural: `#fc3344`'ü metin rengi olarak kullanma.** Ölçüldü: footer zemininde
3.57:1, pembe tint üstünde 2.91:1 — ikisi de eşiğin altında.

Zeminde de ayrım var: `--bg` (#fcfbfb) sayfa, `--bg-raised` (#ffffff) kart/panel.
İkisini karıştırmak kartların sayfadan ayrışmasını bozar.

`.h1`/`.h2`/`.h3` **görsel** ölçektir, semantik seviyeden bağımsızdır ve
ağırlık/satır yüksekliğini kendileri tanımlar — `<div class="h1">` de doğru
görünmek zorunda (hero slaytları böyle render ediliyor).

## Kalite kapısı

`npm run ci` = **lint + format:check + typecheck + build + test +
functions:check**, yani CI'ın (`.github/workflows/ci.yml`) koştuğunun aynısı ve
aynı sırada. Yeşil olmadan iş bitmiş sayılmaz.

`typecheck` **iki proje** koşar: `astro check` (`src/`, `.astro` + `.ts`) ve
`tsc -p tsconfig.functions.json` (`functions/`, `workers/`, `scripts/`,
`tests/`). Kök tsconfig'e `checkJs` bilerek konmadı — `astro check` onu `.astro`
inline script'lerine de uyguluyor ve `define:vars` ile enjekte edilen
değişkenler (`ConsentBootstrap`) çözümlenemiyor; gerekçe `tsconfig.json`
yorumunda.

Testler dört dosyada: `tests/build.test.mjs` (derlenmiş HTML — 13 rota, tek
`<h1>`, meta description, base öneki, sızmış `undefined` yok),
`seo.test.mjs` (sitemap, canonical, `og:url`, robots), `bot-protection.test.mjs`
(saf mantık + kaynak regresyonları), `functions.integration.test.mjs`.
Sonuncusu varsayılan olarak **atlanır** — gerçek bir `wrangler pages dev` örneği
ister: `RUN_FUNCTIONS_IT=1 npm test` (14 senaryo).

Script eskiden yalnızca build + test kapsıyordu; typecheck'i ayrıca koşmak
gerekiyordu ve "yerelde ci yeşil" CI'ın geçeceği anlamına gelmiyordu. Bu
ayrım kaldırıldı — CI'a adım eklenirse buraya da eklenmeli.

Görsel regresyonu yakalayan test **yok** — CSS değişikliklerinde `npm run dev`
ile göz kontrolü zorunlu. CSP değişikliğinde `npm run csp:check` (tarayıcı, elle;
Chrome ve ayakta bir sunucu ister, bu yüzden CI'da değil).

## Dikkat edilecek yerler

- **`base: '/website'`** — `global.css`'e dosya yolu içeren `url()` yazma; dev
  sunucusunda kırılır. `@font-face`'lerin `FontFaces.astro`'da olma sebebi bu.
- **Astro scoped stil özgüllüğü** — sayfa içi `.x` kuralı `.x[data-astro-cid-…]`
  olarak derlenir (0,2,0) ve `global.css`'teki `.x`'i (0,1,0) ezer. Bir kuralı
  global'e taşırken sayfadakini silmeyi unutma, yoksa taşıma sessizce çalışmaz.
- **`:global()`** Astro'ya özel sözdizimidir; `global.css`'e taşınırsa geçersiz
  selector olur ve kural tamamen düşer.
- **`maintenance.astro`** `global.css` import etmez, token değişiklikleri
  oraya ulaşmaz.
- **`pages_build_output_dir` `dist` olmalı, `dist/website` değil.** Astro
  `base: '/website'` + `outDir: './dist/website'` kullanıyor: HTML varlıkları
  `/website/...` diye istiyor, dosyalar `dist/website/...` içinde. Servis kökü
  `dist` olunca ikisi örtüşür. Kök bir dizin derine (`dist/website`) kayarsa
  ana sayfa yine 200 döner — Pages 404'ü `index.html`'e düşürür — ama HTML'in
  istediği HER varlık (`_astro/*.css`, fontlar, logolar) o HTML'i geri alır ve
  site stilsiz kalır. 9 Eylül 2026'da canlıda tam olarak bu oldu (`c1e25dca`):
  deploy "success" göründü, testler geçti, çünkü hiçbir kontrol varlıkların
  `content-type`'ına bakmıyor. Ayırt etmenin yolu içerik değil tip:
  `curl -sI <site>/website/_astro/<dosya>.css | grep content-type` → `text/css`
  olmalı; `text/html` görüyorsan kök yanlış. Depodaki `wrangler.toml` dashboard
  ayarını ezer; dashboard'da hâlâ `dist/website` yazıyor.
- **`.astro` dosyaları prettier dışında.** `prettier-plugin-astro` inline
  öğelerin içine boşluk ekliyor (`<a>`, bitişik `<span>`) ve
  `htmlWhitespaceSensitivity`'yi uygulamıyor; görsel regresyon testi olmadığı
  için `.astro` işaretlemesi elle biçimlendirilir (gerekçe `.prettierignore`'da).
  `is:inline` script'ler ES5 — `trailingComma: es5` bu yüzden.
- **Bot kontrolü proxy trafiğinde de çalışır.** `x-preview-token` yalnızca bakım
  bypass'ı + `x-real-client-ip` güveni verir; `!trustedProxy` koşuluna bot
  kontrolü bağlanmaz — `tests/build.test.mjs` bunu regex ile kilitliyor.
  9 Eylül'e kadar tam bu yüzden katman üretimde hiç çalışmadı.
- **`public/_headers` bu depoda çalışmaz.** Astro `public/`'i `dist/website/`'a
  kopyalar, Pages `_headers`'ı `dist/` kökünde arar; ayrıca `_headers` Functions
  yanıtlarına uygulanmaz ve `_middleware.js` her isteği yakalar. Güvenlik
  başlıkları tek kaynaktan: `functions/_lib/security-headers.js`. HSTS bilerek
  yok — host geneline uygulanır, zone panelinden açılır.
- **Pages Functions eski wrangler ile paketleniyor.** Cloudflare, `functions/`
  altını **wrangler 3.114.17**'nin esbuild'iyle bundle ediyor; depodaki wrangler
  ise 4.x. Yani yerelde derlenen bir sözdizimi deploy'da düşebilir. 9 Eylül
  2026'da `crawler-verify.js`'teki import attribute'u (`with { type: "json" }`)
  tam bunu yaptı: Astro derlemesi geçti, "Failed building Pages Functions" ile
  deploy hiç yayına çıkmadı. `npm run functions:check` bu sürümle koşuyor,
  sabiti değiştirirken package.json ve ci.yml'ı birlikte güncelle.
  Not: özniteliği silmek de çözüm değil — Node ESM JSON import'unda onu ZORUNLU
  kılıyor (`ERR_IMPORT_ATTRIBUTE_MISSING`) ve testler düşüyor. İkisini birden
  memnun etmek için veri JSON değil **JS modülü** olarak tutuluyor
  (`functions/_lib/crawler-ranges.js`).
- **Edge önbelleği deploy'u geciktiriyor.** `devarp-web.pages.dev` üzerinden
  gelen cevaplar `cache-control: public, s-maxage=604800` taşıyor (7 gün) —
  başarılı bir deploy'dan sonra bile canlı eski kalabiliyor. Bu başlık depoda
  hiçbir yerden gelmiyor (`functions/` ve `workers/` altında tek bir
  Cache-Control yok), Cloudflare tarafındaki bir kural. Deploy sonrası siteyi
  kontrol ederken önce panelden purge et, ya da önbellekten etkilenmeyen
  `https://<deployment-id>.devarp-web.pages.dev/website/` adresine bak.
