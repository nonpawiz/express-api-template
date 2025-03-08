import i18next from "i18next";
import middleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import path from "path";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en", // Default language
    preload: ["en", "th"], // Load supported languages
    backend: {
      loadPath: path.join(__dirname, "locales/{{lng}}.json"), // Load translations from JSON files
    },
    detection: {
      order: ["header"], // Detect language from the request header
    },
  });

export default i18next;
