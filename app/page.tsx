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

export default function Home() {
  return (
    <div className="bg-slate-900">
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
