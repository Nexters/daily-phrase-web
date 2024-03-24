import { Metadata, ResolvingMetadata } from "next";
import { apis } from "~/apis";
import PhraseContent from "~/components/phrase-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: { phraseId: string };
}

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.phraseId;
  const res = await apis.phraseApi.getPhrase(id);
  const phrase = res.result;

  const url = `https://www.daily-phrase.com/phrase-webview/${id}`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: phrase.title,
    description: phrase.content,
    openGraph: {
      title: phrase.title,
      images: [...previousImages, phrase.imageUrl],
      description: phrase.content,
      url,
    },
    twitter: {
      title: phrase.title,
      images: [...previousImages, phrase.imageUrl],
      description: phrase.content,
    },
  };
}
