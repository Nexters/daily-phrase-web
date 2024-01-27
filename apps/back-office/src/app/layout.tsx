import BaseLayout from "~/components/base-layout";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/libs/utils";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className={cn("bg-background font-pretendard antialiased")}>
        <BaseLayout>{children}</BaseLayout>
        <Toaster />
      </body>
    </html>
  );
}
