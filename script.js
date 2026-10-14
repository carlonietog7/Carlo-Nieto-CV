(() => {
  const html = document.documentElement;
  const texts = document.querySelectorAll("[data-en]");
  const alts = document.querySelectorAll("[data-en-alt]");
  const buttons = document.querySelectorAll("[data-lang]");

  // Guardamos el texto original en español para poder regresar a él.
  texts.forEach((el) => { el.dataset.es = el.textContent.trim(); });
  alts.forEach((el) => { el.dataset.esAlt = el.alt; });

  function setLang(lang) {
    texts.forEach((el) => {
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.es;
    });
    alts.forEach((el) => {
      el.alt = lang === "en" ? el.dataset.enAlt : el.dataset.esAlt;
    });
    html.lang = lang;
    document.title = lang === "en" ? "Carlo Nieto | Resume" : "Carlo Nieto | CV";
    buttons.forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    try { localStorage.setItem("cv-lang", lang); } catch (e) { /* sin almacenamiento */ }
  }

  buttons.forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  document.getElementById("print").addEventListener("click", () => window.print());

  // Si ya había elegido inglés antes, lo recordamos.
  let saved = "es";
  try { saved = localStorage.getItem("cv-lang") || "es"; } catch (e) { /* ignorar */ }
  if (saved === "en") setLang("en");
})();