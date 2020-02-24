import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    fallbackLng: 'he',
    debug: true,
    // I'm hardcoding the translations here for the sake of simplicity,
    // but in a real-world application you would get these from a backend.
    // i18next has a small plugin that makes it easy.
    // learn more: https://github.com/i18next/i18next-xhr-backend
    resources: {
      'en':{
        'translation': {
          test: 'Test translation'
        }
    },
        'he':{
            'translation': {
              test: 'בדיקת תרגום'
            }
        }
    },
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
});
export default i18n;