// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Statik çıktı: `npm run build` → dist/. dist/ içeriği olduğu gibi
// cPanel public_html'e kopyalanır (scripts/deploy.py). Sunucuda Node yok.
export default defineConfig({
  site: "https://mesdijital.com.tr",
  output: "static",
  trailingSlash: "ignore",
  build: {
    // /hizmetler → dist/hizmetler/index.html; LiteSpeed dizin index'ini sunar.
    format: "directory",
  },
  // Her build'de dist/sitemap-index.xml + sitemap-0.xml üretir (404 hariç
  // tüm sayfalar). public/robots.txt bu dosyayı arama motorlarına gösterir.
  integrations: [sitemap()],
});
