import * as stylex from "@stylexjs/stylex";
import { apis } from "~/apis";
import AppDownloadModal from "~/components/app-download-modal";
import AppFooter from "~/components/app-footer";
import GoAppCard from "~/components/go-app-card";
import PhraseContent from "~/components/phrase-content";
import { globalStyles } from "~/styles/globals.stylex";
import PhraseList from "./phrase-list";

export default async function PhraseWebPage({
  params,
}: {
  params: { phraseId: string };
}) {
  const res = await apis.adminApi.getPhrase(params.phraseId);
  const phrase = res.result;

  return (
    <main {...stylex.props(globalStyles.container, styles.container)}>
      <PhraseContent phrase={phrase} />
      <div {...stylex.props(globalStyles.separator)} />
      <PhraseList />
      <div {...stylex.props(globalStyles.separator)} />
      <GoAppCard />
      <AppFooter />
      <AppDownloadModal />
    </main>
  );
}

const styles = stylex.create({
  container: {
    paddingBottom: 90,
  },
});
