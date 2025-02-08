import { Observable } from 'rxjs';

export type HttpOptions = {
  [key: string]: any;
  withoutSpinner?: boolean;
  withoutErrorMessage?: boolean;
  errorMessage?: string;
  successMessage?: string;
  showSuccessMessage?: boolean;
  showLoading?: boolean;
  skipErrorCodesMessage?: (string | number)[];
  headers?: { [key: string]: string };
}

export interface IApiBaseActions {
  get<T>(path: string, options: HttpOptions, params?: Object): Observable<T>;
  post<T>(path: string, data: any, options: HttpOptions, params?: Object): Observable<T>;
  put<T>(path: string, data: any, options: HttpOptions, params?: Object): Observable<T>;
}
