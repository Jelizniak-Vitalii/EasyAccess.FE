import { inject, Injectable } from '@angular/core';
import { User } from '@shared/models';
import { map, Observable, of } from 'rxjs';
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
    return this.apiService.get<User>('users/user', { showLoading: true });
  }
}
