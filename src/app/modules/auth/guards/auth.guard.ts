import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { appConfig } from '@configs/index';
import { AuthStore } from '@stores/auth.store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  console.log(authStore.isAuthenticated());
  if (authStore.isAuthenticated()) {
    router.navigate([appConfig.defaultRoute]);

    return false;
  }

  return true;
};
