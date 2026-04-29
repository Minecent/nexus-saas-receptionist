"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface VoiceOption {
  id: string;
  name: string;
  description: string;
  accent: string;
  gender: string;
  previewUrl?: string;
}

const voiceOptions: VoiceOption[] = [
  {
    id: "sarah",
    name: "Sarah",
    description: "Warm and professional",
    accent: "American",
    gender: "Female",
  },
  {
    id: "james",
    name: "James",
    description: "Friendly and approachable",
    accent: "American",
    gender: "Male",
  },
  {
    id: "emma",
    name: "Emma",
    description: "Clear and articulate",
    accent: "British",
    gender: "Female",
  },
  {
    id: "michael",
    name: "Michael",
    description: "Confident and trustworthy",
    accent: "American",
    gender: "Male",
  },
  {
    id: "sophia",
    name: "Sophia",
    description: "Elegant and sophisticated",
    accent: "American",
    gender: "Female",
  },
  {
    id: "david",
    name: "David",
    description: "Casual and friendly",
    accent: "Australian",
    gender: "Male",
  },
  {
    id: "olivia",
    name: "Olivia",
    description: "Calm and reassuring",
    accent: "British",
    gender: "Female",
  },
  {
    id: "alex",
    name: "Alex",
    description: "Modern and versatile",
    accent: "American",
    gender: "Neutral",
  },
];

export default function SelectVoicePage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

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
        .select("selected_voice_id")
        .eq("user_id", user.id)
        .single();

      if (data?.selected_voice_id) {
        setSelectedVoice(data.selected_voice_id);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedVoice) return;
    
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          selected_voice_id: selectedVoice,
          voice_settings: { voice_id: selectedVoice },
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (error) {
        console.error("Error saving config:", error);
        return;
      }

      // Update onboarding progress
      await updateOnboardingProgress(user.id, 3);
      
      router.push("/onboarding/agent-settings");
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

  const handlePlayPreview = (voiceId: string) => {
    // In production, this would play actual voice preview
    setPlayingAudio(voiceId);
    setTimeout(() => setPlayingAudio(null), 2000);
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
      currentStep={3}
      stepTitle="Select Voice"
      stepDescription="Choose the voice that best represents your brand"
      onNext={handleSave}
      isNextDisabled={isSaving || !selectedVoice}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-6">
        <p className="text-slate-400 text-sm">
          Click on a voice to hear a preview. Choose the one that best fits your brand personality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {voiceOptions.map((voice) => (
            <Card
              key={voice.id}
              className={`cursor-pointer transition-all ${
                selectedVoice === voice.id
                  ? "border-teal-500 bg-teal-500/10"
                  : "border-slate-700 bg-slate-900/30 hover:border-slate-600"
              }`}
              onClick={() => setSelectedVoice(voice.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{voice.name}</div>
                    <div className="text-sm text-slate-400">{voice.description}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {voice.accent} • {voice.gender}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPreview(voice.id);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      playingAudio === voice.id
                        ? "bg-teal-500 text-slate-900"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                  >
                    {playingAudio === voice.id ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedVoice && (
          <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
            <p className="text-teal-400 text-sm font-medium">
              ✓ Selected: {voiceOptions.find(v => v.id === selectedVoice)?.name}
            </p>
          </div>
        )}
      </div>
    </OnboardingWrapper>
  );
}