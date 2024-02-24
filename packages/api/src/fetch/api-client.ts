import { ApiClientInstance, ApiClientProps } from "./api-client.type";
import { ApiError, BaseError } from "./custom-error";

class ApiClient implements ApiClientInstance {
  private config: ApiClientProps["requestConfig"];
  private onRequestSuccess: ApiClientProps["onRequestSuccess"];
  /** @todo 구현 필요 */
  private onRequestError: ApiClientProps["onRequestError"];
  private onResponseSuccess: ApiClientProps["onResponseSuccess"];
  private onResponseError: ApiClientProps["onResponseError"];

  constructor({
    onRequestSuccess,
    onRequestError,
    onResponseSuccess,
    onResponseError,
    requestConfig,
  }: ApiClientProps) {
    this.config = {
      mode: "cors",
      credentials: "include",
      ...requestConfig,
      headers: {
        ...requestConfig?.headers,
      },
    };
    this.onRequestSuccess = onRequestSuccess;
    this.onRequestError = onRequestError;
    this.onResponseSuccess = onResponseSuccess;
    this.onResponseError = onResponseError;
  }

  private async common<T>(
    route: string,
    requestConfig?: RequestInit,
  ): Promise<T> {
    const baseConf = {
      ...this.config,
      ...requestConfig,
      headers: {
        ...this.config.headers,
        ...requestConfig?.headers,
      },
    };
    const requestConf: RequestInit =
      this.onRequestSuccess?.(baseConf) || baseConf;
    const fetchRoute = `${this.config?.baseURL || ""}${route}`;
    const response: Response = await fetch(
      `${this.config?.baseURL || ""}${route}`,
      requestConf,
    );
    /** @todo timeout 만들기 with AbortController */
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let data: any;
    try {
      data = await response.json();
    } catch (error) {
      data = await response.text();
    }
    if (response.ok) {
      const successResponse = this.onResponseSuccess?.(data);
      return (successResponse ?? data) as T;
    }
    throw (
      this.onResponseError?.(data, { ...requestConf, fetchRoute }) ||
      new BaseError({
        message: `daily-phrase api call error\ncause=${data}`,
        status: 500,
      })
    );
  }

  async get<T>(route: string, requestConfig?: RequestInit) {
    const response = await this.common<T>(route, {
      method: "GET",
      ...(requestConfig ?? {}),
    });
    return response;
  }

  async post<T>(
    route: string,
    body?: RequestInit["body"],
    requestConfig?: Omit<RequestInit, "body">,
  ) {
    const response = await this.common<T>(route, {
      ...(requestConfig ?? {}),
      method: "POST",
      body,
    });
    return response;
  }

  async put<T>(
    route: string,
    body?: RequestInit["body"],
    requestConfig?: Omit<RequestInit, "body">,
  ) {
    const response = await this.common<T>(route, {
      ...(requestConfig ?? {}),
      method: "PUT",
      body,
    });
    return response;
  }

  async patch<T>(
    route: string,
    body?: RequestInit["body"],
    requestConfig?: Omit<RequestInit, "body">,
  ) {
    const response = await this.common<T>(route, {
      ...(requestConfig ?? {}),
      method: "PATCH",
      body,
    });
    return response;
  }

  async delete<T>(route: string, requestConfig?: RequestInit) {
    const response = await this.common<T>(route, {
      ...(requestConfig ?? {}),
      method: "DELETE",
    });
    return response;
  }
}

export default ApiClient;
