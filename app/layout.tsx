import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://nexus-saas-receptionist.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Receptionist for Businesses of Every Size — 24/7 Call Answering",
    template: "%s | NEXUS AI Receptionist",
  },
  description:
    "NEXUS answers every business call 24/7, books appointments, takes messages, and qualifies leads. AI receptionist starting at $25/month. Keep your existing number. Live in 48 hours.",
  keywords: [
    "AI receptionist",
    "virtual receptionist",
    "AI phone answering service",
    "24/7 call answering",
    "automated receptionist",
    "business phone answering",
    "AI answering service",
  ],
  authors: [{ name: "NEXUS AI", url: siteUrl }],
  creator: "NEXUS AI",
  publisher: "NEXUS AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NEXUS AI Receptionist",
    title: "NEXUS — AI Receptionist That Never Misses a Call",
    description:
      "24/7 AI phone answering for businesses of every size. Books appointments, takes messages, qualifies leads. From $25/month — no contracts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEXUS AI Receptionist — 24/7 AI phone answering for businesses of every size",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS — AI Receptionist That Never Misses a Call",
    description:
      "24/7 AI phone answering for businesses of every size. Books appointments, takes messages, qualifies leads. From $25/month.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
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
      <head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
