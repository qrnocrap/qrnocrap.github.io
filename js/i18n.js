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

const availableTranslations = ["es", "ca"];
const userLanguage = navigator.language.split("-")[0];

console.log();
const siteLanguage = availableTranslations.includes(userLanguage)
  ? userLanguage
  : "en";
if (siteLanguage != "en") setLanguage(siteLanguage);
