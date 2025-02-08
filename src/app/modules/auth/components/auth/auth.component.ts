import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ RouterOutlet ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      deps: [TranslateService],
      useFactory: (translateService: TranslateService) => ({
        required: translateService.stream('validation.required').pipe(map(value => value)),
        email: translateService.stream('validation.email').pipe(map(value => value)),
        minlength: translateService.stream('validation.minlength').pipe(map(value => value)),
        passwordsDontMatch: translateService.stream('validation.passwordsDontMatch').pipe(map(value => value))
      })
    }
  ]
})
export class AuthComponent {}
