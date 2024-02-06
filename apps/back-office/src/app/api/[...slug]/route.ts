export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const searchParams = new URL(request.url).searchParams.toString();
  const slug = params.slug.join("/");

  const res = await fetch(`${process.env.API_URL}/api/${slug}${searchParams}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  const data = res.json();

  return Response.json(data);
}
