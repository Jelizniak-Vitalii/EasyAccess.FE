import { Router, ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { finalize, map, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';

import { TokenService } from '@shared/services';
import { User } from '@shared/models';
import { UserService } from '@modules/users/services';
import { appConfig } from '@configs/app.config';

export interface AuthState {
  isAuthenticated: boolean;
  isInit: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInit: false,
  user: null
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    tokenService = inject(TokenService),
    usersService = inject(UserService),
    spinnerService = inject(NgxSpinnerService),
    router = inject(Router),
    activatedRoute = inject(ActivatedRoute)
  ) => ({
    initApp: rxMethod<void>(
      pipe(
        tap(() => spinnerService.show()),
        switchMap(() => usersService.getUser().pipe(
          map(user => patchState(store, () => ({ user, isAuthenticated: true }))),
          finalize(() => {
            patchState(store, (state) => ({ ...state, isInit: true }));
            router.navigate([appConfig.defaultRoute], {queryParams: activatedRoute.snapshot.queryParams});
            spinnerService.hide();
          })
        ))
      )
    ),
    initUser: rxMethod<void>(
      pipe(
        switchMap(() =>
          usersService.getUser().pipe(
            map(user => patchState(store, () => ({ user, isAuthenticated: true }))),
            finalize(() => {
              patchState(store, (state) => ({ ...state, isInit: true }));
              router.navigate([appConfig.defaultRoute], {queryParams: activatedRoute.snapshot.queryParams});
            })
          )
        )
      )
    ),
    authenticateUser: (token: string) => tokenService.setJwtToken(token),
    logout() {
      patchState(store, (state) => ({ ...state, isAuthenticated: false, user: null }));
      tokenService.removeJwtToken();
      router.navigate(['/auth/login']);
    }
  })),
  withHooks({
    onInit(store) {
      store.initApp();
    }
  })
);
