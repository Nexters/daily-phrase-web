export interface BaseResponseSuccess<T> {
  data: T;
}

export interface ApiClientProps<ResponseError extends Error> {
  requestInit: RequestInit & { baseURL?: string };
  requestInterceptor: (requestInit: RequestInit) => RequestInit;
  responseInterceptor: (
    error: ResponseError,
    config: RequestInit,
    fetchRoute: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ) => Promise<BaseResponseSuccess<any>>;
}

export interface ApiClientInstance {
  get<T>(route: string, requestInit?: RequestInit): Promise<T>;
  delete<T>(route: string, requestInit?: RequestInit): Promise<T>;
  post<T>(
    route: string,
    body?: RequestInit["body"],
    requestInit?: Omit<RequestInit, "body">,
  ): Promise<T>;
  put<T>(
    route: string,
    body?: RequestInit["body"],
    requestInit?: Omit<RequestInit, "body">,
  ): Promise<T>;
  patch<T>(
    route: string,
    body?: RequestInit["body"],
    requestInit?: Omit<RequestInit, "body">,
  ): Promise<T>;
}
