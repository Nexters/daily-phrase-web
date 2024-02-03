export type Phrase = {
  phraseId: number;
  title: string;
  imageUrl: string;
  imageRatio: string;
  content: string;
  likeCount: number;
  viewCount: number;
};

export type PhrasePaging = {
  page: number;
  size: number;
  hasNext: boolean;
  total: number;
  phraseList: Phrase[];
};
