import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN } from "~/apis/config/cookie/token";
import BaseLayout from "~/components/base-layout";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  if (!getCookie(ACCESS_TOKEN, { cookies })) {
    return redirect("/login");
  }

  return <BaseLayout>{children}</BaseLayout>;
}
