import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "NEXUS AI Receptionist - Onboarding",
  description: "Set up your AI receptionist in minutes",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {children}
    </div>
  );
}