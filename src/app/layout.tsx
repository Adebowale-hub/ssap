import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSAP — Minimalist Event Tickets",
  description: "Create events, share ticket passes, and manage check-ins with an effortless iPhone experience.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased bg-black`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
