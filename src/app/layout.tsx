import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bristo",
};

const fontFamily = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fontFamily.className}`}>{children}</body>
    </html>
  );
}
