async function setLanguage(lang) {
  const res = await fetch(`/resources/i18n/${lang}.json`);
  const strings = await res.json();
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const html = strings[key];
    if (html) {
      if (key.endsWith(".placeholder")) {
        element.placeholder = html;
      } else {
        element.innerHTML = html;
      }
    }
  });
}

const browserLang = navigator.language.startsWith("es") ? "es" : "en";
if (browserLang != "en") setLanguage(browserLang);
