import { apis } from "~/apis";
import PhraseContent from "~/components/phrase-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PhraseWebviewPage({
  params,
}: {
  params: { phraseId: string };
}) {
  const res = await apis.phraseApi.getPhrase(params.phraseId);
  const phrase = res.result;

  return (
    <main>
      <PhraseContent phrase={phrase} />
    </main>
  );
}
