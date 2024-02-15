import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN } from "~/apis/config/cookie/token";

export async function POST(request: Request) {
  const accessToken = getCookie(ACCESS_TOKEN, { cookies });
  if (!accessToken) {
    return redirect("/login");
  }

  const body = await request.json();

  const formData = new FormData();
  const imageFile = await base64toFile(body.src, body.filename);
  formData.append("image", imageFile);

  // TODO: API 500 에러 대응하기
  console.log(imageFile);

  const res = await fetch(`${process.env.API_URL}/api/admin/phrases/upload`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  console.log(data);

  return Response.json(data);
}

async function base64toFile(base_data: string, filename: string) {
  const arr = base_data.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
