export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.API_URL}/api/admin/login`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}
