import { I18n } from 'i18n-js';
import en from './en.json';
import sw from './sw.json';

const i18n = new I18n({
  en,
  sw
});

// Default to English, but allows toggle
i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;
