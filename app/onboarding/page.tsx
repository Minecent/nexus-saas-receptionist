"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingIndexPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      // Check onboarding progress
      const { data } = await supabase
        .from("user_onboarding")
        .select("current_step, is_completed")
        .eq("user_id", user.id)
        .single();

      if (data?.is_completed) {
        // Already completed onboarding, redirect to dashboard
        router.push("/dashboard");
      } else if (data?.current_step) {
        // Resume from where they left off
        const steps = [
          "/onboarding/train-agent",
          "/onboarding/business-details",
          "/onboarding/select-voice",
          "/onboarding/agent-settings",
          "/onboarding/select-plan",
          "/onboarding/phone-number",
        ];
        router.push(steps[data.current_step - 1] || "/onboarding/train-agent");
      } else {
        // New user, start onboarding
        router.push("/onboarding/train-agent");
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      router.push("/onboarding/train-agent");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return null;
}