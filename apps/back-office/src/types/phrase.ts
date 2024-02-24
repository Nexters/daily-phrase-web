export interface PhraseItem {
  /** timestamp */
  title: string;
  content: string;
  filename: string;
  imageUrl: string;
  imageRatio: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  isReserved: boolean;
  publishDate: string | null;
}

export type PhraseItemWithId = PhraseItem & { phraseId: number };
