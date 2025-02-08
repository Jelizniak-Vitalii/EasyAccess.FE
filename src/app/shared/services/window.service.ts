import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private readonly document = inject(DOCUMENT)

  get window(): Window | null {
    return this.document.defaultView;
  }

  get getDocument(): Document | null {
    return this.document;
  }
}
