import { ApiClientInstance } from "@daily-phrase/api";
import { ApiResponse } from "../apis.type";
import { Phrase, PhrasePaging } from "./type";

export class PhraseApi {
  private apiClient: ApiClientInstance;
  constructor(apiClient: ApiClientInstance) {
    this.apiClient = apiClient;
  }
  getPhraseList(size: number) {
    return this.apiClient.get<ApiResponse<PhrasePaging>>(
      `/api/v1/phrases?size=${size}`,
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
  getPhrase(id: string) {
    return this.apiClient.get<ApiResponse<Phrase>>(`/api/v1/phrases/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
