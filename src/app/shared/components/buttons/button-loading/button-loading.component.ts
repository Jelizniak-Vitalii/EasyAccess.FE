import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';

import { LoadingService } from '@shared/services';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    TranslateModule,
    NgStyle,
    TuiButton,
    TuiButtonLoading
  ]
})
export class ButtonLoadingComponent {
  readonly name = input<string>('general.save');
  readonly type = input<string>('button');
  readonly size = input<'m' | 'l' | 'xl' | 's' | 'xs'>('m');
  readonly appearance = input<string>('primary');
  readonly disabled = input<boolean>(false);
  readonly fullWidth = input<boolean>(true);

  readonly click = output<void>();

  public readonly loadingService = inject(LoadingService);
}
