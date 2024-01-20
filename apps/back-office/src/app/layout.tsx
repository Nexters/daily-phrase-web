import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/libs/utils";
import "~/styles/globals.css";

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body
				className={cn(
					"container min-h-screen bg-background font-sans antialiased",
				)}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
