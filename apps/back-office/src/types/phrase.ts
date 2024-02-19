export interface PhraseItem {
  /** timestamp */
  title: string;
  content: string;
  filename: string;
  imageUrl: string;
  imageRatio: string;
  createdAt: number;
  viewCount: number;
  likeCount: number;
}

export type PhraseItemWithId = PhraseItem & { phraseId: number };
