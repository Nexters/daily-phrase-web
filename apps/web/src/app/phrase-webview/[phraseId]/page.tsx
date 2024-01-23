import * as stylex from "@stylexjs/stylex";
import PhraseContent from "~/components/phrase-content";
import { globalStyles } from "~/styles/globals.stylex";

export default function PhraseWebviewPage() {
  return (
    <main {...stylex.props(globalStyles.container)}>
      <PhraseContent />
    </main>
  );
}

const styles = stylex.create({});
