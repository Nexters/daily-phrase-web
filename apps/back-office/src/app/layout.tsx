import BaseLayout from "~/components/base-layout";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-background font-sans antialiased">
        <BaseLayout>{children}</BaseLayout>
        <Toaster />
      </body>
    </html>
  );
}
