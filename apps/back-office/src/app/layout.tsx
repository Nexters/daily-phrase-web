import { cookies } from "next/headers";
import AdminLayout from "~/components/admin-layout";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/libs/utils";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <html lang="ko">
      <body className={cn(" min-h-screen bg-background font-sans antialiased")}>
        <AdminLayout
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
        >
          {children}
        </AdminLayout>
        <Toaster />
      </body>
    </html>
  );
}
