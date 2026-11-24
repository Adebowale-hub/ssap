import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Clock, Users, DollarSign, Ticket, QrCode } from 'lucide-react'
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
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-zinc-500 mb-6">This event doesn't exist or has been deleted.</p>
        <Link href="/dashboard">
          <Button>Back to Dashboard</Button>
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
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <Badge variant={event.is_published ? 'success' : 'warning'}>
              {event.is_published ? 'Published' : 'Draft'}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(event.date)}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{event.time} - {event.end_time}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
          </div>
        </div>
      </div>

      {/* Share Link */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1">Share this link with your attendees</p>
              <code className="text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">
                {shareUrl}
              </code>
            </div>
            <CopyButton text={shareUrl} />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Tickets', value: event.total_tickets, icon: Ticket, color: 'indigo' },
          { label: 'Sold', value: event.sold_tickets, icon: Users, color: 'green' },
          { label: 'Revenue', value: formatCurrency(event.revenue), icon: DollarSign, color: 'yellow' },
          { label: 'Checked In', value: checkedIn, icon: QrCode, color: 'purple' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ticket Types */}
      <Card className="mb-6">
        <CardContent>
          <h2 className="font-semibold mb-4">Ticket Types</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left py-3 font-medium text-zinc-500">Type</th>
                  <th className="text-left py-3 font-medium text-zinc-500">Price</th>
                  <th className="text-left py-3 font-medium text-zinc-500">Sold / Total</th>
                  <th className="text-right py-3 font-medium text-zinc-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {event.ticket_types.map((tt) => (
                  <tr key={tt.id} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-3 font-medium">{tt.name}</td>
                    <td className="py-3">{tt.price === 0 ? 'Free' : formatCurrency(tt.price)}</td>
                    <td className="py-3">{tt.sold} / {tt.quantity}</td>
                    <td className="py-3 text-right">{formatCurrency(tt.price * tt.sold)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendees */}
      <Card>
        <CardContent>
          <h2 className="font-semibold mb-4">Attendees ({eventAttendees.length})</h2>
          {eventAttendees.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-8">No attendees yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-3 font-medium text-zinc-500">Name</th>
                    <th className="text-left py-3 font-medium text-zinc-500">Email</th>
                    <th className="text-left py-3 font-medium text-zinc-500">Ticket</th>
                    <th className="text-left py-3 font-medium text-zinc-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eventAttendees.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-3 font-medium">{item.attendee?.name}</td>
                      <td className="py-3 text-zinc-500">{item.attendee?.email}</td>
                      <td className="py-3">{item.ticketType?.name}</td>
                      <td className="py-3">
                        <Badge variant={item.status === 'used' ? 'default' : 'success'}>
                          {item.status === 'used' ? 'Checked In' : 'Valid'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
