import { AddPhrase, ApiClientInstance, ApiData } from "@daily-phrase/api";
import { PhraseItemWithId } from "~/types/phrase";

export class PhraseApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  deletePhrase(id: number | string) {
    return this.apiClient.delete(`/api/admin/phrases/${id}`);
  }
  getPhraseList() {
    return this.apiClient.get<ApiData<{ phraseList: Array<PhraseItemWithId> }>>(
      "/api/admin/phrases",
    );
  }
  getPhrase(id: number | string) {
    return this.apiClient.get(`/api/admin/phrases/${id}`);
  }
  updatePhrase(id: number | string, data: object) {
    return this.apiClient.patch(
      `/api/admin/phrases/${id}`,
      JSON.stringify(data),
    );
  }
  createPhrase(data: AddPhrase) {
    return this.apiClient.post("/api/admin/phrases", JSON.stringify(data));
  }
  uploadImage(data: object) {
    return this.apiClient.post<
      ApiData<{
        fileName: "string";
        imageUrl: "string";
        fileSize: number;
      }>
    >("/api/admin/phrases/upload", JSON.stringify(data));
  }
}
