import * as stylex from "@stylexjs/stylex";
import AppFooter from "~/components/app-footer";
import PostContent from "~/components/post-content";
import { globalStyles } from "~/styles/globals.style";
import GoAppCard from "./go-app-card";
import PostCard from "./post-card";

export default function PostPage() {
  const postList = [...Array(3)];

  return (
    <main {...stylex.props(globalStyles.container, styles.container)}>
      <PostContent />
      <div {...stylex.props(globalStyles.separator)} />
      <h3 {...stylex.props(styles.listTitle)}>오늘의 글귀</h3>
      <div {...stylex.props(styles.listWrapper)}>
        {postList.map((_, i) => {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <PostCard key={i} style={i > 0 && styles.listItemBorderTop} />
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
