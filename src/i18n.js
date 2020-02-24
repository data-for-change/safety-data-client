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
          ,When: 'When'
          ,FromYear:"From Year:"
          ,ToYear:"To Year:"
          ,Where : "Where"
          ,Who :"Who"
          ,Vehicle: "Vehicle:"
          ,all :"all"
          ,pedestrian : "Pedestrian"
          ,cyclist:"Cyclist"
          ,motorcycle: "Motorcycle"
          ,car : "Car"
          ,other: "Other"
          ,Gender: "Gender:"
          ,female :"Female"
          ,male :"Male"
          ,Submit :'Submit'
        }
    },
        'he':{
            'translation': {
              test: 'בדיקת תרגום'
              ,When: 'מתי'
              ,FromYear:"משנה:"
              ,ToYear:"עד שנה:"
              ,Where : "איפה"
              ,Who :"מי"
              ,Vehicle: "כלי רכב:"
              ,all :"כל הסוגים"
              ,pedestrian : "הולך-רגל"
              ,cyclist:"אופניים"
              ,motorcycle: "אופנוע"
              ,car : "מכונית"
              ,other: "אחרים"
              ,Gender: "מגדר:"
              ,female :"נקבות"
              ,male :"זכרים"
              ,Submit :'סינון'
            }
        }
    },
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
});
export default i18n;