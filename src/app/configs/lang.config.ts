import { Language, LanguageConfig, TuiLanguages } from '@shared/models';

export const languages: LanguageConfig[] = [
  { id: Language.English, tuiLangFlag: TuiLanguages.English, title: 'English', icon: '/assets/images/icons/usa-flag.svg', router: '/en' },
  // { id: Language.Ukrainian, tuiLangFlag: TuiLanguages.Ukrainian, title: 'Українська', icon: '/assets/images/icons/ukraine-flag.svg', router: '/uk' },
  { id: Language.Russian, tuiLangFlag: TuiLanguages.Russian, title: 'Русский', icon: '/assets/images/icons/russia-flag.svg', router: '/ru' }
];
