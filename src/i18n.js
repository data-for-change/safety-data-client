import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEng from './lng/en/translation.json';
import translationHeb from './lng/he/translation.json';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    fallbackLng: 'he',
    lng: 'he',
    debug: true,
    // hardcoding translations for the sake of simplicity,
    // id more complex - get it from backend.
    // i18next has a small plugin that makes it easy.
    // learn more: https://github.com/i18next/i18next-xhr-backend
    resources: {
      en: {
        translation: translationEng,
      },
      he: {
        translation: translationHeb,
      },
    },
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });
export default i18n;
