import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiery Sauces",
  description: "Marketplace for buying and selling hot sauces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-red-600">
              🌶️ Fiery Sauces
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="transition hover:text-red-600">
                Home
              </Link>

              <Link href="/sauces" className="transition hover:text-red-600">
                Sauces
              </Link>

              <Link href="/login" className="transition hover:text-red-600">
                Login
              </Link>

              <Link href="/register" className="transition hover:text-red-600">
                Register
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
