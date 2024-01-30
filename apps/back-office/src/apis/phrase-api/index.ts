import { ApiClientInstance } from "@daily-phrase/api";

export class PhraseApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  deletePhrase(id: string) {
    this.apiClient.delete(`/api/admin/phrases/${id}`);
  }
  getPhraseList() {
    this.apiClient.get("/api/admin/phrases");
  }
  getPhrase(id: string) {
    this.apiClient.delete(`/api/admin/phrases/${id}`);
  }
  updatePhrase(id: string) {
    this.apiClient.patch(`/api/admin/phrases/${id}`);
  }
  createPhrase() {
    this.apiClient.post("/api/admin/phrases");
  }
}
