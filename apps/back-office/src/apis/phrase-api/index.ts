import { AddPhrase, ApiClientInstance, ApiData } from "@daily-phrase/api";
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
    return this.apiClient.get<ApiData<{ phraseList: Array<PhraseItemWithId> }>>(
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
  createPhrase(data: AddPhrase) {
    return this.apiClient.post("/api/admin/phrases", JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  uploadImage(data: object) {
    const body = JSON.stringify(data);

    return this.apiClient.post<
      ApiData<{
        fileName: "string";
        imageUrl: "string";
        fileSize: number;
      }>
    >("/api/admin/phrases/upload", body, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
