import { apis } from "~/apis";
import PhraseContent from "~/components/phrase-content";

export default async function PhraseWebviewPage({
  params,
}: {
  params: { phraseId: string };
}) {
  const res = await apis.adminApi.getPhrase(params.phraseId);
  const phrase = res.result;

  return (
    <main>
      <PhraseContent phrase={phrase} />
    </main>
  );
}
