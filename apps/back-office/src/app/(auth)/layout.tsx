import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESSTOKEN } from "~/apis/config/cookie/token";
import BaseLayout from "~/components/base-layout";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  if (!getCookie(ACCESSTOKEN, { cookies })) {
    return redirect("/login");
  }

  return <BaseLayout>{children}</BaseLayout>;
}
