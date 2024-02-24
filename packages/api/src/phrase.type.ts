export type Phrase = {
  phraseId: number;
  title: string;
  imageUrl: string;
  /** ex: "1:1", "16:9" */
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

export type AddPhrase = {
  title: string;
  content: string;
  imageUrl: string;
  imageRatio: string;
  fileName: string;
  fileSize: number;
  isReserved: boolean;
  publishDate: string;
};
