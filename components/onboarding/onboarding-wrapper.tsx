"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { OnboardingProgress } from "./onboarding-progress";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface OnboardingWrapperProps {
  children: ReactNode;
  currentStep: number;
  stepTitle: string;
  stepDescription: string;
  showBack?: boolean;
  onNext?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export function OnboardingWrapper({
  children,
  currentStep,
  stepTitle,
  stepDescription,
  showBack = true,
  onNext,
  isNextDisabled = false,
  nextLabel = "Continue",
}: OnboardingWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>(null);

  useEffect(() => {
    // Load onboarding progress
    const loadOnboarding = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("user_onboarding")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setOnboardingData(data);
    };

    loadOnboarding();
  }, [supabase, router]);

  const handleBack = () => {
    const steps = [
      "/onboarding/train-agent",
      "/onboarding/business-details",
      "/onboarding/select-voice",
      "/onboarding/agent-settings",
      "/onboarding/select-plan",
      "/onboarding/phone-number",
    ];
    
    if (currentStep > 1) {
      router.push(steps[currentStep - 2]);
    } else {
      router.push("/");
    }
  };

  const handleNext = async () => {
    if (onNext) {
      onNext();
      return;
    }

    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Update onboarding progress
      const completedSteps = onboardingData?.completed_steps || [];
      if (!completedSteps.includes(currentStep)) {
        completedSteps.push(currentStep);
      }

      const { error } = await supabase
        .from("user_onboarding")
        .upsert({
          user_id: user.id,
          current_step: currentStep + 1,
          completed_steps: completedSteps,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (error) {
        console.error("Error updating onboarding progress:", error);
      }

      // Navigate to next step
      const steps = [
        "/onboarding/train-agent",
        "/onboarding/business-details",
        "/onboarding/select-voice",
        "/onboarding/agent-settings",
        "/onboarding/select-plan",
        "/onboarding/phone-number",
      ];

      if (currentStep < 6) {
        router.push(steps[currentStep]);
      } else {
        // Onboarding complete - redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress indicator */}
      <OnboardingProgress currentStep={currentStep} />

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        {/* Step header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{stepTitle}</h1>
          <p className="text-slate-400">{stepDescription}</p>
        </div>

        {/* Form content */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8">
          {children}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8">
          {showBack ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="text-slate-400 hover:text-white"
            >
              ← Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled || isLoading}
            className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold px-8"
          >
            {isLoading ? "Saving..." : nextLabel}
            {!isLoading && " →"}
          </Button>
        </div>
      </div>
    </div>
  );
}