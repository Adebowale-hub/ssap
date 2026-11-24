import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Download, ShieldCheck, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockTickets, mockAttendees, mockEvents, mockTicketTypes } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import QRCode from 'qrcode'

export function generateStaticParams() {
  return mockTickets.map((ticket) => ({
    id: ticket.id,
  }))
}

export default async function TicketPage(props: PageProps<'/ticket/[id]'>) {
  const { id } = await props.params
  const ticket = mockTickets.find(t => t.id === id)

  if (!ticket) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <ShieldCheck className="h-8 w-8 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Pass Not Found</h1>
        <p className="text-white/60 text-sm mb-6 max-w-xs">
          This digital event pass doesn&apos;t exist or has expired.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-95 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to SSAP
        </Link>
      </div>
    )
  }

  const attendee = mockAttendees.find(a => a.id === ticket.attendee_id)
  const event = mockEvents.find(e => e.id === ticket.event_id)
  const ticketType = mockTicketTypes.find(tt => tt.id === ticket.ticket_type_id)

  const qrData = JSON.stringify({
    ticketId: ticket.id,
    eventId: ticket.event_id,
    attendee: attendee?.name,
    tier: ticketType?.name,
    valid: ticket.status === 'valid',
  })

  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    width: 320,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  })

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Ambient Glows (Apple Aurora) */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Floating Bar */}
      <header className="w-full max-w-sm mb-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white/80 border border-white/10 backdrop-blur-xl transition-all active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          SSAP Pass
        </Link>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Live Ticket
          </span>
        </div>
      </header>

      {/* THE APPLE WALLET PASS CARD */}
      <div className="w-full max-w-sm z-10 transition-transform duration-300 hover:scale-[1.01]">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#18181f] via-[#121216] to-[#0c0c0e] border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.2)]">
          {/* Top Holographic Header Banner */}
          <div className="relative px-6 pt-6 pb-5 bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-blue-900/60 border-b border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-indigo-500/40">
                  S
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                    SSAP PASS
                  </p>
                  <p className="text-xs font-semibold text-white/90">Event Admission</p>
                </div>
              </div>

              <Badge
                variant={ticket.status === 'used' ? 'default' : 'success'}
                className="text-[11px] font-semibold tracking-wide uppercase px-3 py-0.5"
              >
                {ticket.status === 'used' ? 'Checked In' : 'Valid'}
              </Badge>
            </div>

            {/* Event Name */}
            <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
              {event?.title}
            </h1>
            <p className="text-xs text-white/70 mt-1 flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Official Digital Pass
            </p>
          </div>

          {/* Wallet Perforation Cutouts */}
          <div className="relative h-6 flex items-center justify-between">
            <div className="wallet-notch-left" />
            <div className="w-full border-t border-dashed border-white/20 mx-4" />
            <div className="wallet-notch-right" />
          </div>

          {/* Pass Body Content */}
          <div className="px-6 py-4 space-y-5">
            {/* 2-Column Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Pass Holder
                </p>
                <p className="text-sm font-bold text-white truncate mt-0.5">
                  {attendee?.name}
                </p>
                <p className="text-[11px] text-white/50 truncate">
                  {attendee?.email}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Tier / Section
                </p>
                <p className="text-sm font-bold text-indigo-400 mt-0.5">
                  {ticketType?.name}
                </p>
                <p className="text-[11px] text-white/50">
                  {ticketType?.price === 0 ? 'Complimentary' : 'Paid Entry'}
                </p>
              </div>
            </div>

            {/* Date, Time & Venue Grid */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Calendar className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="font-semibold">{event ? formatDate(event.date) : ''}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Clock className="h-4 w-4 text-purple-400 shrink-0" />
                <span>
                  {event?.time} {event?.end_time && `— ${event.end_time}`}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
                <span className="truncate">{event?.location}</span>
              </div>
            </div>

            {/* QR Code Container (Crisp White Apple Scanner Card) */}
            <div className="flex flex-col items-center justify-center p-5 bg-white rounded-[24px] shadow-2xl relative group">
              {/* Scan Frame */}
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Pass for ${ticket.id}`}
                  className="w-48 h-48 rounded-xl object-contain"
                />
              </div>

              <div className="mt-3 text-center">
                <p className="text-[11px] font-mono font-bold tracking-widest text-black">
                  {ticket.id}
                </p>
                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-0.5">
                  Hold near scanner at gate
                </p>
              </div>
            </div>

            {/* Apple Wallet Action Button */}
            <div className="pt-1 pb-2">
              <button
                type="button"
                className="w-full h-12 rounded-2xl bg-black hover:bg-zinc-900 active:scale-[0.98] border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer"
              >
                {/* Apple Logo SVG */}
                <svg className="h-4 w-4 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.85-11.75-14.44-6.1-9.78-10.88-20.98-14.34-33.59-3.46-12.61-5.19-24.51-5.19-35.7 0-14.34 3.58-26.31 10.74-35.91 7.16-9.6 16.32-14.53 27.49-14.78 4.9.12 10.27 1.37 16.12 3.75 5.86 2.38 9.77 3.63 11.75 3.75 1.76-.24 5.92-1.66 12.48-4.25 6.56-2.59 12.28-3.71 17.16-3.35 13.29 1.05 23.51 5.97 30.66 14.78-11.75 7.16-17.51 16.94-17.27 29.35.24 9.78 3.91 18.04 11.01 24.78 7.1 6.74 15.54 10.61 25.32 11.61-2.21 6.53-4.9 13.06-8.08 19.59zM119.22 31.84c0-7.29 2.68-14.28 8.04-20.97 5.36-6.69 12.04-10.87 20.04-12.54.49 1.95.73 3.97.73 6.06 0 7.39-2.8 14.37-8.4 20.94-5.6 6.57-12.39 10.59-20.41 12.06z" />
                </svg>
                <span>Add to Apple Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Dock */}
      <div className="w-full max-w-sm mt-5 flex items-center justify-center gap-3 z-10">
        <button
          type="button"
          className="flex-1 py-2.5 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 backdrop-blur-lg transition-all cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share Pass
        </button>

        <button
          type="button"
          className="flex-1 py-2.5 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 backdrop-blur-lg transition-all cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" />
          Save Offline
        </button>
      </div>

      {/* Footer Branding */}
      <footer className="mt-8 text-center z-10">
        <p className="text-[11px] text-white/30 tracking-wider uppercase font-medium">
          Secured by SSAP · Apple Wallet Ready
        </p>
      </footer>
    </div>
  )
}
