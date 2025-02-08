import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiError, TuiIcon, TuiLabel, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';

import { ButtonLoadingComponent } from '@shared/components';
import { AuthDataService, AuthService } from '@modules/auth/services';
import { environment } from '@environments/environment';
import { AuthRegistration } from '@modules/auth/models';
import { AuthStore } from '@stores/auth.store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
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
export class RegistrationComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly authDataService = inject(AuthDataService);
  private readonly authStore = inject(AuthStore);

  readonly authForm = this.authDataService.generateRegistrationForm({
    email: environment.production ? '' : 'v.jelizniak@gmail.com',
    password: environment.production ? '' : '123456',
    firstName: environment.production ? '' : 'Vitalii',
    lastName: environment.production ? '' : 'Zhelizniak'
  });

  registration() {
    if (this.authForm.invalid) {
      tuiMarkControlAsTouchedAndValidate(this.authForm);

      return;
    }

    this.authService.register(this.authForm.getRawValue() as AuthRegistration)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(token => {
        this.authStore.authenticateUser(token);
        this.authStore.initUser();
      });
  }
}
