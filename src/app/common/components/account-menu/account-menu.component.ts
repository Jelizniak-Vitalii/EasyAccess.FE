import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import {
  TuiAutoColorPipe,
  TuiButton,
  TuiDropdownDirective,
  TuiDropdownManual,
} from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { User } from '@shared/models';
import { AuthStore } from '@stores/auth.store';

@Component({
  selector: 'app-account-menu',
  templateUrl: 'account-menu.component.html',
  styleUrls: ['account-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    TuiDropdownDirective,
    TuiObscured,
    TuiActiveZone,
    TuiDropdownManual,
    TuiAvatar,
    TuiAutoColorPipe,
    RouterLink,
    TuiButton
  ]
})
export class AccountMenuComponent {
  readonly user = input<User>();

  public readonly authStore = inject(AuthStore);

  readonly #isDropdownOpen = signal(false);

  readonly isDropdownOpen = this.#isDropdownOpen.asReadonly();
  readonly shortUserName = computed(() => (this.user() as User)?.firstName?.[0] + (this.user() as User)?.lastName?.[0]);

  updateDropDownOpen(value: boolean): void {
    this.#isDropdownOpen.set(value);
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.#isDropdownOpen.set(false);
    }
  }

  onActiveZone(active: boolean): void {
    this.#isDropdownOpen.set(active && this.isDropdownOpen());
  }
}
