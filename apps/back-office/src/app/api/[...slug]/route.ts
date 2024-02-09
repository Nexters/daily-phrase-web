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
  const data = await res.json();

  return Response.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const accessToken =
    "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJEYWlseVBocmFzZSIsImlhdCI6MTcwNzQ4NTU3MSwic3ViIjoiMSIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTcwNzQ4OTE3MX0.-75m8VnRp4SWmqDHaf0zYwsXjXCMwT0NwTrL-Q5iuIE9HpvT42i_0Z-xfpVv91tu";
  const searchParams = new URL(request.url).searchParams.toString();
  const body = await request.json();
  const slug = params.slug.join("/");

  const res = await fetch(`${process.env.API_URL}/api/${slug}${searchParams}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return Response.json(data);
}
