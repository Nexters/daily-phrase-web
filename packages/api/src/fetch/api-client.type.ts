export interface BaseResponseSuccess<T> {
  data: T;
}

interface AdditionalErrorConfig {
  fetchRoute: string;
}

export type OnResponseError<ResponseError, ThrownError> = (
  error: ResponseError,
  requestConfig: RequestInit & AdditionalErrorConfig,
) => ThrownError;

export type OnResponseSuccess<ResponseSuccess, TransformedResponse> = (
  response: ResponseSuccess,
) => TransformedResponse;

export type OnRequestError<ResponseError> = (
  error: ResponseError,
  requestConfig: RequestInit & AdditionalErrorConfig,
) => never;

export interface ApiClientProps {
  requestConfig: RequestInit & { baseURL?: string };
  onRequestSuccess?: (requestConfig: RequestInit) => RequestInit;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onRequestError?: OnRequestError<any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onResponseSuccess?: OnResponseSuccess<any, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onResponseError?: OnResponseError<any, any>;
}

export interface ApiClientInstance {
  get<T>(route: string, requestConfig?: RequestInit): Promise<T>;
  delete<T>(route: string, requestConfig?: RequestInit): Promise<T>;
  post<T>(
    route: string,
    body?: RequestInit["body"],
    requestConfig?: Omit<RequestInit, "body">,
  ): Promise<T>;
  put<T>(
    route: string,
    body?: RequestInit["body"],
    requestConfig?: Omit<RequestInit, "body">,
  ): Promise<T>;
  patch<T>(
    route: string,
    body?: RequestInit["body"],
    requestConfig?: Omit<RequestInit, "body">,
  ): Promise<T>;
}
