import { inject, Injectable } from '@angular/core';
import { WindowService } from '@shared/services/window.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly windowService = inject(WindowService);

  getJwtToken() {
    return localStorage.getItem('token');
  }

  setJwtToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeJwtToken() {
    localStorage.removeItem('token');
  }

  setSideBarMenuState(state: boolean) {
    this.windowService.window?.localStorage.setItem('sideBarState', JSON.stringify(state));
  }

  getSideBarMenuState() {
    const state = this.windowService.window?.localStorage.getItem('sideBarState');

    return state ? JSON.parse(state) : null;
  }

  setLang(lang: string) {
    this.windowService.window?.localStorage.setItem('lang', lang);
  }

  getLang() {
    return this.windowService.window?.localStorage.getItem('lang');
  }

  setDeviceId(id: string) {
    this.windowService.window?.localStorage.setItem('deviceId', id);
  }

  getDeviceId() {
    return this.windowService.window?.localStorage.getItem('deviceId');
  }

  removeDeviceId() {
    this.windowService.window?.localStorage.removeItem('deviceId');
  }
}
