"use client";

import { Phrase } from "@daily-phrase/api";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import { apis } from "~/apis";
import PhraseCard from "~/components/phrase-card";

const PHRASE_LIST_SIZE = 3;

export default function PhraseList() {
  const [isLoading, setIsLoading] = useState(true);
  const [phraseList, setPhraseList] = useState<Phrase[]>([]);

  const requestPhraseList = async () => {
    const res = await fetch("/api/v1/phrases?page=1&size=3", {
      headers: {
        "content-type": "application/json",
      },
    });
    const { data } = await res.json();
    // TODO: 백엔드 https 부착
    // const res = await apis.adminApi.getPhraseList(PHRASE_LIST_SIZE);
    setPhraseList(data.result.phraseList);
    setIsLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    requestPhraseList();
  }, []);

  return (
    <>
      <h3 {...stylex.props(styles.listTitle)}>오늘의 글귀</h3>
      <div {...stylex.props(styles.listWrapper)}>
        {isLoading &&
          [...Array(PHRASE_LIST_SIZE)].map((_, i) => {
            return (
              <div key={i} {...stylex.props(styles.skeletonWrapper)}>
                <div {...stylex.props(styles.skeleton, styles.skeletonTitle)} />
                <div
                  {...stylex.props(styles.skeleton, styles.skeletonDescription)}
                />
                <div {...stylex.props(styles.skeleton, styles.skeletonImage)} />
                <div {...stylex.props(styles.skeleton)} />
              </div>
            );
          })}
        {!isLoading &&
          phraseList.map((phrase, i) => {
            return (
              <PhraseCard
                key={phrase.title + i}
                phrase={phrase}
                style={i > 0 && styles.listItemBorderTop}
              />
            );
          })}
      </div>
    </>
  );
}

const styles = stylex.create({
  skeletonWrapper: {
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
  },
  skeleton: {
    backgroundColor: "#ececec",
  },
  skeletonTitle: {
    width: 100,
    height: 27,
    borderRadius: 8,
    marginBottom: 10,
  },
  skeletonDescription: {
    width: 200,
    height: 27,
    borderRadius: 8,
    marginBottom: 10,
  },
  skeletonImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  listTitle: {
    color: "#000",
    fontSize: 22,
    fontWeight: 700,
    padding: "40px 16px 8px",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0 16px 16px",
  },
  listItemBorderTop: {
    borderTop: "1px solid #ececec",
  },
});