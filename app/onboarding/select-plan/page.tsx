"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  callsIncluded: number;
  perExtraCall: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 24.95,
    period: "month",
    callsIncluded: 30,
    perExtraCall: 1.0,
    description: "Perfect for small businesses just getting started",
    features: [
      "30 calls included per month",
      "$1.00 per extra call",
      "24/7 call answering",
      "Message taking & delivery",
      "Email summaries",
      "1-year call history",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 59.95,
    period: "month",
    callsIncluded: 90,
    perExtraCall: 0.75,
    description: "Best for growing service businesses",
    popular: true,
    features: [
      "90 calls included per month",
      "$0.75 per extra call",
      "Everything in Starter",
      "SMS notifications",
      "Slack integration",
      "Advanced routing",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 159.95,
    period: "month",
    callsIncluded: 300,
    perExtraCall: 0.5,
    description: "For high-volume operations",
    features: [
      "300 calls included per month",
      "$0.50 per extra call",
      "Everything in Premium",
      "Priority support",
      "Call recordings (30 days)",
      "Custom workflows",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    period: "custom",
    callsIncluded: 0,
    perExtraCall: 0,
    description: "For large organizations with custom needs",
    features: [
      "Unlimited calls",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "Advanced analytics",
      "On-premise options",
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
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("agent_config")
        .select("selected_plan")
        .eq("user_id", user.id)
        .single();

      if (data?.selected_plan) {
        setSelectedPlan(data.selected_plan);
      }
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

      const selectedPlanData = plans.find(p => p.id === selectedPlan);
      
      const { error } = await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          selected_plan: selectedPlan,
          plan_details: selectedPlanData ? {
            name: selectedPlanData.name,
            price: selectedPlanData.price,
            calls_included: selectedPlanData.callsIncluded,
            per_extra_call: selectedPlanData.perExtraCall,
          } : {},
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (error) {
        console.error("Error saving config:", error);
        return;
      }

      // Also create/update subscription record
      if (selectedPlan !== "enterprise") {
        const plan = plans.find(p => p.id === selectedPlan);
        if (plan) {
          await supabase
            .from("subscription")
            .upsert({
              user_id: user.id,
              plan: plan.id,
              price: plan.price,
              calls_included: plan.callsIncluded,
              status: "active",
              billing_cycle: "monthly",
            }, {
              onConflict: "user_id",
            });
        }
      }

      // Update onboarding progress
      await updateOnboardingProgress(user.id, 5);
      
      router.push("/onboarding/phone-number");
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
    if (!completedSteps.includes(step)) {
      completedSteps.push(step);
    }

    await supabase
      .from("user_onboarding")
      .upsert({
        user_id: userId,
        current_step: step + 1,
        completed_steps: completedSteps,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "user_id",
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <OnboardingWrapper
      currentStep={5}
      stepTitle="Select Plan"
      stepDescription="Choose the plan that fits your business needs"
      onNext={handleSave}
      isNextDisabled={isSaving || !selectedPlan}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-6">
        <p className="text-slate-400 text-sm text-center">
          All plans include 24/7 call answering, message delivery, and appointment booking. 
          Choose based on your expected call volume.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all relative ${
                selectedPlan === plan.id
                  ? "border-teal-500 bg-teal-500/10"
                  : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
              } ${plan.popular ? "md:col-span-1" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-500 text-slate-900 text-xs font-semibold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {plan.id === "enterprise" ? (
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-white">Custom</div>
                    <div className="text-sm text-slate-500">Contact for pricing</div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="text-slate-500">/{plan.period}</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {plan.callsIncluded} calls included
                    </div>
                  </div>
                )}
                
                <ul className="space-y-2 mb-4">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-teal-500">✓</span>
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs text-slate-500">
                      +{plan.features.length - 4} more features
                    </li>
                  )}
                </ul>

                {plan.id !== "enterprise" && (
                  <div className="text-xs text-slate-500">
                    ${plan.perExtraCall}/extra call
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
            <p className="text-teal-400 text-sm font-medium text-center">
              ✓ Selected: {plans.find(p => p.id === selectedPlan)?.name}
              {selectedPlan === "enterprise" && " - Contact sales for custom pricing"}
            </p>
          </div>
        )}

        {/* Comparison note */}
        <div className="text-center text-xs text-slate-500 mt-4">
          <p>Compare to hiring a full-time receptionist: $3,200+/month</p>
          <p>All plans are billed monthly. Cancel anytime.</p>
        </div>
      </div>
    </OnboardingWrapper>
  );
}