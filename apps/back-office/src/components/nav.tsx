"use client";

import { ChevronRightIcon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "~/libs/utils";
import { buttonVariants } from "./ui/button";

export interface NavProps {
  links: {
    title: string;
    pathname: string;
    icon?: LucideIcon;
    isActive?: boolean | undefined;
  }[];
}

export default function Nav({ links }: NavProps) {
  return (
    <nav className="grid gap-1 py-8 px-6">
      {links.map((link, index) => {
        const variant = link.isActive ? "secondary" : "ghost";

        return (
          <Link
            key={index}
            href={link.pathname}
            className={cn(
              buttonVariants({ variant, size: "default" }),
              "justify-start",
            )}
          >
            {link.title}
            {link.isActive && <ChevronRightIcon className="ml-auto h-4 w-4" />}
          </Link>
        );
      })}
    </nav>
  );
}
