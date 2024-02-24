import type { Metadata } from "next";
import Script from "next/script";
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
        <Script strategy="lazyOnload" id="clarity-script" crossOrigin="">
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.CLARITY_KEY}");
        `}
        </Script>
      </head>
      <body className="container h-lvh">{children}</body>
    </html>
  );
}
