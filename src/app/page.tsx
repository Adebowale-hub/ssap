import Link from 'next/link'
import { Calendar, Share2, Users, CreditCard, QrCode, UserPlus, ArrowRight, Sparkles, Check, Smartphone, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Ambient Mesh Lights (Apple Keynote Style) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/20 via-purple-600/15 to-transparent blur-[140px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] -right-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[160px]" />
      </div>

      {/* 1. FLOATING DYNAMIC ISLAND NAVIGATION */}
      <header className="sticky top-5 z-50 w-full px-4 sm:px-6">
        <div className="max-w-4xl mx-auto h-14 rounded-full bg-[#16161b]/80 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-white to-zinc-400 flex items-center justify-center font-black text-xs text-black">
              S
            </div>
            <span className="font-extrabold tracking-tight text-sm text-white">SSAP</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 hidden sm:inline-block">
              Tickets
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/pricing"
              className="text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/e/tech-meetup-lagos"
              className="text-xs font-semibold text-white/70 hover:text-white transition-colors hidden sm:inline-block"
            >
              Demo Event
            </Link>
            <Link href="/login">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-zinc-200 text-xs font-bold px-4 py-1.5 shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all active:scale-95"
              >
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-32 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* iOS Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/15 text-white/90 backdrop-blur-xl mb-8 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>The Next-Gen Ticketing SaaS · iPhone Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
              Event tickets,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                reimagined.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
              Create events in seconds, share sleek passes your attendees can add to their mobile wallet, and scan QR codes right at the door with your phone.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-bold px-8 h-12 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all group active:scale-95"
                >
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/ticket/tkt-1" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/15 font-semibold px-7 h-12 backdrop-blur-xl transition-all active:scale-95"
                >
                  <Smartphone className="mr-2 h-4 w-4 text-indigo-400" />
                  View Live Pass
                </Button>
              </Link>
            </div>
          </div>

          {/* 3. INTERACTIVE 3D IPHONE SHOWCASE */}
          <div className="mt-16 sm:mt-24 max-w-sm sm:max-w-md mx-auto relative perspective-1000">
            {/* Glow under device */}
            <div className="absolute inset-x-8 -bottom-10 h-32 bg-indigo-500/30 blur-3xl -z-10 rounded-full" />

            {/* iPhone Chassis */}
            <div className="relative rounded-[50px] p-3 bg-gradient-to-b from-[#2e2e34] via-[#1c1c20] to-[#121214] border-2 border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.4)]">
              {/* iPhone Inner Screen Frame */}
              <div className="rounded-[40px] bg-black overflow-hidden border border-white/10 p-5 relative">
                {/* Dynamic Island */}
                <div className="w-28 h-6 bg-black border border-white/15 rounded-full mx-auto mb-6 flex items-center justify-between px-3 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60" />
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-white/80">SSAP</span>
                  </div>
                </div>

                {/* Simulated Apple Wallet Pass */}
                <div className="rounded-3xl bg-gradient-to-b from-[#1b1b22] to-[#101014] border border-white/15 p-4 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                      VIP PASS
                    </span>
                    <Badge variant="success" className="text-[10px] px-2 py-0.5">
                      Confirmed
                    </Badge>
                  </div>

                  <h3 className="text-lg font-black text-white leading-tight">
                    Tech Meetup Lagos 2025
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">Victoria Island, Lagos</p>

                  <div className="mt-4 pt-4 border-t border-dashed border-white/15 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-white/40 uppercase font-bold">Attendee</p>
                      <p className="text-xs font-bold text-white">John Doe</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/40 uppercase font-bold">Door</p>
                      <p className="text-xs font-bold text-indigo-400">VIP Gate</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/40 uppercase font-bold">Date</p>
                      <p className="text-xs font-bold text-white">Feb 15</p>
                    </div>
                  </div>

                  {/* Micro QR Box */}
                  <div className="mt-4 p-3 bg-white rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-black">PASS #TKT-001</p>
                      <p className="text-[8px] text-zinc-500 font-medium">Ready for door check-in</p>
                    </div>
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <QrCode className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* iPhone Home Indicator */}
                <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-6" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. APPLE-STYLE BENTO GRID FEATURES */}
        <section className="py-24 px-4 sm:px-6 border-t border-white/[0.08] relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Core Architecture
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white">
                Engineered for speed and elegance
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60">
                Everything you need to launch, sell, and verify event tickets with an intuitive mobile-first experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: Large Bento Card */}
              <div className="md:col-span-2 rounded-[32px] bg-gradient-to-br from-[#18181f]/90 via-[#131317]/90 to-[#0e0e11] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Apple Wallet Style Passports</h3>
                <p className="mt-3 text-sm sm:text-base text-white/60 max-w-md leading-relaxed">
                  Attendees receive high-contrast digital passes featuring scannable QR codes, verified metadata, and 1-click addition to mobile wallets.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="blue">Dynamic QR</Badge>
                  <Badge variant="purple">Offline Cached</Badge>
                  <Badge variant="success">Zero Sign-In Required</Badge>
                </div>
              </div>

              {/* Feature 2: QR Door Check-In */}
              <div className="rounded-[32px] bg-[#141418]/85 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <QrCode className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">Door Check-In</h3>
                  <Badge variant="success">Instant</Badge>
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  High-speed door scanner. Staff can scan QR passes with any phone camera or type short ticket codes.
                </p>
              </div>

              {/* Feature 3: Shareable 1-Click Link */}
              <div className="rounded-[32px] bg-[#141418]/85 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">One-Link Sharing</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Clean short links (<code>/e/event-name</code>) ready to drop into WhatsApp, X, Instagram, or email blasts.
                </p>
              </div>

              {/* Feature 4: Payment Collection */}
              <div className="rounded-[32px] bg-[#141418]/85 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Free & Paid Tiers</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Collect payments for paid tickets directly into your account or offer free community admissions.
                </p>
              </div>

              {/* Feature 5: Real-time Analytics */}
              <div className="rounded-[32px] bg-[#141418]/85 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">Live Roster</h3>
                  <Badge variant="purple">Realtime</Badge>
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Real-time attendee rosters with attendance progress bars and instant search by name or ticket ID.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS (3 TACTILE STEPS) */}
        <section className="py-20 px-4 sm:px-6 border-t border-white/[0.08]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Simple 3-step execution
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Create Event',
                  desc: 'Set title, venue, and multi-tier pricing. Done in under 60 seconds.',
                  icon: Calendar,
                },
                {
                  step: '02',
                  title: 'Share Pass Link',
                  desc: 'Publish your link. Attendees select tickets and get an instant mobile pass.',
                  icon: Share2,
                },
                {
                  step: '03',
                  title: 'Scan at the Door',
                  desc: 'Open the door check-in portal and verify guest QR codes in real time.',
                  icon: QrCode,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-3xl p-7 bg-[#141418]/60 border border-white/10 backdrop-blur-xl relative overflow-hidden"
                >
                  <span className="text-4xl font-black text-white/10 absolute top-5 right-5 font-mono">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-5">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-[36px] bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-white/15 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl backdrop-blur-3xl">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Ready to elevate your events?
              </h2>
              <p className="mt-4 text-white/70 max-w-lg mx-auto text-sm sm:text-base">
                Join thousands of organizers creating modern, minimalist ticketing experiences.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-zinc-200 font-bold px-9 h-12 shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 transition-all"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-white/[0.08] py-10 px-4 sm:px-6 text-center text-xs text-white/40">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white/80">
            <span>SSAP</span>
            <span className="text-white/30 font-normal">· Minimalist Ticketing SaaS</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
