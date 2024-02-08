import { apis } from "~/apis";

export async function GET(request: Request) {
  const data = await apis.phraseApi.getPhraseList();

  return Response.json({ data });
}
