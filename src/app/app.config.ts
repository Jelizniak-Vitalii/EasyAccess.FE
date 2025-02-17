import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from "@angular/platform-browser/animations";
import { of } from 'rxjs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { TUI_ENGLISH_LANGUAGE, TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';

import { routes } from './app.routes';

const HttpLoaderFactory= (http: HttpClient) =>
  new TranslateHttpLoader(http, '/assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'ru',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    {
      provide: TUI_LANGUAGE,
      useValue: of(
        TUI_RUSSIAN_LANGUAGE,
        TUI_ENGLISH_LANGUAGE
      )
    },
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    NG_EVENT_PLUGINS
  ]
};
