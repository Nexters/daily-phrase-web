export interface PhraseItem {
  /** timestamp */
  createdAt: number;
  title: string;
  imageUrl: string;
  content: string;
  viewCount: number;
  likeCount: number;
}

export type PhraseItemWithId = PhraseItem & { id: number };
