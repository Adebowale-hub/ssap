import Link from 'next/link'
import { Calendar, MapPin, Clock, Ticket, Sparkles, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { mockEvents } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { TicketForm } from './ticket-form'

export function generateStaticParams() {
  return mockEvents.map((event) => ({
    slug: event.slug,
  }))
}

export default async function PublicEventPage(props: PageProps<'/e/[slug]'>) {
  const { slug } = await props.params
  const event = mockEvents.find(e => e.slug === slug)

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-white/60 mb-6 text-sm">This event link may be incorrect or inactive.</p>
        <Link href="/" className="text-xs font-semibold px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200">
          Return to SSAP
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-600/20 to-transparent blur-[140px]" />
      </div>

      {/* Apple Keynote Style Header */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto h-14 rounded-full bg-[#16161a]/80 border border-white/10 backdrop-blur-2xl px-5 flex items-center justify-between shadow-xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-extrabold text-sm text-white">SSAP</span>
          </Link>

          <Badge variant="blue" className="text-xs font-semibold gap-1">
            <Sparkles className="h-3 w-3" />
            Official Pass Portal
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Event Narrative (Left) */}
          <div className="md:col-span-3 space-y-6">
            <div className="space-y-4">
              <Badge variant="purple" className="text-xs font-semibold uppercase tracking-wider px-3">
                Live Admission
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {event.title}
              </h1>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2.5 text-xs text-white/80">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                  <span className="font-semibold">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>{event.time} {event.end_time && `— ${event.end_time}`}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-rose-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="font-bold text-sm text-white uppercase tracking-wider mb-2">
                About this Experience
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                {event.description}
              </p>
            </Card>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-indigo-400 shrink-0" />
              <span>
                All tickets generate an instant mobile pass compatible with Apple Wallet and phone camera scanners.
              </span>
            </div>
          </div>

          {/* Ticket Claim / Checkout Sheet (Right) */}
          <div className="md:col-span-2 space-y-4 sticky top-24">
            <h2 className="font-bold text-sm uppercase tracking-wider text-white/50">
              Select Ticket Tier
            </h2>

            {event.ticket_types.map((tt) => (
              <TicketForm key={tt.id} ticketType={tt} eventTitle={event.title} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-white/40">
        <p>Powered by <Link href="/" className="font-bold text-white hover:underline">SSAP</Link> · iPhone Event Experience</p>
      </footer>
    </div>
  )
}
