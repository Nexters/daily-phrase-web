import { LayoutOption, LayoutRoute } from "./base-layout.type";

const layoutRoutes = [
  {
    pathname: "/",
    title: "서비스 관리",
  },
  {
    pathname: "/test",
    title: "테스트",
  },
] satisfies LayoutRoute[];

const layoutOptions: LayoutOption[] = [
  { pathname: "/login", hasSidebar: false },
];

const defaultLayoutOption: Omit<LayoutOption, "pathname"> = {
  hasHeader: true,
  hasSidebar: true,
};

export { layoutRoutes, layoutOptions, defaultLayoutOption };
