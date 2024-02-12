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
