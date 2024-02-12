import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESSTOKEN } from "~/apis/config/cookie/token";

export default function Layout({ children }: React.PropsWithChildren) {
  if (getCookie(ACCESSTOKEN, { cookies })) {
    return redirect("/");
  }

  return (
    <div className="absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4 w-[425px] m-auto p-6 rounded-lg border-[1px] border-slate-300">
      {children}
    </div>
  );
}
