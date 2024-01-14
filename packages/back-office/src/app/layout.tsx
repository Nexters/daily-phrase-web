import '~/styles/globals.css';
import { cn } from '~/libs/utils';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={cn('container min-h-screen bg-background font-sans antialiased')}>
        {children}
      </body>
    </html>
  );
}
