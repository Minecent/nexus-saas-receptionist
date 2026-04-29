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
    business_phone TEXT,
    business_email TEXT,
    business_address TEXT,
    business_hours JSONB DEFAULT '{}'::jsonb,
    timezone TEXT DEFAULT 'America/New_York',
    
    -- Step 3: Select Voice
    selected_voice_id TEXT,
    voice_settings JSONB DEFAULT '{}'::jsonb,
    
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