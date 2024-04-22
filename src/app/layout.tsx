import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Hydrated from "./_hydration/Hydrated";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zustand basic concepts for beginners",
  description:
    "pre-built UI components to help you create stunning websites in no time. With bardui...",
  keywords: ["zustand", "zustand-todo", "nextjs@latest", "imran-baitham"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hydrated>{children}</Hydrated>
      </body>
    </html>
  );
}
