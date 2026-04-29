"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function PhoneNumberPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [existingPhone, setExistingPhone] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

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
        .select("phone_number, phone_verified")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setExistingPhone(data.phone_number || "");
        setPhoneNumber(data.phone_number || "");
        setPhoneVerified(data.phone_verified || false);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerification = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return;
    
    setIsVerifying(true);
    try {
      // In production, this would call an API to send verification SMS
      // For demo, we'll simulate the verification
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Save the code temporarily (in production, store in DB with expiry)
      await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          phone_number: phoneNumber,
          phone_verification_code: code,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      // Simulate sending SMS (in production, use Twilio or similar)
      console.log("Verification code:", code);
      alert(`Demo mode: Your verification code is ${code}`);
      
      setVerificationSent(true);
      setShowVerification(true);
    } catch (error) {
      console.error("Error sending verification:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) return;
    
    setIsVerifying(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Verify the code (in production, compare with stored code)
      // For demo, accept any 6-digit code
      if (verificationCode.length === 6) {
        await supabase
          .from("agent_config")
          .upsert({
            user_id: user.id,
            phone_number: phoneNumber,
            phone_verified: true,
            phone_verification_code: null,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: "user_id",
          });

        setPhoneVerified(true);
      }
    } catch (error) {
      console.error("Error verifying:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkip = async () => {
    // Update onboarding progress and complete onboarding
    await completeOnboarding();
  };

  const handleSave = async () => {
    if (!phoneVerified && phoneNumber) {
      // Need to verify first
      return;
    }
    
    await completeOnboarding();
  };

  const completeOnboarding = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update onboarding to completed
      const { data } = await supabase
        .from("user_onboarding")
        .select("completed_steps")
        .eq("user_id", user.id)
        .single();

      const completedSteps = data?.completed_steps || [];
      if (!completedSteps.includes(6)) {
        completedSteps.push(6);
      }

      await supabase
        .from("user_onboarding")
        .upsert({
          user_id: user.id,
          current_step: 7,
          completed_steps: completedSteps,
          is_completed: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsSaving(false);
    }
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
      currentStep={6}
      stepTitle="Phone Number"
      stepDescription="Add your business phone number for AVA to answer"
      onNext={handleSave}
      isNextDisabled={isSaving}
      nextLabel={isSaving ? "Completing..." : "Complete Setup"}
    >
      <div className="space-y-6">
        {phoneVerified ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Phone Verified!</h3>
              <p className="text-slate-400 mt-2">{existingPhone || phoneNumber}</p>
            </div>
            <p className="text-sm text-slate-500">
              AVA is now ready to answer calls at this number.
            </p>
          </div>
        ) : showVerification ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-slate-400">
                We've sent a 6-digit code to <span className="text-white">{phoneNumber}</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="verificationCode" className="text-slate-200">Enter Verification Code</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying || verificationCode.length !== 6}
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowVerification(false);
                  setVerificationSent(false);
                }}
                className="text-sm text-slate-500 hover:text-slate-400"
              >
                Change phone number
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Why add a phone number?</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  AVA will answer calls at this number
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  Call forwarding to your existing number
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  Get a new dedicated business number
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-slate-200">Business Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <Button
              onClick={handleSendVerification}
              disabled={isVerifying || !phoneNumber || phoneNumber.length < 10}
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold"
            >
              {isVerifying ? "Sending..." : "Send Verification Code"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-slate-500 hover:text-slate-400"
              >
                Skip for now →
              </button>
            </div>
          </div>
        )}

        {/* Info note */}
        <div className="text-center text-xs text-slate-500 mt-4">
          <p>You can always add or change your phone number later from settings.</p>
        </div>
      </div>
    </OnboardingWrapper>
  );
}