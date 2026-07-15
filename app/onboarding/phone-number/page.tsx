"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { createClient } from "@/lib/supabase/client";
import { Mail, PhoneForwarded, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type RoutingPreference = "forward" | "new_number";

const AREA_REGIONS = [
  // Florida
  { region: "fl", label: "Miami (305)",             code: "305" },
  { region: "fl", label: "Miami (786)",             code: "786" },
  { region: "fl", label: "Fort Lauderdale (954)",   code: "954" },
  { region: "fl", label: "Palm Beach (561)",        code: "561" },
  { region: "fl", label: "Tampa (813)",             code: "813" },
  { region: "fl", label: "Orlando (407)",           code: "407" },
  // Cayman
  { region: "ky", label: "Cayman Islands (345)",    code: "345" },
  // Other
  { region: "other", label: "Other (enter manually)", code: "other" },
];

export default function PhoneNumberPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [routing, setRouting] = useState<RoutingPreference | "">("");
  const [areaCode, setAreaCode] = useState("305");
  const [areaRegion, setAreaRegion] = useState("fl-305");  // tracks dropdown selection

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/login"); return; }

        const { data } = await supabase
          .from("agent_config")
          .select("selected_plan, phone_routing_preference, preferred_area_code")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setSelectedPlan(data.selected_plan || "");
          setRouting((data.phone_routing_preference as RoutingPreference) || "");
          const saved = data.preferred_area_code || "305";
          setAreaCode(saved);
          // Restore region selector state from saved area code
          const knownRegion = AREA_REGIONS.find(r => r.code === saved && r.code !== "other");
          setAreaRegion(knownRegion ? `${knownRegion.region}-${knownRegion.code}` : "other");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const isLite = selectedPlan === "lite" || selectedPlan === "starter" || selectedPlan === "";

  const completeOnboarding = async (routingPref?: RoutingPreference) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updatePayload: Record<string, unknown> = { user_id: user.id, updated_at: new Date().toISOString() };
      if (routingPref) updatePayload.phone_routing_preference = routingPref;
      if (routingPref === "new_number") updatePayload.preferred_area_code = areaCode || "305";
      await supabase.from("agent_config").upsert(updatePayload, { onConflict: "user_id" });

      const { data } = await supabase.from("user_onboarding").select("completed_steps").eq("user_id", user.id).single();
      const steps = Array.isArray(data?.completed_steps) ? data.completed_steps : [];
      if (!steps.includes(7)) steps.push(7);

      await supabase.from("user_onboarding").upsert(
        { user_id: user.id, current_step: 7, completed_steps: steps, is_completed: true, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

      // Fetch config once — used for the admin alert and calendar provisioning below
      const { data: cfg } = await supabase.from("agent_config")
        .select("business_name, selected_plan, phone_number, vapi_assistant_id, business_email, notification_email, timezone")
        .eq("user_id", user.id).single();

      // Log new client to admin_alerts (non-fatal)
      try {
        await supabase.from("admin_alerts").insert({
          type: "new_client",
          message: `New client onboarded: ${cfg?.business_name ?? "Unknown"}`,
          metadata: {
            user_id: user.id,
            business_name: cfg?.business_name,
            plan: cfg?.selected_plan,
            phone_number: cfg?.phone_number,
            vapi_assistant_id: cfg?.vapi_assistant_id,
          },
        });
      } catch { /* non-fatal */ }

      // Kick off Vapi provisioning in the background — don't await, don't block
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/provision-vapi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ user_id: user.id }),
      }).catch(() => { /* provisioning failure is non-blocking */ })

      // Auto-provision the client's booking calendar in the background — don't await, don't block
      fetch('https://nexusconsultancy.app.n8n.cloud/webhook/nexus-provision-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          business_name: cfg?.business_name ?? '',
          client_email: cfg?.notification_email || cfg?.business_email || '',
          timezone: cfg?.timezone || 'America/New_York',
        }),
      }).catch(() => { /* calendar provisioning failure is non-blocking */ })

      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
      </div>
    );
  }

  // ── LITE TIER ──
  if (isLite) {
    return (
      <OnboardingWrapper
        currentStep={7}
        stepTitle="Phone number"
        stepDescription="Almost done — one last thing"
        onNext={() => completeOnboarding()}
        isNextDisabled={isSaving}
        nextLabel={isSaving ? "Finishing..." : "Complete setup"}
      >
        <div className="space-y-5">
          <div className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 mt-0.5">
              <Mail className="size-5 text-teal-400" />
            </div>
            <div>
              <p className="font-semibold text-white">Your dedicated NEXUS number is on its way</p>
              <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                Your dedicated NEXUS phone number will be provided after setup. Check your email
                for details and forwarding instructions within 24 hours.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-4 py-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              Once you receive the number, it takes about 5 minutes to set up call forwarding
              with your phone provider. We'll send step-by-step instructions for your carrier.
            </p>
          </div>

          <p className="text-xs text-slate-600 text-center">
            You can also add your number anytime from your dashboard settings.
          </p>
        </div>
      </OnboardingWrapper>
    );
  }

  // ── PREMIUM / CUSTOM TIER ──
  const options: { id: RoutingPreference; icon: React.ElementType; label: string; badge?: string; description: string; helper: string }[] = [
    {
      id: "forward",
      icon: PhoneForwarded,
      label: "Forward my existing number",
      badge: "Recommended",
      description: "Keep using your current business phone number. Just set up call forwarding to the NEXUS number we'll provide.",
      helper: "After setup, we'll email you a NEXUS phone number and forwarding instructions (5 minutes with your phone provider).",
    },
    {
      id: "new_number",
      icon: Phone,
      label: "Get a new NEXUS number",
      description: "We'll assign you a dedicated NEXUS phone number for your business.",
      helper: "Available instantly after setup.",
    },
  ];

  const isNewNumber = routing === "new_number";

  return (
    <OnboardingWrapper
      currentStep={7}
      stepTitle="How should we route your calls?"
      stepDescription="Choose how NEXUS will receive calls for your business"
      onNext={routing ? () => completeOnboarding(routing as RoutingPreference) : undefined}
      isNextDisabled={!routing || isSaving}
      nextLabel={isSaving ? "Finishing..." : "Complete setup"}
    >
      <div className="space-y-4">
        {options.map(({ id, icon: Icon, label, badge, description, helper }) => (
          <button
            key={id}
            type="button"
            onClick={() => setRouting(id)}
            className={cn(
              "w-full flex items-start gap-4 rounded-2xl border p-5 text-left transition-all",
              routing === id
                ? "border-teal-500 bg-teal-500/10"
                : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
            )}
          >
            <div className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl mt-0.5",
              routing === id ? "bg-teal-500/20" : "bg-slate-800"
            )}>
              <Icon className={cn("size-5", routing === id ? "text-teal-400" : "text-slate-400")} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-white">{label}</p>
                {badge && (
                  <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-400">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-300 mb-2">{description}</p>
              <p className="text-xs text-slate-500">{helper}</p>
            </div>
            <div className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full border-2 mt-0.5",
              routing === id ? "border-teal-400" : "border-slate-600"
            )}>
              {routing === id && <span className="size-2 rounded-full bg-teal-400" />}
            </div>
          </button>
        ))}

        {isNewNumber && (
          <div className="rounded-xl border border-slate-700 bg-slate-900/50 px-5 py-4 space-y-3">
            <label className="text-sm font-medium text-slate-300">Preferred area code</label>
            <div className="space-y-2">
              <select
                value={areaRegion}
                onChange={(e) => {
                  const val = e.target.value;
                  setAreaRegion(val);
                  if (val !== "other-other") {
                    const region = AREA_REGIONS.find(r => `${r.region}-${r.code}` === val);
                    if (region) setAreaCode(region.code);
                  }
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <optgroup label="Florida">
                  {AREA_REGIONS.filter(r => r.region === "fl").map(r => (
                    <option key={r.code} value={`${r.region}-${r.code}`}>{r.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Cayman Islands">
                  {AREA_REGIONS.filter(r => r.region === "ky").map(r => (
                    <option key={r.code} value={`${r.region}-${r.code}`}>{r.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Other">
                  <option value="other-other">Other (enter manually)</option>
                </optgroup>
              </select>

              {areaRegion === "other-other" && (
                <input
                  type="text"
                  maxLength={3}
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="e.g. 212"
                  className="w-28 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              )}
            </div>
            <p className="text-xs text-slate-500">We'll provision the closest available number in this area code.</p>
          </div>
        )}

        <p className="text-xs text-slate-600 text-center pt-1">
          You can change this anytime from your dashboard settings.
        </p>
      </div>
    </OnboardingWrapper>
  );
}
