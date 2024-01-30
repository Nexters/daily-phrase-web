import { ApiClient, OnResponseError } from "@daily-phrase/api";
import { AdminApi } from "./admin-api";
import { ResponseError, ResponseSuccess } from "./apis.type";
import { fetchErrorCreator } from "./config/fetch-error-creator";

const onRequestSuccess = (requestInit: RequestInit): RequestInit => {
  if (typeof window !== "undefined" && requestInit.headers) {
    const copyRequestInit: RequestInit = JSON.parse(
      JSON.stringify(requestInit),
    );
    copyRequestInit.headers = {
      ...copyRequestInit.headers,
      Authorization: "Bearer ",
    };
    return copyRequestInit;
  }
  // server side getCookie logic
  console.log("server side");
  return requestInit;
};

const onResponseError: OnResponseError<
  ResponseError,
  ReturnType<typeof fetchErrorCreator>
> = (
  /** @todo 에러 타입에 맞게 가공 */
  error,
) => {
  console.error("[Response Error]", error);
  /** @todo 에러 타입에 맞게 가공 */
  return fetchErrorCreator(error);
};

const onResponseSuccess = <T>(response: ResponseSuccess<T>): T => {
  return response.data;
};

const httpClient = new ApiClient({
  onResponseError,
  onRequestSuccess,
  onResponseSuccess,
  requestConfig: {
    baseURL: process.env.API_URL,
  },
});

export const apis = {
  adminApi: new AdminApi(httpClient),
};
