import { ApiClient, ApiData, OnResponseError } from "@daily-phrase/api";
import { deleteCookie, getCookie } from "cookies-next";
import { ResponseError } from "./apis.type";
import { ACCESS_TOKEN } from "./config/cookie/token";
import { fetchErrorCreator } from "./config/fetch-error-creator";
import { LoginApi } from "./login-api";
import { PhraseApi } from "./phrase-api";

const onRequestSuccess = (requestInit: RequestInit): RequestInit => {
  if (typeof window !== "undefined" && requestInit.headers) {
    const copyRequestInit: RequestInit = JSON.parse(
      JSON.stringify(requestInit),
    );
    copyRequestInit.headers = {
      ...copyRequestInit.headers,
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
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
  if (error.status === 401) {
    deleteCookie(ACCESS_TOKEN);
    if (location) location.href = "login";
  }
  return fetchErrorCreator(error);
};

const onResponseSuccess = <T>(response: ApiData<T>): ApiData<T> => {
  if (response.status === 401) {
    deleteCookie(ACCESS_TOKEN);
    if (location) location.href = "login";
  }
  return response;
};

const httpClient = new ApiClient({
  onResponseError,
  onRequestSuccess,
  onResponseSuccess,
  requestConfig: {
    baseURL: "", // TODO: 임시로 로컬 proxy 태움
    headers: {
      "content-type": "application/json",
    },
  },
});

export const apis = {
  loginApi: new LoginApi(httpClient),
  phraseApi: new PhraseApi(httpClient),
};
