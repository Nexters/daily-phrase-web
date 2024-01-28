"use client";

import { usePathname } from "next/navigation";
import { LayoutOption, LayoutRoute } from "../base-layout.type";

const getBoolean = (value: boolean | undefined | null, defaultValue: boolean) =>
  typeof value === "boolean" ? value : defaultValue;

const useLayoutPathname = (
  layoutRoutes: Array<LayoutRoute>,
  options: {
    layoutOptions: Array<LayoutOption>;
    defaultLayoutOption: Omit<LayoutOption, "pathname">;
  },
) => {
  const pathname = usePathname();
  const currentRoute = layoutRoutes.find((route) =>
    pathname === "/"
      ? route.pathname === pathname
      : route.pathname.startsWith(pathname),
  );
  const layoutOption =
    options.layoutOptions.find((layout) => layout.pathname === pathname) ||
    options.defaultLayoutOption;
  const hasHeader = getBoolean(layoutOption.hasHeader, true);
  const hasSidebar = getBoolean(layoutOption.hasSidebar, true);

  return { currentRoute, hasHeader, hasSidebar };
};

export default useLayoutPathname;
