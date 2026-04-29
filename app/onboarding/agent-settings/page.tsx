"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface TransferRule {
  id: string;
  type: "keyword" | "caller_type" | "time";
  value: string;
  destination: string;
}

const integrations = [
  { id: "slack", name: "Slack", description: "Get notifications in your Slack channels", icon: "💬" },
  { id: "zapier", name: "Zapier", description: "Connect with 5,000+ apps", icon: "⚡" },
  { id: "google_calendar", name: "Google Calendar", description: "Book appointments directly", icon: "📅" },
  { id: "hubspot", name: "HubSpot", description: "Sync contacts and leads", icon: "🔶" },
  { id: "salesforce", name: "Salesforce", description: "CRM integration", icon: "☁️" },
  { id: "webhook", name: "Custom Webhook", description: "Send data to any endpoint", icon: "🔗" },
];

export default function AgentSettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    transferEnabled: true,
    transferRules: [] as TransferRule[],
    recordingEnabled: false,
    callScreeningEnabled: true,
    selectedIntegrations: [] as string[],
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
        setFormData({
          transferEnabled: data.transfer_enabled ?? true,
          transferRules: data.transfer_rules || [],
          recordingEnabled: data.recording_enabled ?? false,
          callScreeningEnabled: data.call_screening_enabled ?? true,
          selectedIntegrations: data.integrations ? Object.keys(data.integrations) : [],
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
            <p className="text-sm text-slate-400">Connect with your existing tools</p>
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
        </div>
      </div>
    </OnboardingWrapper>
  );
}