import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '@stores/auth.store';

export const isAuthorizedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  console.log(authStore);
  if (!authStore.isAuthenticated()) {
    router.navigate(['/auth/login']);

    return false;
  }

  return true;
};
