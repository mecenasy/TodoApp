import { addLocaleData } from 'react-intl';
import * as plLocaleData from 'react-intl/locale-data/pl';
import * as enLocaleData from 'react-intl/locale-data/en';

import plTranslationMessages from './translations/pl';
// import enTranslationMessages from './translations/en.json';

const DEFAULT_LOCALE = 'pl';

addLocaleData(plLocaleData);
// addLocaleData(enLocaleData);

export const formatTranslationMessages = (locale, messages) => {
   const defaultFormattedMessages = locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, plTranslationMessages)
      : {};
   return Object.keys(messages).reduce((formattedMessages, key) => {
      const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
         ? defaultFormattedMessages[key]
         : messages[key];
      return {...formattedMessages, [key]: formattedMessage};
   }, {});
};

export const translationMessages = {
   pl: formatTranslationMessages('pl', plTranslationMessages),
   // en: formatTranslationMessages('en', enTranslationMessages),
};
