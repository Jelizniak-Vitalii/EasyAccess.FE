import { Routes } from '@angular/router';

import { authGuard, isAuthorizedGuard } from '@modules/auth/guards';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@modules/auth/auth.routes').then(m => m.authRoutes),
    canMatch: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@modules/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canMatch: [isAuthorizedGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('@modules/settings/components/settings/settings.component').then(m => m.SettingsComponent),
    canMatch: [isAuthorizedGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
