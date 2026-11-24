import Link from 'next/link'
import { Calendar, Share2, Users, CreditCard, QrCode, UserPlus, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      {/* 1. Nav Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-xl font-bold tracking-tight">
            <span>SSAP</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mb-0.5 inline-block" />
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Pricing
            </Link>
            <Link href="/login">
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-all"
              >
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-indigo-900 dark:to-indigo-600 dark:opacity-15" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-indigo-100 bg-indigo-50/70 text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 mb-8 transition-colors">
              <Zap className="h-3.5 w-3.5 fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400" />
              <span>Simple, modern ticketing SaaS</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
              Event tickets,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300">
                made simple.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Create events in seconds, share one clean link with your attendees, and start selling tickets without unnecessary complexity.
            </p>

            {/* Hero CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 shadow-sm hover:shadow-indigo-500/25 transition-all group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium px-8 transition-colors"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Features Grid (2x3) */}
        <section className="py-20 sm:py-28 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400">
                Features
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Everything you need to host effortlessly
              </h2>
              <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                A focused suite of tools built for independent organizers, communities, and fast-growing teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1: Calendar */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Create Events
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Set up events in seconds. Customize dates, ticket capacity, pricing, and descriptions with zero hassle.
                </p>
              </div>

              {/* Feature 2: Share2 */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                  <Share2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Share Links
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  One link for attendees to get tickets. Share on social platforms, emails, or messaging channels seamlessly.
                </p>
              </div>

              {/* Feature 3: Users */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Track Attendees
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  See who&apos;s coming in real-time. View live registrations, attendee details, and capacity progress instantly.
                </p>
              </div>

              {/* Feature 4: CreditCard */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Collect Payments
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Accept payments for paid events. Frictionless checkout experience with secure, integrated payment processing.
                </p>
              </div>

              {/* Feature 5: QrCode (Premium) */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="flex items-center justify-between mb-5">
                  <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-none font-medium text-[11px] px-2.5 py-0.5">
                    Premium
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  QR Check-in
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Scan tickets at the door. Fast mobile ticket validation prevents duplicate entries and keeps queues moving fast.
                </p>
              </div>

              {/* Feature 6: UserPlus (Premium) */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="flex items-center justify-between mb-5">
                  <div className="h-11 w-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-none font-medium text-[11px] px-2.5 py-0.5">
                    Premium
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Team Access
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Collaborate with your team. Invite co-organizers, coordinators, and check-in staff with role-based permissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How it Works */}
        <section className="py-20 sm:py-28 border-t border-zinc-100 dark:border-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400">
                Workflow
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                How it Works
              </h2>
              <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                Get up and running in minutes with three straightforward steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 sm:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20 mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  Create your event
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Add your event title, date, location, and ticket options. Set up free registrations or paid tiers in seconds.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 sm:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20 mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  Share the link
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Publish and get a clean, branded link to share via social media, chat, or email. Attendees can claim tickets without friction.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 sm:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20 mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  Manage attendees
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Watch live sign-ups, check in guests at the entrance using fast QR code scans, and export attendee lists anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA Section */}
        <section className="py-20 sm:py-28 border-t border-zinc-100 dark:border-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900 dark:bg-zinc-900/90 text-white px-8 py-16 sm:px-16 sm:py-20 text-center border border-zinc-800">
              {/* Subtle background glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to simplify your events?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto">
                Join organizers who use SSAP for fast, hassle-free ticketing. Create your first event in less than 2 minutes.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 h-12 shadow-md shadow-indigo-500/20 transition-all group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            <span>SSAP</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mb-0.5 inline-block" />
            <span className="text-zinc-400 dark:text-zinc-500 font-normal ml-3">
              © 2025 SSAP. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <Link
              href="/pricing"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
