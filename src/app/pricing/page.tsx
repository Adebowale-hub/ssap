import Link from 'next/link'
import { Check, X, Sparkles, ArrowRight, ShieldCheck, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Free Starter',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to launch and collect ticket payments.',
    cta: 'Get Started Free',
    href: '/login',
    highlighted: false,
    badge: 'Essential',
    features: [
      { text: 'Up to 3 active events', included: true },
      { text: 'Up to 200 tickets per event', included: true },
      { text: 'Full payment collection', included: true },
      { text: 'Apple Wallet style digital passes', included: true },
      { text: 'Shareable links for social & chat', included: true },
      { text: 'Live attendee roster', included: true },
      { text: 'Standard email support', included: true },
      { text: 'Camera QR door check-in', included: false },
      { text: 'Team staff accounts (up to 5)', included: false },
      { text: 'Attendee analytics & insights', included: false },
      { text: 'Custom brand accents & domains', included: false },
    ],
  },
  {
    name: 'SSAP Pro',
    price: '$12',
    period: '/month',
    description: 'Full power for growing community organizers and production events.',
    cta: 'Start Pro Experience',
    href: '/login',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited events & ticket passes', included: true },
      { text: 'Unlimited ticket capacity', included: true },
      { text: 'Full payment collection with 0% extra fee', included: true },
      { text: 'Apple Wallet style digital passes', included: true },
      { text: 'Camera QR door check-in scanner', included: true },
      { text: 'Real-time sales & attendance analytics', included: true },
      { text: 'Team collaboration (up to 5 scanners)', included: true },
      { text: 'Custom branding & domain support', included: true },
      { text: 'CSV attendee export & reports', included: true },
      { text: 'Promo codes & waitlist automation', included: true },
      { text: 'VIP 24/7 priority support', included: true },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white relative overflow-x-hidden flex flex-col">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[150px]" />
      </div>

      {/* Dynamic Nav Bar */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto h-14 rounded-full bg-[#16161b]/80 border border-white/10 backdrop-blur-2xl px-5 flex items-center justify-between shadow-xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-extrabold text-sm text-white">SSAP</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-semibold text-white/60 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200 text-xs font-bold px-4 py-1.5 active:scale-95">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-14 sm:py-20 flex-1">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/10 text-white/80 mb-4 backdrop-blur-md">
            <Crown className="h-3.5 w-3.5 text-amber-400" />
            <span>Transparent, Zero-Friction Plans</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Plans built for creators
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/60">
            Start completely free. Upgrade to Pro when you need live door check-in, team access, and unlimited capacity.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[32px] p-8 sm:p-9 relative transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#1c1c24] to-[#121217] border-2 border-indigo-500/50 shadow-[0_20px_60px_rgba(99,102,241,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)]'
                  : 'bg-[#121216]/85 border border-white/10 shadow-2xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="purple" className="px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-white">{plan.name}</h2>
                {!plan.highlighted && (
                  <Badge variant="outline" className="text-xs">
                    {plan.badge}
                  </Badge>
                )}
              </div>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-xs font-semibold text-white/50">{plan.period}</span>
              </div>
              <p className="text-xs text-white/60 mb-6">{plan.description}</p>

              <Link href={plan.href} className="block mb-8">
                <Button
                  size="lg"
                  className={`w-full font-bold h-12 active:scale-95 transition-all ${
                    plan.highlighted
                      ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                  What&apos;s Included
                </p>
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3 text-xs">
                    {feature.included ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-white/5 text-white/20 flex items-center justify-center shrink-0">
                        <X className="h-3 w-3" />
                      </div>
                    )}
                    <span className={feature.included ? 'text-white/80 font-medium' : 'text-white/30 line-through'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-white/40">
        <p>© 2025 SSAP · Minimalist Event Ticketing</p>
      </footer>
    </div>
  )
}
