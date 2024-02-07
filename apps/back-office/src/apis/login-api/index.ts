import { ApiClientInstance, ApiData } from "@daily-phrase/api";
import { LoginSchema } from "~/components/login/login-form.type";
import { LoginResponse } from "./type";

export class LoginApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  login({ id, password }: LoginSchema) {
    const body = JSON.stringify({ userId: id, password });
    return this.apiClient.post<ApiData<LoginResponse>>(
      "/api/admin/login",
      body,
      { headers: { "content-type": "application/json" } },
    );
  }
  logout() {
    return this.apiClient.post("/api/admin/logout");
  }
}
