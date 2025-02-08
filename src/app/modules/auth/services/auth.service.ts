import { inject, Injectable } from '@angular/core';
import { ApiService } from '@shared/services';
import { Observable } from 'rxjs';
import { AuthLogin, AuthRegistration } from '@modules/auth/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(user: AuthLogin): Observable<string> {
    return this.apiService.post<string>('auth/login', user, { showLoading: true });
  }

  register(user: AuthRegistration): Observable<string> {
    return this.apiService.post<string>('auth/registration', user, { showSuccessMessage: true, successMessage: 'successMessages.signUp', showLoading: true });
  }
}

