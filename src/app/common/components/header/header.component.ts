import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

import { User } from '@shared/models';
import { SideBarComponent } from '@common/components/side-bar/side-bar.component';
import { LanguageSwitcherComponent } from '@common/components/language-switcher/language-switcher.component';
import { AccountMenuComponent } from '@common/components/account-menu/account-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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

  readonly #sideBarMenuState = signal(false);
  readonly sideBarMenuState = this.#sideBarMenuState.asReadonly()

  updateSideBarMenuState(value: boolean) {
    this.#sideBarMenuState.set(value);
  }

  // // TODO Move change lang to localization service
  // onLangChange(lang: Language) {
  //   this.usersHttpService.updateUserLang(lang)
  //     .pipe(take(1), takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => this.loadingService.updateRefresh());
  // }
}
