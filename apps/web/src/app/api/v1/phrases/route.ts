import { apis } from "~/apis";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const data = await apis.phraseApi.getPhraseList(4);

  return Response.json({ data });
}
