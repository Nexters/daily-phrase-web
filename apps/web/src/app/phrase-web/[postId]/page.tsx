import * as stylex from "@stylexjs/stylex";
import AppFooter from "~/components/app-footer";
import GoAppCard from "~/components/go-app-card";
import PhraseCard from "~/components/phrase-card";
import PhraseContent from "~/components/phrase-content";
import { globalStyles } from "~/styles/globals.stylex";

export default function PhrasePage() {
  const phraseList = [...Array(3)];

  return (
    <main {...stylex.props(globalStyles.container, styles.container)}>
      <PhraseContent />
      <div {...stylex.props(globalStyles.separator)} />
      <h3 {...stylex.props(styles.listTitle)}>오늘의 글귀</h3>
      <div {...stylex.props(styles.listWrapper)}>
        {phraseList.map((_, i) => {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <PhraseCard key={i} style={i > 0 && styles.listItemBorderTop} />
          );
        })}
      </div>
      <div {...stylex.props(globalStyles.separator)} />
      <GoAppCard />
      <AppFooter />
    </main>
  );
}

const styles = stylex.create({
  container: {
    paddingBottom: 90,
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
