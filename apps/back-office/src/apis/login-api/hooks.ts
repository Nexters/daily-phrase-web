"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ACCESSTOKEN, REFRESHTOKEN } from "../config/cookie/token";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie(ACCESSTOKEN);
    deleteCookie(REFRESHTOKEN);
    router.push("/login");
  };

  return { logout };
};

export default useLogout;
