import { LayoutRoute } from "./base-layout.type";

export const authRoutes = [
  {
    pathname: "/",
    title: "서비스 관리",
  },
  {
    pathname: "/test",
    title: "테스트",
  },
] satisfies LayoutRoute[];
