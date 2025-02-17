import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  output
} from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';

import { sideBarComponentConfig } from './side-bar.component.config';

@Component({
  selector: 'app-side-bar',
  templateUrl: 'side-bar.component.html',
  styleUrls: ['side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    TuiIcon,
    RouterLink,
    RouterLinkActive,
  ]
})
export class SideBarComponent {
  readonly selectItem = output<void>();

  readonly items = sideBarComponentConfig.items;
}
