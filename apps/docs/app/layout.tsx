import { RootProvider } from "fumadocs-ui/provider";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { meta } from "@rehooks/utils";
import type { Metadata } from "next";
import "./global.css";

export const metadata = {
  ...meta,
} satisfies Metadata;

const jetbrains = JetBrains_Mono({
  fallback: [
    "-apple-system",
    "monospace",
    "Consolas",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ],
  adjustFontFallback: true,
  subsets: ["latin"],
  preload: true,
  variable: "--font-mono",
});

const inter = Inter({
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ],
  adjustFontFallback: true,
  subsets: ["latin"],
  preload: true,
  variable: "--font-sans",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="dark:selection:text-fd-foreground selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-800">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
