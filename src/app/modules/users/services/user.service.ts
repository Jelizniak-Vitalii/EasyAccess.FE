import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Language, User } from '@shared/models';
import { ApiService } from '@shared/services';
import { AuthLogin } from '@modules/auth/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiService = inject(ApiService);

  login(user: AuthLogin): Observable<string> {
    return this.apiService.post<string>('auth/login', user, { showLoading: true });
  }

  getUser(): Observable<User> {
    return this.apiService.get<User>('users/user', { showLoading: true, withoutErrorMessage: true });
  }

  updateLang(lang: Language) {
    return this.apiService.post<string>('users/lang', { lang }, { showLoading: true });
  }
}
