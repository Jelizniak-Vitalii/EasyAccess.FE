import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormTypeGroup } from '@shared/models';
import { AuthLogin, AuthRegistration } from '@modules/auth/models';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private readonly fb = inject(FormBuilder);

  private readonly loginFormFields = (data: AuthLogin) => ({
    email: [ data.email, [ Validators.required, Validators.email ] ],
    password: [ data.password, [ Validators.required, Validators.minLength(6) ] ]
  });

  generateLoginForm(data: AuthLogin): FormTypeGroup<AuthLogin> {
    return this.fb.group(this.loginFormFields(data));
  }

  generateRegistrationForm(data: AuthRegistration): FormTypeGroup<AuthRegistration> {
    return this.fb.group({
      ...this.loginFormFields(data),
      firstName: [ data.firstName, [ Validators.required ] ],
      lastName: [ data.lastName, [ Validators.required ] ]
    });
  }
}
