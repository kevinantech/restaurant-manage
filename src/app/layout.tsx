import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bistro",
};

const fontFamily = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${fontFamily.className} h-full`}>{children}</body>
    </html>
  );
}
