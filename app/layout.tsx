import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"; // ✨ font optimization

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeliverX",
  description: "10 minutes DeliverX app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full min-h-screen bg-gradient-to-b from-teal-100 to-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
