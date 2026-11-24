import Link from 'next/link'
import { Calendar, MapPin, Clock, User, Ticket } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <h1 className="text-2xl font-bold mb-2">Ticket Not Found</h1>
        <p className="text-zinc-500 mb-6">This ticket doesn't exist or the link may be incorrect.</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← Go to SSAP
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
    type: ticketType?.name,
  })
  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    width: 240,
    margin: 1,
    color: {
      dark: '#18181b',
      light: '#ffffff',
    },
  })

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-indigo-600 text-white p-6 text-center">
            <Link href="/" className="text-lg font-bold">
              S<span className="text-indigo-200">S</span>AP
            </Link>
            <h1 className="text-xl font-bold mt-3">{event?.title}</h1>
          </div>

          {/* Dashed separator to look like a ticket tear line */}
          <div className="relative">
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-950" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-950" />
            <div className="border-t-2 border-dashed border-zinc-200 dark:border-zinc-700" />
          </div>

          <CardContent className="pt-6">
            {/* Event Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>{event ? formatDate(event.date) : ''}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-zinc-400" />
                <span>{event?.time}{event?.end_time && ` - ${event.end_time}`}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>{event?.location}</span>
              </div>
            </div>

            {/* Attendee Info */}
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-zinc-400" />
                <span className="font-medium">{attendee?.name}</span>
              </div>
              <p className="text-sm text-zinc-500 pl-6">{attendee?.email}</p>
            </div>

            {/* Ticket Info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Ticket Type</p>
                <p className="font-medium">{ticketType?.name}</p>
              </div>
              <Badge variant={ticket.status === 'used' ? 'default' : 'success'} className="text-sm">
                {ticket.status === 'used' ? 'Used' : 'Valid'}
              </Badge>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-zinc-200 dark:border-zinc-800 mb-4 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeDataUrl} alt={`QR Code for ${ticket.id}`} className="w-48 h-48 rounded-lg" />
              <p className="text-xs text-zinc-500 mt-2 font-medium">Scan for Door Check-in</p>
            </div>

            {/* Ticket ID */}
            <div className="text-center">
              <p className="text-xs text-zinc-400 uppercase tracking-wider">Ticket ID</p>
              <code className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{ticket.id}</code>
            </div>
          </CardContent>

          {/* Footer */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 text-center">
            <p className="text-xs text-zinc-400">
              This ticket was issued by{' '}
              <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">SSAP</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
