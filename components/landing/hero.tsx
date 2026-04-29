import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PhoneCall, CalendarCheck, MessageSquare } from 'lucide-react'

export default function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            AI-powered front desk for modern businesses
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Your receptionist,{' '}
            <span className="text-muted-foreground">always on.</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Nexus answers calls, books appointments, and handles customer inquiries 24/7 — so your
            team can focus on what matters most.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
              Start free trial
            </Button>
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href="#features" />}>
              See how it works
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">No credit card required · 14-day free trial</p>
        </div>

        <div className="flex flex-col gap-3 lg:pl-8">
          <Card size="sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PhoneCall className="size-4 text-muted-foreground" />
                <CardTitle>Incoming call — Dr. Patel&apos;s office</CardTitle>
              </div>
              <CardDescription>Just now</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                &ldquo;Hi, I&apos;d like to book an appointment for next Tuesday afternoon.&rdquo;
              </p>
              <p className="mt-2 text-sm font-medium">
                Nexus: Tuesday 2 PM is available. Shall I confirm?
              </p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarCheck className="size-4 text-muted-foreground" />
                <CardTitle>Appointment booked</CardTitle>
              </div>
              <CardDescription>2 seconds ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sarah Johnson · Tuesday, May 6 · 2:00 PM · Added to your calendar
              </p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-muted-foreground" />
                <CardTitle>Confirmation sent</CardTitle>
              </div>
              <CardDescription>Just now</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                SMS confirmation sent to patient · No staff involvement required
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
