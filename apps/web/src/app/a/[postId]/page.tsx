import * as stylex from "@stylexjs/stylex";
import PostContent from "~/components/post-content";
import { globalStyles } from "~/styles/globals.style";

export default function AppContentPage() {
  return (
    <main {...stylex.props(globalStyles.container)}>
      <PostContent />
    </main>
  );
}

const styles = stylex.create({});
