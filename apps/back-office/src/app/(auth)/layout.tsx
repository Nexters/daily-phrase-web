import BaseLayout from "~/components/base-layout";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
