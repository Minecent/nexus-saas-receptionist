import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusconsultancy.app"),
  title: {
    default: "AI Receptionist for Businesses of Every Size — 24/7/365 Call Answering",
    template: "%s | NEXUS AI",
  },
  description:
    "NEXUS answers every business call 24/7/365, books appointments, takes messages, and qualifies leads. AI receptionist starting at $25/month. Keep your existing number. Live in 48 hours.",
  keywords: [
    "AI receptionist",
    "virtual receptionist",
    "24/7/365 call answering",
    "AI phone answering service",
    "appointment booking",
    "missed call solution",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexusconsultancy.app",
    siteName: "NEXUS AI",
    title: "NEXUS AI — AI Receptionist for Businesses of Every Size",
    description:
      "24/7/365 AI phone answering for businesses of every size. Books appointments, takes messages, qualifies leads. From $25/month — no contracts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS AI — AI Receptionist for Businesses of Every Size",
    description:
      "24/7/365 AI phone answering for businesses of every size. Books appointments, takes messages, qualifies leads. From $25/month.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
