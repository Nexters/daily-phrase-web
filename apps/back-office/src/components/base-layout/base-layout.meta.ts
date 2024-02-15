import { LayoutRoute } from "./base-layout.type";

export const authRoutes = [
  {
    pathname: "/",
    title: "서비스 관리",
  },
  {
    pathname: "/example",
    title: "예시",
  },
] satisfies LayoutRoute[];
