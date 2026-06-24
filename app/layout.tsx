import type { Metadata } from "next";
import Link from "next/link";
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
  title: {
    template: "%s | PropView",
    default: "PropView - Find Your Perfect Property",
  },
  description:
    "Browse our curated collection of properties for sale. Find your dream home, apartment, or investment property.",
  keywords: [
    "real estate",
    "properties",
    "homes for sale",
    "apartments",
    "realty",
  ],
  openGraph: {
    title: "PropView - Find Your Perfect Property",
    description:
      "Browse our curated collection of properties for sale. Find your dream home, apartment, or investment property.",
    siteName: "PropView",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              PropView
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4 text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} PropView. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
