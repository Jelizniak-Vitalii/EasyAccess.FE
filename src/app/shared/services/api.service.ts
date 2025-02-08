import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, finalize, Observable, take, tap, throwError } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { NgProgress } from 'ngx-progressbar';
import { TranslateService } from '@ngx-translate/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

import { environment } from '@environments/environment';
import { HttpOptions, IApiBaseActions } from '../models';
import { TokenService } from './token.service';
import { LoadingService } from './loading.service';
import { LocalizationService } from './localization.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiBaseActions {
  private readonly httpClient = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly translateService = inject(TranslateService);
  private readonly ngProgress = inject(NgProgress);
  private readonly loadingService = inject(LoadingService);
  private readonly localizationService = inject(LocalizationService);

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  private readonly url: string = `${environment.api}/api`;
  private spinnerCount = 0;
  private isLoading = false;

  private startSpinner() {
    this.ngProgress.ref('progressBarId').start();
    this.spinnerCount++;
  }

  private stopSpinner() {
    this.spinnerCount--;

    if (this.spinnerCount === 0) {
      this.ngProgress.ref('progressBarId').complete();
    }
  }

  private getHeaders(headers: { [key: string]: string } = { 'Content-Type': 'application/json' }): HttpHeaders {
    const token = this.tokenService.getJwtToken();

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept-Language': this.translateService.currentLang || this.localizationService.getLang() || '',
      'x-datetime': `${TuiDay.currentLocal().toString('YMD', '-')}T${TuiTime.currentLocal().toString('HH:MM')}:00.000Z`,
      ...headers
    });
  }

  private handleError(error: HttpErrorResponse, options?: HttpOptions): Observable<never> {
    const errorMessage = this.translateService.instant('errorMessages.general');

    if (error.error instanceof Blob && error.error.type === 'application/json') {
      return new Observable(observer => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const errorObject = JSON.parse(reader.result as string);
          const message = options?.errorMessage || errorMessage || errorObject.message;

          if (!options?.withoutErrorMessage) {
            this.alerts.open(message, { appearance: 'negative' }).pipe(take(1)).subscribe();
          }

          observer.error(error);
          observer.complete();
        };
        reader.readAsText(error.error, 'utf-8');
      });
    } else {
      const message = error?.error?.message || errorMessage;

      if (!options?.withoutErrorMessage) {
        this.alerts.open(message, { appearance: 'negative' }).pipe(take(1)).subscribe();
      }

      return throwError(error);
    }
  }

  get<T>(path: string, options?: HttpOptions, params: Object = {}): Observable<T> {
    if (!options?.withoutSpinner) {
      this.startSpinner();
    }

    if (options?.showLoading && !this.isLoading) {
      this.isLoading = true;
      this.loadingService.updateLoading(true);
    }

    return this.httpClient.get<T>(
      `${this.url}/${path}`,
      {
        ...options,
        withCredentials: true,
        params: this.toHttpParams(params),
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap((response: any) =>
          options?.showSuccessMessage ?
            this.alerts.open(this.translateService.instant(options?.successMessage || 'successMessages.success') || response?.message, { appearance: 'positive' }).pipe(take(1)).subscribe()
            : ''
        ),
        catchError((error) => this.handleError(error, options)),
        finalize(() => {
          if (!options?.withoutSpinner) {
            this.stopSpinner();
          }

          if (options?.showLoading) {
            this.loadingService.updateLoading(false);
            this.isLoading = false;
          }
        })
      );
  }

  post<T>(path: string, data: any, options?: HttpOptions, params?: Object): Observable<T> {
    if (!options?.withoutSpinner) {
      this.startSpinner();
    }

    if (options?.showLoading && !this.isLoading) {
      this.isLoading = true;
      this.loadingService.updateLoading(true);
    }

    return this.httpClient.post<T>(
      `${this.url}/${path}`,
      data,
      {
        ...options,
        withCredentials: true,
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap((response: any) =>
          options?.showSuccessMessage ?
            this.alerts.open(this.translateService.instant(options?.successMessage || 'successMessages.success') || response?.message, { appearance: 'positive' }).pipe(take(1)).subscribe()
            : ''
        ),
        catchError((error) => this.handleError(error, options)),
        finalize(() => {
          if (!options?.withoutSpinner) {
            this.stopSpinner();
          }

          if (options?.showLoading) {
            this.loadingService.updateLoading(false);
            this.isLoading = false;
          }
        })
      );
  }

  put<T>(path: string, data: any, options?: HttpOptions, params: Object = {}): Observable<T> {
    if (!options?.withoutSpinner) {
      this.startSpinner();
    }

    if (options?.showLoading && !this.isLoading) {
      this.isLoading = true;
      this.loadingService.updateLoading(true);
    }

    return this.httpClient.put<T>(
      `${this.url}/${path}`,
      data,
      {
        ...options,
        withCredentials: true,
        params: this.toHttpParams(params),
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap((response: any) =>
          options?.showSuccessMessage ?
            this.alerts.open(this.translateService.instant(options?.successMessage || 'successMessages.success') || response?.message, { appearance: 'positive' }).pipe(take(1)).subscribe()
            : ''
        ),
        catchError((error) => this.handleError(error, options)),
        finalize(() => {
          if (!options?.withoutSpinner) {
            this.stopSpinner();
          }

          if (options?.showLoading) {
            this.loadingService.updateLoading(false);
            this.isLoading = false;
          }
        })
      );
  }

  delete<T>(path: string, body: any, options?: HttpOptions, params?: Object): Observable<T> {
    if (!options?.withoutSpinner) {
      this.startSpinner();
    }

    if (options?.showLoading && !this.isLoading) {
      this.isLoading = true;
      this.loadingService.updateLoading(true);
    }

    return this.httpClient.delete<T>(
      `${this.url}/${path}`,
      {
        ...options,
        body,
        withCredentials: true,
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap((response: any) =>
          options?.showSuccessMessage ?
            this.alerts.open(this.translateService.instant(options?.successMessage || 'successMessages.success') || response?.message, { appearance: 'positive' }).pipe(take(1)).subscribe()
            : ''
        ),
        catchError((error) => this.handleError(error, options)),
        finalize(() => {
          if (!options?.withoutSpinner) {
            this.stopSpinner();
          }

          if (options?.showLoading) {
            this.loadingService.updateLoading(false);
            this.isLoading = false;
          }
        })
      );
  }

  private toHttpParams(params: any): HttpParams {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
