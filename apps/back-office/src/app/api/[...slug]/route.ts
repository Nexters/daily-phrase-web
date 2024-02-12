import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESSTOKEN } from "~/apis/config/cookie/token";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const accessToken = getCookie(ACCESSTOKEN, { cookies });
  if (!accessToken) {
    return redirect("/login");
  }

  const searchParams = new URL(request.url).searchParams.toString();
  const slug = params.slug.join("/");

  const res = await fetch(`${process.env.API_URL}/api/${slug}${searchParams}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();

  return Response.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const accessToken = getCookie(ACCESSTOKEN, { cookies });

  if (!accessToken) {
    return redirect("/login");
  }

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
