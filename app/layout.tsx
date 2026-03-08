import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tamelife.app"),
  title: "Tame | Life Operating System",
  description:
    "Tame is a Life Operating System for money and modern life admin: expenses, subscriptions, documents, benefits, and deadlines in one calm dashboard.",
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
    url: "https://tamelife.app",
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
      </body>
    </html>
  );
}
