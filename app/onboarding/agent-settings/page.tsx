"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { syncVapiAssistant } from "@/lib/vapi";

interface TransferRule {
  id: string;
  type: "keyword" | "caller_type" | "time";
  value: string;
  destination: string;
}

const integrations = [
  { id: "google_calendar", name: "Google Calendar", description: "Automatic appointment booking and rescheduling", icon: "📅" },
  { id: "gmail", name: "Gmail", description: "Email summaries and confirmations after every call", icon: "✉️" },
];

export default function AgentSettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    transferEnabled: true,
    transferRules: [] as TransferRule[],
    recordingEnabled: false,
    callScreeningEnabled: true,
    selectedIntegrations: [] as string[],
    zapierEnabled: false,
    zapierWebhookUrl: "",
  });

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
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setSelectedPlan(data.selected_plan ?? null);
        setFormData({
          transferEnabled: data.transfer_enabled ?? true,
          transferRules: Array.isArray(data.transfer_rules) ? data.transfer_rules : [],
          recordingEnabled: data.recording_enabled ?? false,
          callScreeningEnabled: data.call_screening_enabled ?? true,
          selectedIntegrations: data.integrations ? Object.keys(data.integrations) : [],
          zapierEnabled: data.zapier_enabled ?? false,
          zapierWebhookUrl: data.zapier_webhook_url ?? "",
        });
      }
    } catch (error) {
      console.error("Error loading config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const integrationsObj: Record<string, boolean> = {};
      formData.selectedIntegrations.forEach(id => {
        integrationsObj[id] = true;
      });

      const { error } = await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          transfer_enabled: formData.transferEnabled,
          transfer_rules: formData.transferRules,
          recording_enabled: formData.recordingEnabled,
          call_screening_enabled: formData.callScreeningEnabled,
          integrations: integrationsObj,
          zapier_enabled: formData.zapierEnabled,
          zapier_webhook_url: formData.zapierWebhookUrl || null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (error) {
        console.error("Error saving config:", error);
        return;
      }

      // Update onboarding progress
      await updateOnboardingProgress(user.id, 4);
      
      syncVapiAssistant(user.id)
      router.push("/onboarding/select-plan");
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

  const toggleIntegration = (integrationId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedIntegrations: prev.selectedIntegrations.includes(integrationId)
        ? prev.selectedIntegrations.filter(id => id !== integrationId)
        : [...prev.selectedIntegrations, integrationId],
    }));
  };

  const addTransferRule = () => {
    setFormData(prev => ({
      ...prev,
      transferRules: [
        ...prev.transferRules,
        { id: Date.now().toString(), type: "keyword", value: "", destination: "" },
      ],
    }));
  };

  const updateTransferRule = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      transferRules: prev.transferRules.map(rule =>
        rule.id === id ? { ...rule, [field]: value } : rule
      ),
    }));
  };

  const removeTransferRule = (id: string) => {
    setFormData(prev => ({
      ...prev,
      transferRules: prev.transferRules.filter(rule => rule.id !== id),
    }));
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
      currentStep={4}
      stepTitle="Agent Settings"
      stepDescription="Configure advanced call handling options"
      onNext={handleSave}
      isNextDisabled={isSaving}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-8">
        {/* Call Transfer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Call Transfer</h3>
              <p className="text-sm text-slate-400">Allow AVA to transfer calls to your team</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.transferEnabled}
                onChange={(e) => setFormData({ ...formData, transferEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>

          {formData.transferEnabled && (
            <div className="ml-4 space-y-3 border-l-2 border-slate-700 pl-4">
              <p className="text-xs text-slate-500 mb-3">Add rules to automatically transfer calls</p>
              {formData.transferRules.map((rule) => (
                <div key={rule.id} className="flex gap-2 items-start">
                  <select
                    value={rule.type}
                    onChange={(e) => updateTransferRule(rule.id, "type", e.target.value)}
                    className="w-28 h-8 rounded border border-slate-700 bg-slate-900/50 px-2 text-white text-sm"
                  >
                    <option value="keyword">Keyword</option>
                    <option value="caller_type">Caller Type</option>
                    <option value="time">Time</option>
                  </select>
                  <Input
                    value={rule.value}
                    onChange={(e) => updateTransferRule(rule.id, "value", e.target.value)}
                    placeholder="e.g., Urgent, Manager"
                    className="flex-1 h-8 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                  />
                  <Input
                    value={rule.destination}
                    onChange={(e) => updateTransferRule(rule.id, "destination", e.target.value)}
                    placeholder="Phone number"
                    className="w-32 h-8 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeTransferRule(rule.id)}
                    className="h-8 px-2 text-slate-500 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTransferRule}
                className="text-sm text-teal-400 hover:text-teal-300"
              >
                + Add Transfer Rule
              </button>
            </div>
          )}
        </div>

        {/* Call Recording */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Call Recording</h3>
              <p className="text-sm text-slate-400">Record calls for quality assurance (30-day storage)</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.recordingEnabled}
                onChange={(e) => setFormData({ ...formData, recordingEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>

        {/* Call Screening */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Call Screening</h3>
              <p className="text-sm text-slate-400">AVA will ask callers to identify themselves before connecting</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.callScreeningEnabled}
                onChange={(e) => setFormData({ ...formData, callScreeningEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>

        {/* Integrations */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Integrations</h3>
            <p className="text-sm text-slate-400">Native integrations available now</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {integrations.map((integration) => (
              <Card
                key={integration.id}
                className={`cursor-pointer transition-all ${
                  formData.selectedIntegrations.includes(integration.id)
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
                }`}
                onClick={() => toggleIntegration(integration.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <div className="font-medium text-white">{integration.name}</div>
                      <div className="text-xs text-slate-400">{integration.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Need Outlook, Salesforce, HubSpot, or a custom CRM?{' '}
            <a href="mailto:sales@nexus.ai" className="text-slate-400 underline underline-offset-2 hover:text-teal-400 transition-colors">
              Contact our sales team
            </a>{' '}
            — available in the Custom Build tier.
          </p>
        </div>

        {/* Zapier Integration */}
        {(() => {
          const isEligible = ['pro', 'scale', 'custom'].includes((selectedPlan || '').toLowerCase());
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">Zapier Integration</h3>
                      {!isEligible && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Pro+
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">
                      Push call events to 8,000+ apps — CRMs, Slack, Google Sheets, and more
                    </p>
                  </div>
                </div>
                <label className={`relative inline-flex items-center ${isEligible ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}>
                  <input
                    type="checkbox"
                    checked={formData.zapierEnabled}
                    onChange={(e) => isEligible && setFormData({ ...formData, zapierEnabled: e.target.checked })}
                    disabled={!isEligible}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              {isEligible && formData.zapierEnabled && (
                <div className="ml-4 space-y-3 border-l-2 border-slate-700 pl-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-slate-300">Zapier Webhook URL</Label>
                    <Input
                      value={formData.zapierWebhookUrl}
                      onChange={(e) => setFormData({ ...formData, zapierWebhookUrl: e.target.value })}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    />
                    <p className="text-xs text-slate-500">
                      In Zapier, create a Zap with a <strong className="text-slate-400">Webhooks by Zapier → Catch Hook</strong> trigger and paste the URL here.
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 border border-slate-700 p-3 space-y-1">
                    <p className="text-xs font-medium text-slate-300">Events we&apos;ll send:</p>
                    {['new_booking', 'missed_call', 'voicemail', 'call_completed', 'call_transferred'].map(evt => (
                      <div key={evt} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span className="text-xs text-slate-400 font-mono">{evt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isEligible && (
                <div className="ml-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
                  <p className="text-xs text-amber-400/80">
                    Zapier integration is available on the <strong>Pro plan and above</strong>. Upgrade after completing onboarding to unlock this.
                  </p>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </OnboardingWrapper>
  );
}