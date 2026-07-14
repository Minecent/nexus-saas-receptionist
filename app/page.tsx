import Script from 'next/script'
import Header from '@/components/landing/header'
import Hero from '@/components/landing/hero'
import Stats from '@/components/landing/stats'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/how-it-works'
import Detail from '@/components/landing/detail'
import CostComparison from '@/components/landing/cost-comparison'
import Industries from '@/components/landing/industries'
import Integrations from '@/components/landing/integrations'
import Testimonials from '@/components/landing/testimonials'
import Pricing from '@/components/landing/pricing'
import Faq from '@/components/landing/faq'
import CtaBanner from '@/components/landing/cta-banner'
import Footer from '@/components/landing/footer'
import DemoAudio from '@/components/landing/demo-audio'
import CallCta from '@/components/landing/call-cta'

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NEXUS AI",
  "url": "https://nexusconsultancy.app",
  "logo": "https://nexusconsultancy.app/logo.png",
  "description": "AI receptionist service that answers calls 24/7/365, books appointments, takes messages, and handles customer inquiries for businesses of all sizes. Starts at $25/month.",
  "sameAs": []
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "NEXUS AI Receptionist",
  "description": "AI-powered phone answering service for businesses of all sizes \u2014 from local shops to international firms. Answers calls 24/7/365, books appointments via Google Calendar, qualifies leads, sends call summaries, and integrates with 7,000+ apps via Zapier.",
  "brand": {
    "@type": "Brand",
    "name": "NEXUS AI"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "25",
    "highPrice": "349",
    "priceCurrency": "USD",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "name": "Lite",
        "price": "25",
        "priceCurrency": "USD",
        "description": "30 calls/month with 24/7/365 AI answering, Google Calendar booking, email summaries"
      },
      {
        "@type": "Offer",
        "name": "Pro",
        "price": "149",
        "priceCurrency": "USD",
        "description": "200 calls/month with lead qualification, SMS confirmations, Zapier integration"
      },
      {
        "@type": "Offer",
        "name": "Scale",
        "price": "349",
        "priceCurrency": "USD",
        "description": "600 calls/month with multiple lines, custom call flows, dedicated onboarding"
      }
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does NEXUS actually do when someone calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NEXUS answers calls in 1 ring, 24/7/365. It collects caller information, answers questions about your business, books appointments, qualifies leads, and sends you instant summaries after every call. It can also transfer urgent calls to you or your team when needed."
      }
    },
    {
      "@type": "Question",
      "name": "Will callers know they are talking to an AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NEXUS sounds natural and conversational. We believe in transparency: NEXUS can introduce itself as an AI assistant if you prefer, or simply as your receptionist."
      }
    },
    {
      "@type": "Question",
      "name": "Does NEXUS work outside business hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NEXUS answers calls 24/7/365, including nights, weekends, and public holidays. Every lead that calls outside your office hours gets answered, qualified, and logged."
      }
    },
    {
      "@type": "Question",
      "name": "Can I keep my existing phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. You simply forward your existing number to NEXUS \u2014 no porting, no new number needed unless you want one. Setup takes minutes."
      }
    }
  ]
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "NEXUS AI",
  "url": "https://nexusconsultancy.app",
  "description": "AI receptionists that never miss a call. Answer calls 24/7/365, book appointments, take messages."
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <CallCta />
        <DemoAudio />
        <Stats />
        <Features />
        <HowItWorks />
        <Detail />
        <CostComparison />
        <Industries />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
