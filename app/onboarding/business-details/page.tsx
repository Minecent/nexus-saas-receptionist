"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWrapper } from "@/components/onboarding/onboarding-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const industries = [
  "Professional Services (Law, Accounting, Consulting)",
  "Healthcare & Medical",
  "Real Estate",
  "Home Services (Plumbing, HVAC, Electrical)",
  "Retail & E-commerce",
  "Restaurant & Hospitality",
  "Automotive",
  "Fitness & Wellness",
  "Education",
  "Non-profit",
  "Other",
];

const defaultHours = {
  monday: { open: "09:00", close: "17:00", closed: false },
  tuesday: { open: "09:00", close: "17:00", closed: false },
  wednesday: { open: "09:00", close: "17:00", closed: false },
  thursday: { open: "09:00", close: "17:00", closed: false },
  friday: { open: "09:00", close: "17:00", closed: false },
  saturday: { open: "09:00", close: "12:00", closed: false },
  sunday: { open: "", close: "", closed: true },
};

export default function BusinessDetailsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessIndustry: "",
    businessPhone: "",
    businessEmail: "",
    businessAddress: "",
    timezone: "America/New_York",
    businessHours: defaultHours,
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
          businessName: data.business_name || "",
          businessIndustry: data.business_industry || "",
          businessPhone: data.business_phone || "",
          businessEmail: data.business_email || "",
          businessAddress: data.business_address || "",
          timezone: data.timezone || "America/New_York",
          businessHours: data.business_hours || defaultHours,
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

      const { error } = await supabase
        .from("agent_config")
        .upsert({
          user_id: user.id,
          business_name: formData.businessName,
          business_industry: formData.businessIndustry,
          business_phone: formData.businessPhone,
          business_email: formData.businessEmail,
          business_address: formData.businessAddress,
          timezone: formData.timezone,
          business_hours: formData.businessHours,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (error) {
        console.error("Error saving config:", error);
        return;
      }

      // Update onboarding progress
      await updateOnboardingProgress(user.id, 2);
      
      router.push("/onboarding/select-voice");
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

  const updateHours = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value,
        },
      },
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
      currentStep={2}
      stepTitle="Business Details"
      stepDescription="Tell us about your business so AVA can represent you accurately"
      onNext={handleSave}
      isNextDisabled={isSaving || !formData.businessName || !formData.businessIndustry}
      nextLabel={isSaving ? "Saving..." : "Continue"}
    >
      <div className="space-y-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-slate-200">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="Your company name"
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-slate-200">Industry *</Label>
          <select
            id="industry"
            value={formData.businessIndustry}
            onChange={(e) => setFormData({ ...formData, businessIndustry: e.target.value })}
            className="w-full h-10 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white"
          >
            <option value="" className="text-slate-500">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry} className="text-white">
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessPhone" className="text-slate-200">Business Phone</Label>
            <Input
              id="businessPhone"
              type="tel"
              value={formData.businessPhone}
              onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessEmail" className="text-slate-200">Business Email</Label>
            <Input
              id="businessEmail"
              type="email"
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              placeholder="info@yourbusiness.com"
              className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="businessAddress" className="text-slate-200">Business Address</Label>
          <Input
            id="businessAddress"
            value={formData.businessAddress}
            onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
            placeholder="123 Main St, City, State 12345"
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <Label htmlFor="timezone" className="text-slate-200">Timezone</Label>
          <select
            id="timezone"
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="w-full h-10 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-white"
          >
            <option value="America/New_York" className="text-white">Eastern Time (ET)</option>
            <option value="America/Chicago" className="text-white">Central Time (CT)</option>
            <option value="America/Denver" className="text-white">Mountain Time (MT)</option>
            <option value="America/Los_Angeles" className="text-white">Pacific Time (PT)</option>
            <option value="America/Phoenix" className="text-white">Arizona (AZ)</option>
          </select>
        </div>

        {/* Business Hours */}
        <div className="space-y-3">
          <Label className="text-slate-200">Business Hours</Label>
          <div className="space-y-2">
            {Object.entries(formData.businessHours).map(([day, hours]: [string, any]) => (
              <div key={day} className="flex items-center gap-3">
                <div className="w-24">
                  <span className="text-sm text-slate-300 capitalize">{day}</span>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!hours.closed}
                    onChange={(e) => updateHours(day, "closed", !e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-teal-500"
                  />
                  <span className="text-xs text-slate-500">Open</span>
                </label>
                {!hours.closed && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => updateHours(day, "open", e.target.value)}
                      className="w-28 h-8 rounded border border-slate-700 bg-slate-900/50 px-2 text-white text-sm"
                    />
                    <span className="text-slate-500">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => updateHours(day, "close", e.target.value)}
                      className="w-28 h-8 rounded border border-slate-700 bg-slate-900/50 px-2 text-white text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </OnboardingWrapper>
  );
}