import {
  ApiClientInstance,
  ApiClientProps,
  BaseResponseSuccess,
} from "./api-client.type";

class ApiClient<ResponseError extends Error> implements ApiClientInstance {
  private config: ApiClientProps<ResponseError>["requestInit"];
  private responseInterceptor: ApiClientProps<ResponseError>["responseInterceptor"];

  constructor({
    requestInterceptor,
    responseInterceptor,
    requestInit,
  }: ApiClientProps<ResponseError>) {
    this.config = requestInterceptor({
      mode: "cors",
      credentials: "include",
      ...requestInit,
      headers: {
        ...requestInit?.headers,
      },
    });
    this.responseInterceptor = responseInterceptor;
  }

  private async common<T>(
    route: string,
    requestInit?: RequestInit,
  ): Promise<BaseResponseSuccess<T>> {
    const requestConfig: RequestInit = {
      ...this.config,
      ...requestInit,
      headers: {
        ...this.config.headers,
        ...requestInit?.headers,
      },
    };
    const fetchRoute = `${this.config?.baseURL || ""}${route}`;
    const response: Response = await fetch(
      `${this.config?.baseURL || ""}${route}`,
      requestConfig,
    );
    /** @todo timeout 만들기 with AbortController */
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let data: any;
    try {
      data = await response.json();
    } catch (error) {
      data = await response.text();
    }
    if (response.ok) return data as BaseResponseSuccess<T>;
    return this.responseInterceptor(data, requestConfig, fetchRoute);
  }

  async get<T>(route: string, requestInit?: RequestInit) {
    const response = await this.common<T>(route, {
      method: "GET",
      ...(requestInit ?? {}),
    });
    return response.data;
  }

  async post<T>(
    route: string,
    body?: RequestInit["body"],
    requestInit?: Omit<RequestInit, "body">,
  ) {
    const response = await this.common<T>(route, {
      ...(requestInit ?? {}),
      method: "POST",
      body,
    });
    return response.data;
  }

  async put<T>(
    route: string,
    body?: RequestInit["body"],
    requestInit?: Omit<RequestInit, "body">,
  ) {
    const response = await this.common<T>(route, {
      ...(requestInit ?? {}),
      method: "PUT",
      body,
    });
    return response.data;
  }

  async patch<T>(
    route: string,
    body?: RequestInit["body"],
    requestInit?: Omit<RequestInit, "body">,
  ) {
    const response = await this.common<T>(route, {
      ...(requestInit ?? {}),
      method: "PATCH",
      body,
    });
    return response.data;
  }

  async delete<T>(route: string, requestInit?: RequestInit) {
    const response = await this.common<T>(route, {
      ...(requestInit ?? {}),
      method: "DELETE",
    });
    return response.data;
  }
}

export default ApiClient;
