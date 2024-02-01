"use client";

import { usePathname } from "next/navigation";
import { LayoutRoute } from "../base-layout.type";

const useLayoutPathname = (layoutRoutes: Array<LayoutRoute>) => {
  const pathname = usePathname();
  const currentRoute = layoutRoutes.find((route) =>
    pathname === "/"
      ? route.pathname === pathname
      : route.pathname.startsWith(pathname),
  );

  return { currentRoute };
};

export default useLayoutPathname;
