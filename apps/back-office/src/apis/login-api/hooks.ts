"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apis } from "..";
import { ACCESSTOKEN, REFRESHTOKEN } from "../config/cookie/token";

const useLogout = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => apis.loginApi.logout(),
  });

  const logout = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
        deleteCookie(ACCESSTOKEN);
        deleteCookie(REFRESHTOKEN);
      },
      onError: () => {
        toast.error("로그아웃에 실패했습니다.");
      },
    });
  };

  return { logout, isPending };
};

export default useLogout;
