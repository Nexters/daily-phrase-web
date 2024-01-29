"use client";

import { ChevronRightIcon, TargetIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "~/libs/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  defaultLayoutOption,
  layoutOptions,
  layoutRoutes,
} from "./base-layout.meta";
import useLayoutPathname from "./hooks";

export interface BaseLayoutProps {
  children?: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const { hasHeader, hasSidebar, currentRoute } = useLayoutPathname(
    layoutRoutes,
    { layoutOptions, defaultLayoutOption },
  );

  return (
    <div className="relative flex min-h-screen flex-col">
      {hasHeader && (
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
      )}

      {hasSidebar && (
        <aside className="fixed left-0 top-20 bottom-0 w-[220px] border-r">
          <nav className="grid gap-1 py-8 px-6">
            {layoutRoutes.map((route, index) => {
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
      )}

      <main
        className={`${hasSidebar ? "ml-[220px]" : ""} ${
          hasHeader ? "mt-20" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}