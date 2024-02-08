import type { Metadata } from "next";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "매일 글귀 - 좋은 시, 좋은 명언, 좋은 말 모음",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className="container">{children}</body>
    </html>
  );
}
