import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import {
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiLink,
  TuiTextfield
} from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/legacy';

import { environment } from '@environments/environment';
import { ButtonLoadingComponent } from '@shared/components';
import { AuthDataService, AuthService } from '@modules/auth/services';
import { AuthLogin } from '@modules/auth/models';
import { AuthStore } from '@stores/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../auth/auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiLink,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiInputModule,
    RouterLink,
    TuiPassword,
    TuiLabel,
    TuiIcon,
    TuiTextfield,
    TranslateModule,
    ButtonLoadingComponent
  ]
})
export class LoginComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly authStore = inject(AuthStore);
  private readonly authDataService = inject(AuthDataService);

  readonly authForm = this.authDataService.generateLoginForm({
    email: environment.production ? '' : 'test@gmail.com',
    password: environment.production ? '' : '123456'
  });

  login() {
    if (this.authForm.invalid) {
      tuiMarkControlAsTouchedAndValidate(this.authForm);

      return;
    }

    this.authService.login(this.authForm.getRawValue() as AuthLogin)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(token => {
        this.authStore.authenticateUser(token);
        this.authStore.initUser();
      });
  }
}
