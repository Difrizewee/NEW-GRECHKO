import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const _inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const _playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "OceanDelux — Премиальные морепродукты с доставкой по России",
  description:
    "Форель, креветки, икра, осетрина — свежие премиальные морепродукты с доставкой по Москве и всей России. Контроль качества, термоупаковка, холодовая цепь.",
  keywords:
    "морепродукты, доставка, Москва, Россия, форель, креветки, икра, осетрина, премиум",
};

export const viewport: Viewport = {
  themeColor: "#0c1a2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
