import * as stylex from "@stylexjs/stylex";
import { globalStyles } from "~/styles/globals.style";

export default function HomePage() {
  return (
    <main {...stylex.props(globalStyles.container, styles.container)}>
      <h1 style={{ marginBottom: 8 }}>매일 글귀</h1>
      <p>좋은 시, 좋은 명언, 좋은 말 모음</p>
    </main>
  );
}

const styles = stylex.create({
  container: {
    padding: "40px 16px",
  },
});
