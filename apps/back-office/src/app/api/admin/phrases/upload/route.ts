export async function POST(request: Request) {
  const body = await request.json();
  const accessToken =
    "eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJEYWlseVBocmFzZSIsImlhdCI6MTcwNzQ4NjYyOSwic3ViIjoiMSIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTcwNzQ5MDIyOX0.TJ9EpjQ2NWSMla6hJOmg5hV6Y_pOBpHiZDjBaPHtGRlnM6SKObBig45TVB6MTetT";

  const formData = new FormData();
  const imageFile = await base64toFile(body.src, body.filename);
  formData.append("image", imageFile);

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
