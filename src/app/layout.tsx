import ThemeCustomization from '@/theme';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Restaurant Management',
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
        <ThemeCustomization>{children}</ThemeCustomization>
      </body>
    </html>
  );
}
