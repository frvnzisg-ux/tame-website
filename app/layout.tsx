import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import AnalyticsProvider from "./analytics-provider";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Fraunces({
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tamelife.app"),
  title: "Tame | Life Operating System",
  description:
    "Tame is a Life OS that helps people organize tasks, goals, and habits into calm daily clarity.",
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Tame",
    "life operating system",
    "expense tracking",
    "subscription management",
    "bill reminders",
    "life admin"
  ],
  openGraph: {
    title: "Tame | Life Operating System",
    description:
      "Money plus life admin in one clear system. Track expenses, subscriptions, documents, benefits, and deadlines.",
    url: "https://www.tamelife.app",
    siteName: "Tame",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tame | Life Operating System",
    description:
      "Money plus life admin in one clear system. Track expenses, subscriptions, documents, benefits, and deadlines."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
