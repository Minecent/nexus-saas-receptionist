"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { syncVapiAssistant } from "@/lib/vapi";
import { cn } from "@/lib/utils";

const PERSONALITIES = [
  { id: "Professional and friendly", label: "Professional & Friendly", description: "Polished and warm — the default for most businesses." },
  { id: "Warm and caring", label: "Warm & Caring", description: "Empathetic and patient. Ideal for healthcare and wellness." },
  { id: "Energetic and upbeat", label: "Energetic & Upbeat", description: "High-energy and positive. Great for sales and retail." },
  { id: "Calm and reassuring", label: "Calm & Reassuring", description: "Steady and composed. Perfect for legal and financial services." },
];

export default function AgentCustomizationPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [formData, setFormData] = useState({
    agentName: "",
    agentGreeting: "",
    agentPersonality: "Professional and friendly",
    servicesOffered: "",
    appointmentDurationMinutes: 30,
    agentInstructions: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/login"); return; }
        const { data } = await supabase
          .from("agent_config")
          .select("agent_name, agent_greeting, agent_personality, services_offered, appointment_duration_minutes, agent_instructions, business_name")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setBusinessName(data.business_name ?? "");
          setFormData({
            agentName: data.agent_name ?? "",
            agentGreeting: data.agent_greeting ?? "",
            agentPersonality: data.agent_personality ?? "Professional and friendly",
            servicesOffered: data.services_offered ?? "",
            appointmentDurationMinutes: data.appointment_duration_minutes ?? 30,
            agentInstructions: data.agent_instructions ?? "",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("agent_config").upsert(
        {
          user_id: user.id,
          agent_name: formData.agentName || "AVA",
          agent_greeting: formData.agentGreeting || null,
          agent_personality: formData.agentPersonality,
          services_offered: formData.servicesOffered || null,
          appointment_duration_minutes: formData.appointmentDurationMinutes,
          agent_instructions: formData.agentInstructions || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
      if (error) { console.error(error); return; }

      const { data: onb } = await supabase.from("user_onboarding").select("completed_steps").eq("user_id", user.id).single();
      const steps = Array.isArray(onb?.completed_steps) ? onb.completed_steps : [];
      if (!steps.includes(4)) steps.push(4);
      await supabase.from("user_onboarding").upsert(
        { user_id: user.id, current_step: 5, completed_steps: steps, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

      syncVapiAssistant(user.id);
      router.push("/onboarding/agent-settings");
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

  const defaultGreeting = businessName
    ? `Thank you for calling ${businessName}, how can I help you today?`
    : "Thank you for calling, how can I help you today?";

  return (
    <OnboardingWrapper
      currentStep={4}
      stepTitle="Set up your agent"
      stepDescription="Personalise how your AI receptionist sounds and what it knows"
      onNext={handleSave}
      isNextDisabled={isSaving}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-7">
        {/* Agent name */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-300">
            Agent name
          </Label>
          <Input
            value={formData.agentName}
            onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
            placeholder="AVA"
            maxLength={20}
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
          />
          <p className="text-xs text-slate-500">What your receptionist will be called on calls. Defaults to AVA.</p>
        </div>

        {/* Custom greeting */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-300">
            Opening greeting <span className="text-slate-500 font-normal">(optional)</span>
          </Label>
          <textarea
            value={formData.agentGreeting}
            onChange={(e) => setFormData({ ...formData, agentGreeting: e.target.value })}
            placeholder={defaultGreeting}
            rows={2}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
          />
          <p className="text-xs text-slate-500">Leave blank to use the default greeting above.</p>
        </div>

        {/* Personality */}
        <div className="space-y-2.5">
          <Label className="text-sm font-medium text-slate-300">Personality style</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PERSONALITIES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFormData({ ...formData, agentPersonality: p.id })}
                className={cn(
                  "flex flex-col items-start rounded-xl border p-3.5 text-left transition-all",
                  formData.agentPersonality === p.id
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
                )}
              >
                <span className={cn("text-sm font-semibold mb-0.5", formData.agentPersonality === p.id ? "text-teal-400" : "text-white")}>
                  {p.label}
                </span>
                <span className="text-xs text-slate-400 leading-relaxed">{p.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services offered */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-300">
            Services offered <span className="text-slate-500 font-normal">(one per line)</span>
          </Label>
          <textarea
            value={formData.servicesOffered}
            onChange={(e) => setFormData({ ...formData, servicesOffered: e.target.value })}
            placeholder={"Property viewings\nMaintenance requests\nLease enquiries"}
            rows={4}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
          />
          <p className="text-xs text-slate-500">Your agent will use this list when callers ask what you offer.</p>
        </div>

        {/* Appointment duration */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-300">Standard appointment duration (minutes)</Label>
          <Input
            type="number"
            min={5}
            max={240}
            step={5}
            value={formData.appointmentDurationMinutes}
            onChange={(e) => setFormData({ ...formData, appointmentDurationMinutes: Number(e.target.value) || 30 })}
            className="w-32 bg-slate-900/50 border-slate-700 text-white"
          />
          <p className="text-xs text-slate-500">Used to block the correct slot in Google Calendar. Default: 30 min.</p>
        </div>

        {/* Additional instructions */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-300">
            Additional instructions <span className="text-slate-500 font-normal">(optional)</span>
          </Label>
          <textarea
            value={formData.agentInstructions}
            onChange={(e) => setFormData({ ...formData, agentInstructions: e.target.value })}
            placeholder="e.g. Always ask for the caller's email address. Do not discuss pricing — direct those questions to the sales team."
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
          />
        </div>
      </div>
    </OnboardingWrapper>
  );
}
