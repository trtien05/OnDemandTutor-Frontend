import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // your English translations
          "welcome": "Welcome to the app!",
          "greeting": "Hello, {{name}}!",
        }
      },
      // add other languages here
      // es: {
      //   translation: {
      //     "welcome": "¡Bienvenido a la aplicación!",
      //     "greeting": "¡Hola, {{name}}!",
      //   }
      // }
    }
  });

export default i18n;