"use client";

import { Phrase } from "@daily-phrase/api";
import { useEffect, useState } from "react";
import { apis } from "~/apis";
import PhraseCard from "~/components/phrase-card";
import { cn } from "~/libs/utils";

const PHRASE_LIST_SIZE = 3;

export default function PhraseList() {
  const [isLoading, setIsLoading] = useState(true);
  const [phraseList, setPhraseList] = useState<Phrase[]>([]);

  const requestPhraseList = async () => {
    // TODO: 백엔드 https 부착
    const data = await apis.phraseApi.getPhraseList(PHRASE_LIST_SIZE);
    setPhraseList(data.result.phraseList);
    setIsLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    requestPhraseList();
  }, []);

  return (
    <>
      <h3 className="pt-10 pb-2 px-4 text-black text-[22px] font-bold">
        오늘의 글귀
      </h3>
      <div className="flex flex-col pb-4 px-4">
        {isLoading &&
          [...Array(PHRASE_LIST_SIZE)].map((_, i) => {
            return (
              <div key={i} className="w-full mt-2 pb-4 space-y-2.5">
                <div className="animate-pulse bg-[#ececec] w-[150px] h-[27px] rounded-[8px]" />
                <div className="animate-pulse bg-[#ececec] w-[250px] h-[27px] rounded-[8px]" />
                <div className="animate-pulse bg-[#ececec] w-full h-[200px] rounded-[8px]" />
              </div>
            );
          })}
        {!isLoading &&
          phraseList.map((phrase, i) => {
            return (
              <PhraseCard
                key={phrase.title + i}
                phrase={phrase}
                className={cn(i > 0 && "border-t-[1px] border-[#ececec]")}
              />
            );
          })}
      </div>
    </>
  );
}
