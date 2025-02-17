import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '@stores/auth.store';

export const isAuthorizedGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);

  if (!authStore.isAuthenticated()) {
    const router = inject(Router);

    router.navigate(['/auth/login']);

    return false;
  }

  return true;
};
