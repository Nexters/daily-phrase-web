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

function proxy(method: string) {
  return async (
    request: Request,
    { params }: { params: { slug: string[] } },
  ) => {
    const accessToken = getCookie(ACCESSTOKEN, { cookies });

    if (!accessToken) {
      return redirect("/login");
    }

    const searchParams = new URL(request.url).searchParams.toString();
    const body = method === "DELETE" ? {} : await request.json();
    const slug = params.slug.join("/");

    try {
      const res = await fetch(
        `${process.env.API_URL}/api/${slug}${searchParams}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method,
          body: JSON.stringify(body),
        },
      );
      const data = await res.json();

      if (!data.isSuccess) {
        return Response.json(data, { status: data.status });
      }

      return Response.json(data);
    } catch (e) {
      console.log(e);

      if (e instanceof Error) {
        return Response.json({ message: e.message }, { status: 400 });
      }

      return Response.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
  };
}

export const POST = proxy("POST");
export const PUT = proxy("PUT");
export const DELETE = proxy("DELETE");
