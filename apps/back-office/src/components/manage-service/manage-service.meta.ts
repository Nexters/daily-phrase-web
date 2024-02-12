import { PhraseItem, PhraseItemWithId } from "~/types/phrase";

const phraseItemMocks: PhraseItem = {
  createdAt: new Date().getMilliseconds(),
  title:
    "안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들",
  filename: "",
  content:
    "안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들 안녕 친구들",
  viewCount: 9999999,
  likeCount: 9999999,
};

export const getPhraseItemListMocks = (num: number): Array<PhraseItemWithId> =>
  Array.from({ length: num }, (_, idx) => ({
    ...phraseItemMocks,
    phraseId: idx + 1,
  }));

export const rowsPerPageOptions = [
  { value: "10", label: "10개" },
  { value: "20", label: "20개" },
  { value: "30", label: "30개" },
  { value: "50", label: "50개" },
  { value: "100", label: "100개" },
];
