import Header from '@/components/landing/header'
import Hero from '@/components/landing/hero'
import Stats from '@/components/landing/stats'
import DemoAudio from '@/components/landing/demo-audio'
import Features from '@/components/landing/features'
import Industries from '@/components/landing/industries'
import HowItWorks from '@/components/landing/how-it-works'
import Integrations from '@/components/landing/integrations'
import Pricing from '@/components/landing/pricing'
import CostComparison from '@/components/landing/cost-comparison'
import CallCta from '@/components/landing/call-cta'
import Faq from '@/components/landing/faq'
import CtaBanner from '@/components/landing/cta-banner'
import Footer from '@/components/landing/footer'
import { FadeIn } from '@/components/landing/fade-in'

const siteUrl = "https://nexusconsultancy.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NEXUS AI",
  "alternateName": "NEXUS AI Receptionist",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/opengraph-image`,
  },
  "description": "AI receptionist service that answers calls 24/7/365, books appointments, takes messages, and handles customer inquiries for businesses of all sizes. Starts at $25/month.",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "sales@nexusconsultancy.app",
      "availableLanguage": "English",
    },
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "sales@nexusconsultancy.app",
      "availableLanguage": "English",
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NEXUS AI Receptionist",
  "alternateName": "NEXUS",
  "url": siteUrl,
  "description": "AI-powered phone answering service for businesses of all sizes — from local shops to international firms. Answers calls 24/7/365, books appointments via Google Calendar, qualifies leads, sends call summaries, and integrates with 7,000+ apps via Zapier.",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Virtual Receptionist",
  "operatingSystem": "Web",
  "featureList": [
    "24/7/365 AI call answering",
    "Appointment scheduling via Google Calendar",
    "Call transcripts and summaries",
    "CRM integration via Zapier",
    "Custom voice and persona",
    "Call routing and forwarding",
    "Unlimited concurrent calls",
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Lite",
      "price": "25.00",
      "priceCurrency": "USD",
      "description": "30 calls/month with 24/7/365 AI answering, Google Calendar booking, email summaries",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/signup`,
    },
    {
      "@type": "Offer",
      "name": "Pro",
      "price": "149.00",
      "priceCurrency": "USD",
      "description": "500 minutes/month, SMS + email confirmations, Slack alerts, smart call forwarding, Zapier integration",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/signup`,
    },
    {
      "@type": "Offer",
      "name": "Scale",
      "price": "349.00",
      "priceCurrency": "USD",
      "description": "1,500 minutes/month, multi-destination routing, Salesforce and HubSpot integrations, 90-day call recordings",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/signup`,
    },
  ],
  "provider": {
    "@type": "Organization",
    "name": "NEXUS AI",
    "url": siteUrl,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can NEXUS actually do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NEXUS answers calls in 1 ring, 24/7/365. It collects caller information, answers questions about your business, books appointments, qualifies leads, and sends you instant summaries after every call. It can also transfer urgent calls to you or your team when needed.",
      },
    },
    {
      "@type": "Question",
      "name": "How fast does NEXUS answer calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NEXUS answers in 1 ring — faster than most call centers. Callers never wait on hold or hear a busy signal. Every call is answered instantly, even during your busiest hours.",
      },
    },
    {
      "@type": "Question",
      "name": "Can NEXUS handle multiple calls at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NEXUS handles unlimited parallel calls simultaneously. No busy signals, no hold times — every caller gets answered instantly, even during peak hours or when your team is already on other calls.",
      },
    },
    {
      "@type": "Question",
      "name": "Does NEXUS work after business hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NEXUS answers calls 24/7/365, including nights, weekends, and public holidays. Every lead that calls outside your office hours gets answered, qualified, and logged.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I keep my existing phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You keep your current business number and set up call forwarding to NEXUS — a 5-minute change with your phone provider. No number porting required.",
      },
    },
    {
      "@type": "Question",
      "name": "What integrations does NEXUS support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pro and above includes a Zapier webhook that connects to 7,000+ apps including CRMs, Google Sheets, Slack, and Gmail. Scale customers get direct connections to Outlook, Salesforce, and HubSpot.",
      },
    },
    {
      "@type": "Question",
      "name": "Will callers know they are talking to AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most don't realise it. Those who do typically prefer getting help immediately over navigating phone trees or leaving voicemail. You can choose to disclose upfront that callers are speaking with an AI assistant.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens if NEXUS cannot answer a question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a caller asks something outside its knowledge, NEXUS does not guess. It takes a detailed message, captures the caller's contact info, and immediately notifies you via SMS or email so you can follow up.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "NEXUS AI Receptionist",
  "url": siteUrl,
  "description": "AI receptionists that never miss a call. Answer calls 24/7/365, book appointments, take messages.",
};

export default function Home() {
  return (
    <div className="bg-slate-600">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <main>
        {/* 1. Pain hook — The Reality */}
        <FadeIn>
          <Stats />
        </FadeIn>

        {/* 2. Solution intro */}
        <FadeIn>
          <Hero />
        </FadeIn>

        {/* 3. Hear AVA before seeing price — kills last objection */}
        <DemoAudio />

        {/* 4. Full cost breakdown */}
        <CostComparison />

        {/* 5. Buy moment */}
        <FadeIn>
          <Pricing />
        </FadeIn>

        <FadeIn>
          <Features />
        </FadeIn>
        <Industries />
        <FadeIn>
          <HowItWorks />
        </FadeIn>
        <Integrations />
        <CallCta />
        <Faq />
        <FadeIn>
          <CtaBanner />
        </FadeIn>
      </main>
      <Footer />
    </div>
  )
}
