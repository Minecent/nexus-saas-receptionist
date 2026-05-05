"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { createClient } from "@/lib/supabase/client";
import { syncVapiAssistant } from "@/lib/vapi";
import { Mic, CheckCircle, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const VOICES: { id: string; name: string; gender: string; style: string; description: string; audioSrc?: string }[] = [
  // ── Voices with audio samples ──
  {
    id: "roger",
    name: "Roger",
    gender: "American Male",
    style: "Laid-back & Casual",
    description: "Relaxed, conversational tone with a deep, warm quality. Great for casual brands, trades, and approachable businesses.",
    audioSrc: "/audio/roger.mp3",
  },
  {
    id: "josh",
    name: "Josh",
    gender: "American Male",
    style: "Friendly & Confident",
    description: "Clear, upbeat delivery with a natural American accent. Works well for home services, retail, and customer-first brands.",
    audioSrc: "/audio/josh.mp3",
  },
  {
    id: "larry",
    name: "Larry",
    gender: "American Male",
    style: "Steady & Authoritative",
    description: "Deep, measured voice that commands trust. Ideal for legal, financial, and professional service firms.",
    audioSrc: "/audio/larry.mp3",
  },
  {
    id: "lexi",
    name: "Lexi",
    gender: "American Female",
    style: "Energetic & Modern",
    description: "Bright, fast-paced tone that keeps callers engaged. Perfect for sales teams, real estate, and high-energy brands.",
    audioSrc: "/audio/Lexi.mp3",
  },
  {
    id: "belle",
    name: "Belle",
    gender: "American Female",
    style: "Warm & Welcoming",
    description: "Smooth, unhurried delivery with a naturally warm quality. Great for wellness, beauty, and hospitality businesses.",
    audioSrc: "/audio/belle.mp3",
  },
  {
    id: "sami",
    name: "Sami",
    gender: "American Female",
    style: "Caring & Approachable",
    description: "Gentle, patient tone that instantly puts callers at ease. Ideal for healthcare, dental, and mental health practices.",
    audioSrc: "/audio/sami.mp3",
  },
  {
    id: "sky",
    name: "Sky",
    gender: "Neutral",
    style: "Light & Conversational",
    description: "Airy, contemporary tone with broad appeal. Works across industries and speaks to diverse customer bases.",
    audioSrc: "/audio/Sky.mp3",
  },
  // ── Voices without audio samples yet ──
  {
    id: "sarah",
    name: "Sarah",
    gender: "American Female",
    style: "Warm & Professional",
    description: "Calm pacing, clear pronunciation. Ideal for medical practices and customer-facing service businesses.",
  },
  {
    id: "marcus",
    name: "Marcus",
    gender: "British Male",
    style: "Authoritative & Composed",
    description: "Deep voice with measured delivery. Perfect for legal firms and financial services.",
  },
  {
    id: "olivia",
    name: "Olivia",
    gender: "British Female",
    style: "Elegant & Sophisticated",
    description: "Polished accent with crisp diction. Great for premium brands and luxury services.",
  },
  {
    id: "james",
    name: "James",
    gender: "American Male",
    style: "Confident & Trustworthy",
    description: "Strong, clear delivery. Works well for B2B services and consulting firms.",
  },
  {
    id: "alex",
    name: "Alex",
    gender: "Neutral",
    style: "Modern & Versatile",
    description: "Gender-neutral voice. Works across industries with a contemporary feel.",
  },
];

type Phase = "selection" | "confirmed";

export default function SelectVoicePage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [phase, setPhase] = useState<Phase>("selection");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingVoice(null);
  };

  const togglePlay = (e: React.MouseEvent, voiceId: string, audioSrc: string) => {
    e.stopPropagation();
    if (playingVoice === voiceId) {
      stopAudio();
      return;
    }
    stopAudio();
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.onended = () => setPlayingVoice(null);
    audio.play().catch(() => {});
    setPlayingVoice(voiceId);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/login"); return; }
        const { data } = await supabase
          .from("agent_config")
          .select("selected_voice_id")
          .eq("user_id", user.id)
          .single();
        if (data?.selected_voice_id) {
          setSelectedVoice(data.selected_voice_id);
          setPhase("confirmed");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const selectedVoiceData = VOICES.find((v) => v.id === selectedVoice);

  const handleSelect = async (voiceId: string) => {
    if (isSaving) return;
    stopAudio();
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Increment change count if switching an existing voice
      const { data: current } = await supabase
        .from("agent_config")
        .select("selected_voice_id, voice_change_count")
        .eq("user_id", user.id)
        .single();

      const changeCount = current?.selected_voice_id && current.selected_voice_id !== voiceId
        ? (current.voice_change_count ?? 0) + 1
        : (current?.voice_change_count ?? 0);

      const { error } = await supabase.from("agent_config").upsert(
        {
          user_id: user.id,
          selected_voice_id: voiceId,
          voice_change_count: changeCount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      if (error) { console.error("Error saving voice:", error); return; }
      setSelectedVoice(voiceId);
      setPhase("confirmed");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("user_onboarding").select("completed_steps").eq("user_id", user.id).single();
      const steps = Array.isArray(data?.completed_steps) ? data.completed_steps : [];
      if (!steps.includes(3)) steps.push(3);
      await supabase.from("user_onboarding").upsert(
        { user_id: user.id, current_step: 4, completed_steps: steps, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

      syncVapiAssistant(user.id)
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

  // ── Confirmed state ──
  if (phase === "confirmed" && selectedVoiceData) {
    return (
      <OnboardingWrapper
        currentStep={3}
        stepTitle="Voice selected"
        stepDescription="You can change this anytime in the first 7 days"
        onNext={handleContinue}
        isNextDisabled={isSaving}
        nextLabel={isSaving ? "Saving..." : "Continue"}
      >
        <div className="space-y-5">
          {/* Confirmation banner */}
          <div className="flex items-start gap-4 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-5">
            <CheckCircle className="mt-0.5 size-5 shrink-0 text-teal-400" />
            <div>
              <p className="font-semibold text-white">
                Great choice! NEXUS will go live with{" "}
                <span className="text-teal-400">{selectedVoiceData.name}</span> within 24 hours.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {selectedVoiceData.gender} · {selectedVoiceData.style}
              </p>
            </div>
          </div>

          {/* Selected voice card */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/15">
                <Mic className="size-5 text-teal-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{selectedVoiceData.name}</p>
                <p className="text-xs text-slate-500">{selectedVoiceData.gender}</p>
              </div>
              <span className="ml-auto rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400">
                {selectedVoiceData.style}
              </span>
            </div>
            <p className="text-sm text-slate-400">{selectedVoiceData.description}</p>
          </div>

          <button
            type="button"
            onClick={() => setPhase("selection")}
            className="w-full text-center text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            ← Choose a different voice
          </button>
        </div>
      </OnboardingWrapper>
    );
  }

  // ── Selection grid ──
  return (
    <OnboardingWrapper
      currentStep={3}
      stepTitle="Select a voice"
      stepDescription="Choose the voice that will represent your business on every call"
      onNext={undefined}
      isNextDisabled={true}
      nextLabel="Continue"
    >
      <div className="space-y-6">
        {/* Voice grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VOICES.map((voice) => (
            <div
              key={voice.id}
              className={cn(
                "flex flex-col rounded-2xl border p-5 transition-all",
                selectedVoice === voice.id
                  ? "border-teal-500 bg-teal-500/10"
                  : "border-slate-700 bg-slate-900/50"
              )}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/15">
                  <Mic className="size-4 text-teal-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{voice.name}</p>
                  <p className="text-xs text-slate-500 truncate">{voice.gender}</p>
                </div>
                {voice.audioSrc && (
                  <button
                    type="button"
                    onClick={(e) => togglePlay(e, voice.id, voice.audioSrc!)}
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      playingVoice === voice.id
                        ? "bg-teal-500 text-white hover:bg-teal-600"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    )}
                    aria-label={playingVoice === voice.id ? "Pause" : "Play sample"}
                  >
                    {playingVoice === voice.id
                      ? <Pause className="size-3.5 fill-white" />
                      : <Play className="size-3.5 fill-current ml-0.5" />
                    }
                  </button>
                )}
              </div>

              {/* Style tag */}
              <span className="mb-3 w-fit rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                {voice.style}
              </span>

              {/* Description */}
              <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-400">
                {voice.description}
              </p>

              {/* Button */}
              <button
                type="button"
                onClick={() => handleSelect(voice.id)}
                disabled={isSaving}
                className={cn(
                  "w-full rounded-lg py-2 text-sm font-semibold transition-colors disabled:opacity-50",
                  selectedVoice === voice.id
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "border border-slate-700 bg-transparent text-slate-300 hover:border-teal-500 hover:text-teal-400"
                )}
              >
                {selectedVoice === voice.id ? "Selected ✓" : "Select Voice"}
              </button>
            </div>
          ))}
        </div>

        {/* Reassurance card */}
        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-5 space-y-2">
          <p className="text-sm font-semibold text-white">Not sure which to pick?</p>
          <p className="text-sm text-slate-400 leading-relaxed">
            No worries — pick the description that fits your brand best. You can change voices
            anytime within the first 7 days, free. If it doesn't sound right, just email support
            and we'll switch it. Your satisfaction is our priority.
          </p>
        </div>

        {/* Audio samples notice */}
        <p className="text-center text-xs text-slate-600">
          Audio samples coming soon. For now, our descriptions give you a clear picture of each voice's character.
        </p>
      </div>
    </OnboardingWrapper>
  );
}
