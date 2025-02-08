import type { TuiCountryIsoCode, TuiLanguageName } from '@taiga-ui/i18n/types';

export enum Language {
  Russian = 'ru',
  Ukrainian = 'uk',
  English  = 'en'
}

export enum TuiLanguages {
  Ukrainian = 'ukrainian',
  Russian = 'russian',
  English = 'english'
}

export interface LanguageConfig {
  id: Language;
  tuiLangFlag: TuiLanguageName;
  title: string;
  icon: string;
  router: string;
}
