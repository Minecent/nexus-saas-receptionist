"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { syncVapiAssistant } from "@/lib/vapi";
import { CheckCircle, Circle, Loader2 } from "lucide-react";

const ANALYSIS_STEPS = [
  { label: "Fetching your website", duration: 4500 },
  { label: "Scanning pages and content", duration: 5500 },
  { label: "Extracting services and FAQs", duration: 6000 },
  { label: "Identifying business hours and contact info", duration: 5000 },
  { label: "Building your knowledge base", duration: 6500 },
];

type Phase = "idle" | "analysing" | "done";

export default function TrainAgentPage() {
  const router = useRouter();
  const supabase = createClient();
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const normaliseUrl = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const runAnalysis = async () => {
    if (!url.trim()) return;
    setPhase("analysing");
    setCompletedSteps([]);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, ANALYSIS_STEPS[i].duration));
      setCompletedSteps((prev) => [...prev, i]);
    }

    setActiveStep(null);
    setPhase("done");
  };

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      await supabase.from("agent_config").upsert(
        { user_id: user.id, business_website: normaliseUrl(url), updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

      const { data } = await supabase
        .from("user_onboarding")
        .select("completed_steps")
        .eq("user_id", user.id)
        .single();

      const steps = Array.isArray(data?.completed_steps) ? data.completed_steps : [];
      if (!steps.includes(1)) steps.push(1);

      await supabase.from("user_onboarding").upsert(
        { user_id: user.id, current_step: 2, completed_steps: steps, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

      syncVapiAssistant(user.id)
      router.push("/onboarding/business-details");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingWrapper
      currentStep={1}
      stepTitle="Train your agent"
      stepDescription="Let's fetch information about your business from your website"
      onNext={phase === "done" ? handleContinue : undefined}
      isNextDisabled={phase !== "done" || isSaving}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-8">
        {/* URL input */}
        <div className="space-y-2">
          <Label htmlFor="websiteUrl" className="text-slate-200">Homepage</Label>
          <div className="flex gap-3">
            <Input
              id="websiteUrl"
              type="url"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setPhase("idle"); setCompletedSteps([]); }}
              onKeyDown={(e) => { if (e.key === "Enter" && url.trim() && phase === "idle") runAnalysis(); }}
              placeholder="https://yourbusiness.com"
              disabled={phase === "analysing"}
              className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={runAnalysis}
              disabled={!url.trim() || phase === "analysing"}
              className="shrink-0 rounded-lg bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {phase === "analysing" ? "Analysing…" : "Train agent"}
            </button>
          </div>
          {url.trim() && phase === "idle" && (
            <p className="text-xs text-slate-500">
              We&apos;ll visit: <span className="font-semibold text-slate-300">{normaliseUrl(url)}</span>
            </p>
          )}
        </div>

        {/* Analysis progress */}
        {(phase === "analysing" || phase === "done") && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
              {phase === "done" ? "Analysis complete" : "Analysing your website"}
            </p>

            <ul className="space-y-3">
              {ANALYSIS_STEPS.map((step, i) => {
                const isDone = completedSteps.includes(i);
                const isActive = activeStep === i;
                return (
                  <li key={i} className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle className="size-4 shrink-0 text-teal-400" />
                    ) : isActive ? (
                      <Loader2 className="size-4 shrink-0 animate-spin text-teal-400" />
                    ) : (
                      <Circle className="size-4 shrink-0 text-slate-700" />
                    )}
                    <span className={`text-sm ${isDone ? "text-slate-300" : isActive ? "text-white" : "text-slate-600"}`}>
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            {phase === "done" && (
              <div className="mt-4 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3">
                <p className="text-sm font-semibold text-teal-400">
                  Your agent has been trained successfully
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  NEXUS has built a knowledge base from your website. Your receptionist will use this
                  to answer questions about your business accurately.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </OnboardingWrapper>
  );
}
