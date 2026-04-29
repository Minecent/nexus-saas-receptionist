import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Clock,
  CalendarDays,
  FileText,
  Plug,
  Mic,
  BarChart3,
} from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description:
      'Never miss a call. Nexus answers every inquiry around the clock, including holidays and after hours.',
  },
  {
    icon: CalendarDays,
    title: 'Appointment Scheduling',
    description:
      'Automatically checks availability and books appointments directly into your calendar system.',
  },
  {
    icon: FileText,
    title: 'Call Transcripts',
    description:
      'Every call is transcribed and summarized. Review conversations and action items in seconds.',
  },
  {
    icon: Plug,
    title: 'CRM Integration',
    description:
      'Syncs with your existing tools — HubSpot, Salesforce, and more — so no data gets lost.',
  },
  {
    icon: Mic,
    title: 'Custom Voice & Persona',
    description:
      'Set the name, tone, and script. Nexus sounds like your team, not a generic bot.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track call volume, booking rates, and peak hours to continuously improve your operations.',
  },
]

export default function Features() {
  return (
    <section id="features" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Everything your front desk needs
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Built for businesses that can&apos;t afford to miss a customer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} size="sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
