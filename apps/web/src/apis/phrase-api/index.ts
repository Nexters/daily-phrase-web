import { ApiClientInstance } from "@daily-phrase/api";

export class PhraseApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  getPhraseList() {
    return this.apiClient.get("/api/v1/phrases?size=3", {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  getPhrase(id: string) {
    return this.apiClient.get(`/api/v1/phrases/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
