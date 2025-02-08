import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiScrollbar } from '@taiga-ui/core';

import { User } from '@shared/models';
import { HeaderComponent } from '@common/components/header/header.component';
import { SideBarComponent } from '@common/components/side-bar/side-bar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    RouterOutlet,
    HeaderComponent,
    TuiScrollbar
  ]
})
export class LayoutComponent {
  readonly user = input<User>();
}
