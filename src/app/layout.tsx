import type { Metadata } from "next";

import Link from "next/link"
import "./globals.css";



export const metadata: Metadata = {
  title: "Marketplace",
  description: "Generic marketplace for buying and selling stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <strong>WE ARE HOT SAUCE</strong>
          <nav>
            <Link href="/"> Home </Link>
            <Link href="/login"> Login </Link>
            <Link href="/register"> Register </Link>
            <Link href="/sauces"> Sauces </Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}