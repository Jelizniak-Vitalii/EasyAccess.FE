import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output
} from '@angular/core';
import { TuiBreakpointService } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';

import { appConfig } from '@configs/app.config';
import { LocalStorageService } from '@shared/services';

@Component({
  selector: 'app-side-bar',
  templateUrl: 'side-bar.component.html',
  styleUrls: ['side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
  ]
})
export class SideBarComponent {
  @Output() selectItem: EventEmitter<void> = new EventEmitter();

  private readonly localStorageService = inject(LocalStorageService);
  public readonly breakPointService = inject(TuiBreakpointService);

  sideBarItems = appConfig.sideBarItems;
  isSideBarCollapsed: boolean = this.localStorageService.getSideBarMenuState();

  updateSideBarState() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
    this.localStorageService.setSideBarMenuState(this.isSideBarCollapsed);
  }
}
