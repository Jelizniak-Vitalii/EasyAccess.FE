import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  TuiButton,
  TuiDropdownDirective,
  TuiDropdownManual,
  TuiIcon
} from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';

import { Language } from '@shared/models';
import { LocalizationService } from '@shared/services';
import { languages } from '@configs/lang.config';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiButton,
    TuiAvatar,
    TuiActiveZone,
    TuiObscured,
    TuiDropdownManual,
    TuiDropdownDirective,
    TranslateModule,
    TuiIcon
  ]
})
export class LanguageSwitcherComponent {
  readonly langChange = output<Language>();

  private readonly translateService = inject(TranslateService);
  private readonly localizationService = inject(LocalizationService);

  readonly #isDropdownOpen = signal(false);

  readonly isDropdownOpen = this.#isDropdownOpen.asReadonly();
  readonly activeLang = signal(this.translateService.currentLang);

  readonly languages = languages;

  updateDropDownOpen(value: boolean) {
    this.#isDropdownOpen.set(value);
  }

  onClickSelectLang(lang: Language) {
    this.activeLang.set(lang);
    this.localizationService.changeLang(lang);
    this.langChange.emit(lang);
  }

  onObscured(obscured: boolean) {
    if (obscured) {
      this.#isDropdownOpen.set(false);
    }
  }

  onActiveZone(active: boolean) {
    this.#isDropdownOpen.set(active && this.isDropdownOpen());
  }
}
