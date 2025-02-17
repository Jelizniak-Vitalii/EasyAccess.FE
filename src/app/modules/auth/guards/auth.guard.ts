import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { appConfig } from '@configs/index';
import { AuthStore } from '@stores/auth.store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);

  if (authStore.isAuthenticated()) {
    const router = inject(Router);

    router.navigate([appConfig.defaultRoute]);

    return false;
  }

  return true;
};
