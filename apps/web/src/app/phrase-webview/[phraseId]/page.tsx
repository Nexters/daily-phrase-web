import * as stylex from "@stylexjs/stylex";
import { apis } from "~/apis";
import PhraseContent from "~/components/phrase-content";
import { globalStyles } from "~/styles/globals.stylex";

export default async function PhraseWebviewPage({
  params,
}: {
  params: { phraseId: string };
}) {
  const res = await apis.adminApi.getPhrase(params.phraseId);
  const phrase = res.result;

  return (
    <main {...stylex.props(globalStyles.container)}>
      <PhraseContent phrase={phrase} />
    </main>
  );
}

const styles = stylex.create({});
