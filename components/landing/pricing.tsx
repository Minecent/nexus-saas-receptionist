import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For solo operators getting started.',
    cta: 'Get started free',
    href: '/signup',
    highlight: false,
    features: [
      '50 calls / month',
      '1 phone number',
      'Basic scheduling',
      'Email summaries',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    description: 'For growing businesses that need reliability.',
    cta: 'Start free trial',
    href: '/signup',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited calls',
      '3 phone numbers',
      'Calendar integrations',
      'CRM sync',
      'Call transcripts',
      'Custom voice & script',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large teams with advanced requirements.',
    cta: 'Contact sales',
    href: 'mailto:sales@nexus.ai',
    highlight: false,
    features: [
      'Unlimited everything',
      'Dedicated support',
      'SLA guarantee',
      'SSO & advanced security',
      'Custom integrations',
      'White-label option',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(tier.highlight && 'ring-2 ring-primary')}
            >
              <CardHeader className="relative">
                {tier.badge && (
                  <span className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                    {tier.badge}
                  </span>
                )}
                <CardTitle className="text-base">{tier.name}</CardTitle>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {tier.period}</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="size-3.5 shrink-0 text-muted-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t-0 bg-transparent pt-0">
                <Button
                  variant={tier.highlight ? 'default' : 'outline'}
                  className="w-full"
                  nativeButton={false}
                  render={<Link href={tier.href} />}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
