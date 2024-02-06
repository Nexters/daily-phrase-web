"use client";

import { Phrase } from "@daily-phrase/api";
import * as stylex from "@stylexjs/stylex";
import { EyeIcon, LikeLinearIcon } from "~/components/ui/icons";
import { numberWithCommas } from "~/libs/utils";

export type PhraseCardProps = {
  phrase: Phrase;
  style?: stylex.StyleXStyles;
};

export default function PhraseCard({ phrase, style }: PhraseCardProps) {
  return (
    <div {...stylex.props(styles.wrap, style)}>
      <a href={`/phrase-web/${phrase.phraseId}`}>
        <div {...stylex.props(styles.title)}>{phrase.title}</div>
        <div {...stylex.props(styles.text)}>{phrase.content}</div>
        <div {...stylex.props(styles.imageWrapper)}>
          <img src={phrase.imageUrl} alt="" />
        </div>
      </a>
      <div {...stylex.props(styles.footer)}>
        <button type="button" {...stylex.props(styles.iconWrapper)}>
          <EyeIcon width={20} height={20} />
          <span>{numberWithCommas(phrase.likeCount)}</span>
        </button>
        <button type="button" {...stylex.props(styles.iconWrapper)}>
          <LikeLinearIcon width={20} height={20} />
          <span>{numberWithCommas(phrase.viewCount)}</span>
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 0 16px",
  },
  title: {
    marginBottom: 4,
    paddingTop: 8,
    color: "#000",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "27px",
  },
  text: {
    color: "#64696B",
    fontSize: 16,
    lineHeight: "22px",
    marginBottom: 10,
  },
  imageWrapper: {
    marginBottom: 10,
    width: "100%",
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 10,
    overflow: "hidden",
  },
  footer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 22px",
    color: "#64696B",
    fontSize: 14,
    lineHeight: "22px",
    textOverflow: "ellipsis",
  },
});
