"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, label: "Train Agent", path: "/onboarding/train-agent" },
  { number: 2, label: "Business Details", path: "/onboarding/business-details" },
  { number: 3, label: "Select Voice", path: "/onboarding/select-voice" },
  { number: 4, label: "Agent Setup", path: "/onboarding/agent-customization" },
  { number: 5, label: "Agent Settings", path: "/onboarding/agent-settings" },
  { number: 6, label: "Select Plan", path: "/onboarding/select-plan" },
  { number: 7, label: "Phone Number", path: "/onboarding/phone-number" },
];

export function OnboardingProgress({ currentStep, totalSteps = 7 }: OnboardingProgressProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleStepClick = (stepNumber: number) => {
    // Only allow clicking on completed steps or the current step
    if (stepNumber <= currentStep) {
      const step = steps.find(s => s.number === stepNumber);
      if (step) {
        router.push(step.path);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = step.number <= currentStep;

          return (
            <div key={step.number} className="flex items-center">
              {/* Step circle */}
              <button
                onClick={() => handleStepClick(step.number)}
                disabled={!isClickable}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300",
                  isCompleted && "bg-teal-500 text-white cursor-pointer hover:bg-teal-400",
                  isCurrent && "bg-white text-slate-900 ring-4 ring-teal-500/30",
                  !isCompleted && !isCurrent && "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                )}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </button>

              {/* Step label - hide on mobile */}
              <span
                className={cn(
                  "hidden md:block ml-2 text-xs font-medium whitespace-nowrap",
                  isCompleted && "text-teal-400",
                  isCurrent && "text-white",
                  !isCompleted && !isCurrent && "text-slate-500"
                )}
              >
                {step.label}
              </span>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "hidden md:block w-12 lg:w-20 h-0.5 mx-2 transition-colors duration-300",
                    step.number < currentStep ? "bg-teal-500" : "bg-slate-700"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { steps as onboardingSteps };