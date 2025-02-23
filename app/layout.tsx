import { Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './_providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Bistro',
};

const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${openSans.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
