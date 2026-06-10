-- NEXUS AI Receptionist Onboarding Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Onboarding progress tracking table
CREATE TABLE IF NOT EXISTS public.user_onboarding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    current_step INTEGER NOT NULL DEFAULT 1,
    completed_steps INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Agent configuration table (AVA settings)
CREATE TABLE IF NOT EXISTS public.agent_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Step 1: Train Agent
    agent_name TEXT DEFAULT 'AVA',
    agent_personality TEXT DEFAULT 'Professional and friendly',
    agent_greeting TEXT,
    agent_instructions TEXT,
    custom_responses JSONB DEFAULT '{}'::jsonb,
    
    -- Step 2: Business Details
    business_name TEXT,
    business_industry TEXT,
    business_website TEXT,
    business_phone TEXT,
    business_email TEXT,
    business_address TEXT,
    business_hours JSONB DEFAULT '{}'::jsonb,
    timezone TEXT DEFAULT 'America/New_York',
    
    -- Step 3: Select Voice
    selected_voice_id TEXT,
    voice_settings JSONB DEFAULT '{}'::jsonb,
    voice_personality TEXT,
    voice_priority TEXT,
    voice_gender_preference TEXT,
    voice_additional_notes TEXT,
    voice_status TEXT DEFAULT 'pending_curation',
    voice_change_count INTEGER DEFAULT 0,
    
    -- Step 4: Agent Settings
    transfer_enabled BOOLEAN DEFAULT TRUE,
    transfer_rules JSONB DEFAULT '{}'::jsonb,
    recording_enabled BOOLEAN DEFAULT FALSE,
    call_screening_enabled BOOLEAN DEFAULT TRUE,
    integrations JSONB DEFAULT '{}'::jsonb,
    
    -- Step 5: Select Plan
    selected_plan TEXT,
    plan_details JSONB DEFAULT '{}'::jsonb,
    
    -- Step 6: Phone Number
    phone_number TEXT,
    phone_verified BOOLEAN DEFAULT FALSE,
    phone_verification_code TEXT,
    call_forwarding_enabled BOOLEAN DEFAULT FALSE,
    phone_routing_preference TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Subscription table
CREATE TABLE IF NOT EXISTS public.subscription (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    price DECIMAL(10,2),
    billing_cycle TEXT DEFAULT 'monthly',
    calls_included INTEGER,
    calls_used INTEGER DEFAULT 0,
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_onboarding
CREATE POLICY "Users can view their own onboarding" 
ON public.user_onboarding FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding" 
ON public.user_onboarding FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding" 
ON public.user_onboarding FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for agent_config
CREATE POLICY "Users can view their own agent config" 
ON public.agent_config FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own agent config" 
ON public.agent_config FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agent config" 
ON public.agent_config FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for subscription
CREATE POLICY "Users can view their own subscription" 
ON public.subscription FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" 
ON public.subscription FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.subscription FOR UPDATE 
USING (auth.uid() = user_id);

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_user_onboarding ON public.user_onboarding;
CREATE TRIGGER update_user_onboarding 
BEFORE UPDATE ON public.user_onboarding 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agent_config ON public.agent_config;
CREATE TRIGGER update_agent_config 
BEFORE UPDATE ON public.agent_config 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscription ON public.subscription;
CREATE TRIGGER update_subscription
BEFORE UPDATE ON public.subscription
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Smart Call Forwarding Rules ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.forwarding_rules (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    is_active       BOOLEAN DEFAULT TRUE NOT NULL,
    priority        INTEGER DEFAULT 1 NOT NULL,
    condition_type  TEXT NOT NULL CHECK (condition_type IN ('time', 'keyword', 'known_caller', 'always')),
    time_start      TEXT,
    time_end        TEXT,
    days_of_week    INTEGER[],
    keywords        TEXT[],
    forward_to      TEXT NOT NULL,
    forward_label   TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.forwarding_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own forwarding rules"
ON public.forwarding_rules FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_forwarding_rules ON public.forwarding_rules;
CREATE TRIGGER update_forwarding_rules
BEFORE UPDATE ON public.forwarding_rules
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Zapier Integration ────────────────────────────────────────────────────────

ALTER TABLE public.agent_config
  ADD COLUMN IF NOT EXISTS zapier_webhook_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS zapier_enabled     BOOLEAN DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS public.integration_logs (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    integration   TEXT NOT NULL DEFAULT 'zapier',
    event_type    TEXT NOT NULL,
    payload       JSONB,
    status        TEXT NOT NULL CHECK (status IN ('success','error','skipped')),
    response_code INTEGER,
    response_body TEXT,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.integration_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own integration logs"
  ON public.integration_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role inserts integration logs"
  ON public.integration_logs FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.integration_errors (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id       UUID,
    integration   TEXT NOT NULL DEFAULT 'zapier',
    event_type    TEXT,
    error_message TEXT,
    payload       JSONB,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.integration_errors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own integration errors"
  ON public.integration_errors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role inserts integration errors"
  ON public.integration_errors FOR INSERT WITH CHECK (true);

-- ─── Vapi + Calls ──────────────────────────────────────────────────────────────

ALTER TABLE public.agent_config
  ADD COLUMN IF NOT EXISTS vapi_assistant_id    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS vapi_phone_number_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS provisioning_status  TEXT DEFAULT 'pending';

CREATE TABLE IF NOT EXISTS public.calls (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vapi_call_id      TEXT UNIQUE,
  caller_number     TEXT,
  duration_seconds  INTEGER DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'completed'
                    CHECK (status IN ('completed','missed','transferred','voicemail','in_progress')),
  transcript        TEXT,
  summary           TEXT,
  recording_url     TEXT,
  event_type        TEXT,
  cost_cents        INTEGER DEFAULT 0,
  metadata          JSONB DEFAULT '{}'::jsonb,
  started_at        TIMESTAMP WITH TIME ZONE,
  ended_at          TIMESTAMP WITH TIME ZONE,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own calls"
  ON public.calls FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role inserts calls"
  ON public.calls FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS calls_user_id_idx ON public.calls(user_id);
CREATE INDEX IF NOT EXISTS calls_started_at_idx ON public.calls(started_at DESC);

-- ─── Test Call Usage (free test-call quota tracking) ───────────────────────────

CREATE TABLE IF NOT EXISTS public.test_call_usage (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  call_id           TEXT,
  month_year        TEXT NOT NULL,
  started_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at          TIMESTAMP WITH TIME ZONE,
  duration_seconds  INTEGER DEFAULT 0,
  transcript        TEXT,
  summary           TEXT,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.test_call_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own test call usage"
  ON public.test_call_usage FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test call usage"
  ON public.test_call_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test call usage"
  ON public.test_call_usage FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS test_call_usage_user_id_idx ON public.test_call_usage(user_id);
CREATE INDEX IF NOT EXISTS test_call_usage_month_year_idx ON public.test_call_usage(user_id, month_year);