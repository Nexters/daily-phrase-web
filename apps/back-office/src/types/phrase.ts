export interface PhraseItem {
  /** timestamp */
  title: string;
  content: string;
  filename: string;
  url: string;
  createdAt: number;
  viewCount: number;
  likeCount: number;
}

export type PhraseItemWithId = PhraseItem & { phraseId: number };
