import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const fontTitle = Geist({
  variable: "--font-title",
  subsets: ["latin"],
});

const fontText = Inter({
  variable: "--font-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rate My Caffeine - Find Remote Friendly Cafes",
  description:
    "Your gateway to higher productivity, get more done in a day. FInd cozy and quite cafes with one click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontTitle.variable} ${fontText.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
