"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/cookie/token";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    router.push("/login");
  };

  return { logout };
};

export default useLogout;
