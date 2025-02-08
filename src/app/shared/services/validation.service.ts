import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private readonly translateService = inject(TranslateService);
  private readonly tuiAlertService = inject(TuiAlertService);

  showFormValidationMessage(message: string = 'validation.fillRequiredFields', status: TuiNotificationT = 'info') {
    this.tuiAlertService.open(this.translateService.instant(message), { status }).pipe(take(1)).subscribe();
  }

  passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      const isMatching = passwordControl.value === confirmPasswordControl.value;
      return isMatching ? null : { passwordsDontMatch: true };
    };
  }

  confirmPasswordValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.parent?.get(passwordControlName);

      if (!passwordControl) {
        return null;
      }

      const isMatching = passwordControl.value === control.value;
      return isMatching ? null : { passwordsDontMatch: true };
    };
  }
}
