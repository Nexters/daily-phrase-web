import { apis } from "~/apis";

export async function GET(request: Request) {
  const data = await apis.adminApi.getPhraseList(3);

  return Response.json({ data });
}
