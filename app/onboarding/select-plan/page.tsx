"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { createClient } from "@/lib/supabase/client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "lite",
    name: "Lite",
    price: "$25",
    period: "/mo",
    volume: "30 calls / 90 minutes",
    overage: "No overage — upgrade to continue",
    badge: null,
    highlight: false,
    description: "Solo businesses just getting started",
    features: [
      "30 calls / 90 minutes",
      "24/7 AI answering",
      "Google Calendar booking",
      "Email & SMS notifications",
      "Forward calls to your phone",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    period: "/mo",
    volume: "150 calls / 450 minutes",
    overage: "+$1.00 per extra call",
    badge: "Most Popular",
    highlight: true,
    description: "Popular with service businesses",
    features: [
      "Everything in Lite, plus:",
      "150 calls / 450 minutes",
      "SMS + email confirmations",
      "Real-time Slack alerts",
      "Call recordings (30 days)",
      "Advanced call routing",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$349",
    period: "/mo",
    volume: "450 calls / 1,350 minutes",
    overage: "+$0.85 per extra call",
    badge: null,
    highlight: false,
    description: "Multi-location businesses & portfolios",
    features: [
      "Everything in Pro, plus:",
      "450 calls / 1,350 minutes",
      "Multi-location call routing",
      "Call recordings (90 days)",
      "1 custom automation workflow",
      "Plug straight into Outlook, Salesforce & HubSpot",
    ],
  },
  {
    id: "custom",
    name: "Custom Build",
    price: "Contact us",
    period: null,
    volume: "Unlimited",
    overage: null,
    badge: "Enterprise",
    highlight: false,
    description: "Complex integrations & high-volume ops",
    features: [
      "Everything in Scale, plus:",
      "Unlimited calls (no overages)",
      "Custom voice persona",
      "Unlimited custom workflows",
      "Dedicated success manager",
      "White-glove setup",
    ],
  },
];

export default function SelectPlanPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  useEffect(() => {
    loadExistingConfig();
  }, []);

  const loadExistingConfig = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase
        .from("agent_config")
        .select("selected_plan")
        .eq("user_id", user.id)
        .single();
      if (data?.selected_plan) setSelectedPlan(data.selected_plan);
    } catch (error) {
      console.error("Error loading config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPlan) return;
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const plan = plans.find(p => p.id === selectedPlan);

      const { error } = await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          selected_plan: selectedPlan,
          plan_details: plan ? { name: plan.name, price: plan.price, volume: plan.volume } : {},
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (error) { console.error("Error saving plan:", error); return; }

      await updateOnboardingProgress(user.id, 6);

      // Custom plan skips checkout — contact sales handles billing
      if (selectedPlan === "custom") {
        router.push("/onboarding/phone-number");
      } else {
        router.push(`/checkout?plan=${selectedPlan}&redirect=/onboarding/phone-number`);
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateOnboardingProgress = async (userId: string, step: number) => {
    const { data } = await supabase
      .from("user_onboarding")
      .select("completed_steps")
      .eq("user_id", userId)
      .single();
    const completedSteps = data?.completed_steps || [];
    if (!completedSteps.includes(step)) completedSteps.push(step);
    await supabase
      .from("user_onboarding")
      .upsert({
        user_id: userId,
        current_step: step + 1,
        completed_steps: completedSteps,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
      </div>
    );
  }

  return (
    <OnboardingWrapper
      currentStep={6}
      stepTitle="Select Your Plan"
      stepDescription="Choose based on your expected call volume. You can upgrade at any time."
      onNext={handleSave}
      isNextDisabled={isSaving || !selectedPlan}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "relative flex flex-col rounded-2xl border p-5 text-left transition-all",
                isSelected
                  ? "border-teal-500 bg-teal-500/5 shadow-lg shadow-teal-500/10"
                  : plan.highlight
                  ? "border-teal-500/40 bg-slate-900 hover:border-teal-500/60"
                  : "border-slate-700 bg-slate-900 hover:border-slate-600"
              )}
            >
              {/* Selection ring */}
              {isSelected && (
                <div className="absolute right-4 top-4 flex size-5 items-center justify-center rounded-full bg-teal-500">
                  <Check className="size-3 text-white" />
                </div>
              )}

              {/* Badge */}
              {plan.badge && (
                <span className={cn(
                  "mb-3 self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  plan.highlight
                    ? "border-teal-500/40 bg-teal-500/10 text-teal-400"
                    : "border-slate-700 bg-slate-800 text-slate-400"
                )}>
                  {plan.badge}
                </span>
              )}

              {/* Name */}
              <p className="mb-2 text-base font-bold text-white">{plan.name}</p>

              {/* Price */}
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-xs text-slate-400">{plan.period}</span>}
              </div>

              <p className={cn("mb-3 text-xs font-semibold", isSelected || plan.highlight ? "text-teal-400" : "text-slate-400")}>
                {plan.volume}
              </p>

              {plan.overage && (
                <p className="mb-3 text-xs text-slate-500">{plan.overage}</p>
              )}

              <p className="mb-4 text-xs text-slate-500 leading-relaxed">{plan.description}</p>

              {/* Features */}
              <ul className="flex flex-col gap-1.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-2 text-xs",
                      f.endsWith(":") ? "mt-1 text-slate-500" : "text-slate-300"
                    )}
                  >
                    {!f.endsWith(":") && (
                      <Check className="mt-0.5 size-3 shrink-0 text-teal-400" />
                    )}
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-slate-600">
        Compare to a full-time receptionist: $3,200+/month &nbsp;&middot;&nbsp; All plans billed monthly &nbsp;&middot;&nbsp; Cancel anytime
      </p>
    </OnboardingWrapper>
  );
}
