"use client";

import { ChevronRightIcon, TargetIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/libs/utils";
import { Button, buttonVariants } from "./ui/button";

export interface Route {
  pathname: string;
  title: string;
}

export const routes = [
  {
    pathname: "/",
    title: "서비스 관리",
  },
  {
    pathname: "/test",
    title: "테스트",
  },
] satisfies Route[];

export interface BaseLayoutProps {
  children?: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const pathname = usePathname();
  const currentRoute = routes.find((route) =>
    pathname === "/"
      ? route.pathname === pathname
      : route.pathname.startsWith(pathname),
  );

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center h-20 px-12 py-5">
          <Button variant="ghost" size="icon">
            <TargetIcon className="h-7 w-7" />
          </Button>
          <div className="ml-auto">
            <Button variant="ghost">로그아웃</Button>
          </div>
        </div>
      </header>
      <aside className="fixed left-0 top-20 bottom-0 w-[220px] border-r">
        <nav className="grid gap-1 py-8 px-6">
          {routes.map((route, index) => {
            const isActive = route.pathname === currentRoute?.pathname;

            return (
              <Link
                key={index}
                href={route.pathname}
                className={cn(
                  buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    size: "default",
                  }),
                  "justify-start",
                )}
              >
                {route.title}
                {isActive && <ChevronRightIcon className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="ml-[220px] mt-20 px-6 py-8 pb-[126px]">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">
            {currentRoute?.title ?? "제목"}
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}
