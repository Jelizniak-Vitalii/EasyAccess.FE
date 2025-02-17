import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressComponent } from 'ngx-progressbar';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { TuiRoot, TuiScrollbar } from '@taiga-ui/core';

import { User } from '@shared/models';
import { LocalizationService } from '@shared/services';
import { AuthStore } from '@stores/auth.store';
import { LayoutComponent } from '@common/components/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    TuiRoot,
    NgProgressComponent,
    NgxSpinnerComponent,
    TuiScrollbar,
    LayoutComponent
  ]
})
export class AppComponent implements OnInit {
  private readonly localizationService = inject(LocalizationService);
  public readonly authStore = inject(AuthStore);

  readonly user = computed((): User => this.authStore.user() as User);

  ngOnInit() {
    this.localizationService.initLang();
  }
}
