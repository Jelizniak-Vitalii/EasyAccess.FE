import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n';

import { LoadingService, LocalStorageService } from '@shared/services';
import { appConfig, languages } from '@configs/index';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly translateService = inject(TranslateService);
  private readonly tuiLangSwitcher = inject(TuiLanguageSwitcherService);
  private readonly loadingService = inject(LoadingService);
  private readonly localStorageService = inject(LocalStorageService);

  setLang(lang: string) {
    this.localStorageService.setLang(lang);
  }

  getLang() {
    return this.localStorageService.getLang();
  }

  initLang() {
    const lang = this.getLang();

    this.changeLang(lang || this.translateService.getBrowserLang() || appConfig.defaultLang);
  }

  changeLang(lang: string) {
    const activeLang = languages.find(item => item.id === lang)?.tuiLangFlag || appConfig.defaultTuiLangFlag;

    this.setLang(lang);
    this.translateService.use(lang);
    this.tuiLangSwitcher.setLanguage(activeLang);

    this.loadingService.updateRefresh();
  }
}
