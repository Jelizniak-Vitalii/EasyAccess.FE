import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly refresh = new BehaviorSubject('');
  readonly refresh$ = this.refresh.asObservable();

  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  readonly refreshSignal = toSignal(this.refresh$);
  readonly loadingSignal = toSignal(this.loading, { initialValue: false });

  getLoadingValue() {
    return this.loading.getValue();
  }

  updateRefresh() {
    this.refresh.next(new Date().toString());
  }

  updateLoading(value: boolean) {
    this.loading.next(value);
  }
}
