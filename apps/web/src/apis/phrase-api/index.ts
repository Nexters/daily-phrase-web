import { ApiClientInstance } from "@daily-phrase/api";

export class PhraseApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  getPhraseList() {
    this.apiClient.get("/api/v1/phrases");
  }
  getPhrase(id: string) {
    this.apiClient.get(`/api/v1/phrase/${id}`);
  }
}
