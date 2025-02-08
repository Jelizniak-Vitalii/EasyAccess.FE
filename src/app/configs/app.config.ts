import { Language, TuiLanguages } from '@shared/models';

export const appConfig = {
  defaultRoute: 'dashboard',
  defaultLang: Language.Russian,
  defaultTuiLangFlag: TuiLanguages.Russian,
  sideBarItems: [
    { title: 'sideBar.calendar', route: 'calendar', icon: 'tuiIconCalendar', active: true },
    { title: 'sideBar.schedule', route: 'schedule', icon: 'assets/images/icons/schedule.svg', active: true },
    { title: 'sideBar.dashboard', route: 'dashboard', icon: '', active: false },
    { title: 'sideBar.services', route: 'services', icon: 'tuiIconClipboard', active: true },
    { title: 'sideBar.clients', route: 'clients', icon: 'tuiIconUsers', active: true },
    { title: 'sideBar.onlineBooking', route: 'online-booking', icon: 'tuiIconMonitor', active: true },
    { title: 'sideBar.settings', route: 'settings', icon: 'tuiIconSettings', active: true },
    { title: 'sideBar.login', route: 'auth/login', icon: '', active: false },
    { title: 'sideBar.registration', route: 'auth/registration', icon: '', active: false },
  ]
};
