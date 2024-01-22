import * as stylex from "@stylexjs/stylex";
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
      <body {...stylex.props()}>{children}</body>
    </html>
  );
}
