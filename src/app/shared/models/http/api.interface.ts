export interface IApiBaseResponse<T> {
  message: string;
  data: T;
}

export interface IErrorResponse {
  status: number;
  message: string;
}
