import { ApiClient, ApiClientProps } from "@daily-phrase/api";
import { AdminApi } from "./admin-api";
import { ResponseError } from "./apis.type";
import { fetchErrorCreator } from "./config/fetch-error-creator";

const requestInterceptor = (requestInit: RequestInit): RequestInit => {
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

const responseInterceptor: ApiClientProps<ResponseError>["responseInterceptor"] =
  (error) => {
    console.error("[Response Error]", error);
    throw fetchErrorCreator(error);
  };

const httpClient = new ApiClient({
  requestInterceptor,
  responseInterceptor,
  requestInit: {
    baseURL: process.env.API_URL,
  },
});

export const apis = {
  adminApi: new AdminApi(httpClient),
};
