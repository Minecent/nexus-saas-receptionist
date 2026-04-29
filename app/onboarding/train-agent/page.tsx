"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const personalityOptions = [
  { value: "professional", label: "Professional", description: "Polite, efficient, business-focused" },
  { value: "friendly", label: "Friendly", description: "Warm, conversational, approachable" },
  { value: "casual", label: "Casual", description: "Relaxed, easy-going, informal" },
  { value: "formal", label: "Formal", description: "Reserved, precise, corporate" },
];

const greetingTemplates = [
  "Thank you for calling {business}. This is AVA, how may I assist you?",
  "Hello, thank you for reaching out to {business}. How can I help you today?",
  "Hi there! You've reached {business}. I'm AVA, how may I be of service?",
  "{business}, good {timeOfDay}! This is AVA speaking. What can I do for you?",
];

export default function TrainAgentPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    agentName: "AVA",
    agentPersonality: "professional",
    agentGreeting: "",
    agentInstructions: "",
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
          agentName: data.agent_name || "AVA",
          agentPersonality: data.agent_personality || "professional",
          agentGreeting: data.agent_greeting || "",
          agentInstructions: data.agent_instructions || "",
        });
      } else {
        // Set default greeting
        setFormData(prev => ({
          ...prev,
          agentGreeting: greetingTemplates[0].replace("{business}", "your business"),
        }));
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

      const { error } = await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          agent_name: formData.agentName,
          agent_personality: formData.agentPersonality,
          agent_greeting: formData.agentGreeting,
          agent_instructions: formData.agentInstructions,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (error) {
        console.error("Error saving config:", error);
        return;
      }

      // Update onboarding progress
      await updateOnboardingProgress(user.id, 1);
      
      // Navigate to next step
      router.push("/onboarding/business-details");
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
      currentStep={1}
      stepTitle="Train Your Agent"
      stepDescription="Customize AVA's personality and how it handles calls"
      onNext={handleSave}
      isNextDisabled={isSaving || !formData.agentName}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-6">
        {/* Agent Name */}
        <div className="space-y-2">
          <Label htmlFor="agentName" className="text-slate-200">Agent Name</Label>
          <Input
            id="agentName"
            value={formData.agentName}
            onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
            placeholder="e.g., AVA, Receptionist, Assistant"
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
          />
          <p className="text-xs text-slate-500">This is the name your callers will use to address the agent</p>
        </div>

        {/* Personality Selection */}
        <div className="space-y-2">
          <Label className="text-slate-200">Personality</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personalityOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all ${
                  formData.agentPersonality === option.value
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
                }`}
                onClick={() => setFormData({ ...formData, agentPersonality: option.value })}
              >
                <CardContent className="p-4">
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-sm text-slate-400">{option.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Greeting Template */}
        <div className="space-y-2">
          <Label htmlFor="agentGreeting" className="text-slate-200">Greeting Message</Label>
          <Textarea
            id="agentGreeting"
            value={formData.agentGreeting}
            onChange={(e) => setFormData({ ...formData, agentGreeting: e.target.value })}
            placeholder="Enter a custom greeting..."
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {greetingTemplates.map((template, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setFormData({ ...formData, agentGreeting: template })}
                className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Template {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Instructions */}
        <div className="space-y-2">
          <Label htmlFor="agentInstructions" className="text-slate-200">Custom Instructions (Optional)</Label>
          <Textarea
            id="agentInstructions"
            value={formData.agentInstructions}
            onChange={(e) => setFormData({ ...formData, agentInstructions: e.target.value })}
            placeholder="Add any specific instructions for how AVA should handle certain situations..."
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[120px]"
          />
          <p className="text-xs text-slate-500">
            Example: "If someone asks about pricing, direct them to our website. For urgent matters, always transfer to the on-call team."
          </p>
        </div>
      </div>
    </OnboardingWrapper>
  );
}