import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

const onest = Onest({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
