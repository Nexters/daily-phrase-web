import { ApiClientInstance, ApiData } from "@daily-phrase/api";
import { PhraseItemWithId } from "~/types/phrase";

export class PhraseApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  deletePhrase(id: string) {
    return this.apiClient.delete(`/api/admin/phrases/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  getPhraseList() {
    return this.apiClient.get<ApiData<Array<PhraseItemWithId>>>(
      "/api/admin/phrases",
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
  getPhrase(id: string) {
    return this.apiClient.delete(`/api/admin/phrases/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  updatePhrase(id: string) {
    return this.apiClient.patch(`/api/admin/phrases/${id}`);
  }
  createPhrase() {
    return this.apiClient.post("/api/admin/phrases");
  }
}
