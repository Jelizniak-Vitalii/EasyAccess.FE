import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'registration',
        loadComponent: () =>
          import('./components/registration/registration.component').then(m => m.RegistrationComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
