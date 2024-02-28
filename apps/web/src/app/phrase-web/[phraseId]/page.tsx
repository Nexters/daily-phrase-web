import { apis } from "~/apis";
import AppDownloadModal from "~/components/app-download-modal";
import AppFooter from "~/components/app-footer";
import GoAppCard from "~/components/go-app-card";
import PhraseContent from "~/components/phrase-content";
import Separator from "~/components/ui/separator";
import PhraseList from "./phrase-list";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PhraseWebPage({
  params,
}: {
  params: { phraseId: string };
}) {
  const res = await apis.phraseApi.getPhrase(params.phraseId);
  const phrase = res.result;

  return (
    <main className="pb-[90px]">
      <PhraseContent phrase={phrase} />
      <Separator />
      <PhraseList currentPhraseId={params.phraseId} />
      <Separator />
      <GoAppCard />
      <AppFooter />
      <AppDownloadModal />
    </main>
  );
}
