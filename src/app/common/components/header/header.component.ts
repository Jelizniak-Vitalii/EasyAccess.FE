import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

import { Language, User } from '@shared/models';
import { LocalizationService } from '@shared/services';
import { SideBarComponent } from '@common/components/side-bar/side-bar.component';
import { LanguageSwitcherComponent } from '@common/components/language-switcher/language-switcher.component';
import { AccountMenuComponent } from '@common/components/account-menu/account-menu.component';
import { UserService } from '@modules/users/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideBarComponent,
    TuiButton,
    TuiPopup,
    TuiDrawer,
    AccountMenuComponent,
    LanguageSwitcherComponent
  ]
})
export class HeaderComponent {
  readonly user = input<User>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly userService= inject(UserService);
  private readonly localizationService= inject(LocalizationService);

  readonly #sideBarMenuState = signal(false);
  readonly sideBarMenuState = this.#sideBarMenuState.asReadonly()

  updateSideBarMenuState(value: boolean) {
    this.#sideBarMenuState.set(value);
  }

  onLanguageChange(lang: Language) {
    this.userService.updateLang(lang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.localizationService.changeLang(lang));
  }
}
