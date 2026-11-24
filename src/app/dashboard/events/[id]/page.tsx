import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Clock, Users, DollarSign, Ticket, QrCode, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/copy-button'
import { mockEvents, mockAttendees, mockTickets, mockTicketTypes } from '@/lib/mock-data'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'

export function generateStaticParams() {
  return mockEvents.map((event) => ({
    id: event.id,
  }))
}

export default async function EventDetailPage(props: PageProps<'/dashboard/events/[id]'>) {
  const { id } = await props.params
  const event = mockEvents.find(e => e.id === id)

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto text-center py-24">
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-white/60 mb-6 text-sm">This event doesn&apos;t exist or has been deleted.</p>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  const eventTickets = mockTickets.filter(t => t.event_id === event.id)
  const eventAttendees = eventTickets.map(t => {
    const attendee = mockAttendees.find(a => a.id === t.attendee_id)
    const ticketType = mockTicketTypes.find(tt => tt.id === t.ticket_type_id)
    return { ...t, attendee, ticketType }
  })
  const checkedIn = eventTickets.filter(t => t.status === 'used').length
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/e/${event.slug}`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tight">{event.title}</h1>
            <Badge variant={event.is_published ? 'success' : 'warning'}>
              {event.is_published ? 'Live Pass' : 'Draft'}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-indigo-400" />{formatDate(event.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-purple-400" />{event.time} — {event.end_time}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-rose-400" />{event.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href={`/dashboard/events/${event.id}/check-in`}>
            <Button className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-95">
              <QrCode className="h-4 w-4" />
              Door Scanner
            </Button>
          </Link>
          <Link href={`/e/${event.slug}`} target="_blank">
            <Button variant="outline" size="md" className="gap-1.5 text-xs">
              <ExternalLink className="h-3.5 w-3.5" />
              Preview Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Share Link (Apple Card) */}
      <Card className="bg-[#121216]/90 border-white/10 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Shareable Pass URL
              </p>
              <code className="text-xs sm:text-sm font-mono text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 block sm:inline-block truncate max-w-lg">
                {shareUrl}
              </code>
            </div>
            <CopyButton text={shareUrl} />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          { label: 'Total Capacity', value: event.total_tickets, icon: Ticket, color: 'text-indigo-400' },
          { label: 'Passes Sold', value: event.sold_tickets, icon: Users, color: 'text-emerald-400' },
          { label: 'Revenue', value: formatCurrency(event.revenue), icon: DollarSign, color: 'text-amber-400' },
          { label: 'Door Scanned', value: `${checkedIn} checked in`, icon: QrCode, color: 'text-purple-400' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#121216]/75">
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  {stat.label}
                </span>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ticket Types Table */}
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <h2 className="font-extrabold text-base text-white mb-4 tracking-tight">Ticket Tiers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 font-bold uppercase tracking-wider">
                  <th className="text-left pb-3">Tier Name</th>
                  <th className="text-left pb-3">Price</th>
                  <th className="text-left pb-3">Claimed / Cap</th>
                  <th className="text-right pb-3">Gross Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {event.ticket_types.map((tt) => (
                  <tr key={tt.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 font-bold text-white">{tt.name}</td>
                    <td className="py-3.5 text-white/80">{tt.price === 0 ? 'Free' : formatCurrency(tt.price)}</td>
                    <td className="py-3.5 text-white/80">{tt.sold} / {tt.quantity}</td>
                    <td className="py-3.5 text-right font-bold text-white">{formatCurrency(tt.price * tt.sold)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendees Table */}
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-base text-white tracking-tight">
              Attendee Roster ({eventAttendees.length})
            </h2>
            <Link href={`/dashboard/events/${event.id}/check-in`} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
              Open Live Scanner →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 font-bold uppercase tracking-wider">
                  <th className="text-left pb-3">Guest</th>
                  <th className="text-left pb-3">Email</th>
                  <th className="text-left pb-3">Tier</th>
                  <th className="text-right pb-3">Door Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {eventAttendees.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                        {item.attendee?.name.charAt(0)}
                      </div>
                      <span>{item.attendee?.name}</span>
                    </td>
                    <td className="py-3.5 text-white/50 font-mono">{item.attendee?.email}</td>
                    <td className="py-3.5 text-indigo-400 font-semibold">{item.ticketType?.name}</td>
                    <td className="py-3.5 text-right">
                      <Badge variant={item.status === 'used' ? 'default' : 'success'}>
                        {item.status === 'used' ? 'Checked In' : 'Valid'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
