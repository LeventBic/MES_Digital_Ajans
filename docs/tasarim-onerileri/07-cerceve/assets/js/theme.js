/* Mes Dijital — gece/gündüz. <head> içinde, CSS'ten önce yüklenir ki sayfa yanlış renkte parlamasın.
   Seçim bu tarayıcıda hatırlanır; seçim yoksa cihazın ayarı izlenir. */
(() => {
  const KEY = "md-theme";
  const root = document.documentElement;
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = (v) => { try { localStorage.setItem(KEY, v); } catch {} };
  const mq = matchMedia("(prefers-color-scheme: dark)");
  const apply = (t) => {
    root.dataset.theme = t;
    document.querySelectorAll("[data-theme-label]").forEach((el) => (el.textContent = t === "dark" ? "Gündüz" : "Gece"));
  };
  apply(read() || (mq.matches ? "dark" : "light"));
  mq.addEventListener("change", (e) => { if (!read()) apply(e.matches ? "dark" : "light"); });
  window.mdTheme = {
    toggle() {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      apply(next);
      write(next);
      setTimeout(() => root.classList.remove("theme-anim"), 700);
    },
    sync() { apply(root.dataset.theme); },
  };
})();
