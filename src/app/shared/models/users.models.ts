import { Language } from '@shared/models/language.models';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  lang: Language;
}
