import { ApiClientInstance } from "@daily-phrase/api";

export class LoginApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  login() {
    return this.apiClient.post("/api/admin/login");
  }
  logout() {
    return this.apiClient.post("/api/admin/logout");
  }
}
