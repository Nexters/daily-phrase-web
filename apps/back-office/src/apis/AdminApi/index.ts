import { ApiClientInstance } from "@daily-phrase/api";

export class AdminApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
}
