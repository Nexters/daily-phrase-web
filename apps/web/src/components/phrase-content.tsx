import * as stylex from "@stylexjs/stylex";
import { Phrase } from "~/apis/phrase-api/type";

export default function PhraseContent({ phrase }: { phrase: Phrase }) {
  return (
    <div {...stylex.props(styles.wrap)}>
      <div {...stylex.props(styles.title)}>{phrase.title}</div>
      {phrase.imageUrl && (
        <div {...stylex.props(styles.imageWrapper)}>
          <img alt="글귀 이미지" src={phrase.imageUrl} />
        </div>
      )}
      <div {...stylex.props(styles.text)}>{phrase.content}</div>
    </div>
  );
}

const styles = stylex.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 0",
  },
  title: {
    marginBottom: 16,
    padding: "0 16px",
    color: "#000",
    fontSize: 28,
    fontWeight: 600,
    lineHeight: "36px",
  },
  text: {
    padding: "0 16px",
    color: "#000",
    fontSize: 18,
    lineHeight: "29px",
    whiteSpace: "pre-wrap",
  },
  imageWrapper: {
    marginBottom: 16,
    width: "100%",
    minHeight: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
  },
});
