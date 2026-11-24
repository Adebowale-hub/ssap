import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with event ticketing.',
    cta: 'Get Started Free',
    href: '/login',
    highlighted: false,
    features: [
      { text: 'Up to 3 active events', included: true },
      { text: 'Up to 200 tickets per event', included: true },
      { text: 'Payment collection', included: true },
      { text: 'Shareable ticket links', included: true },
      { text: 'Basic attendee management', included: true },
      { text: 'Email support', included: true },
      { text: 'Analytics & insights', included: false },
      { text: 'QR code check-in', included: false },
      { text: 'Team members', included: false },
      { text: 'Custom branding', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '$12',
    period: '/month',
    description: 'Everything you need for professional event management.',
    cta: 'Start Premium',
    href: '/login',
    highlighted: true,
    features: [
      { text: 'Unlimited events & tickets', included: true },
      { text: 'Payment collection', included: true },
      { text: 'Shareable ticket links', included: true },
      { text: 'Advanced attendee management', included: true },
      { text: 'Analytics & attendee insights', included: true },
      { text: 'QR code check-in', included: true },
      { text: 'Team members (up to 5)', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'Email notifications', included: true },
      { text: 'CSV export', included: true },
      { text: 'Waitlist mode', included: true },
      { text: 'Discount / promo codes', included: true },
      { text: 'Early access to new features', included: true },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Nav */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            S<span className="text-indigo-500">S</span>AP
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm font-medium">Pricing</Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Start free and upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlighted ? 'border-indigo-500 dark:border-indigo-500 ring-1 ring-indigo-500' : ''}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                  {plan.highlighted && <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Popular</Badge>}
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-zinc-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-zinc-500 mb-6">{plan.description}</p>

                <Link href={plan.href}>
                  <Button
                    className={`w-full ${plan.highlighted ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-zinc-300 dark:text-zinc-600 shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-zinc-400 dark:text-zinc-600'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
          © 2025 SSAP. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
