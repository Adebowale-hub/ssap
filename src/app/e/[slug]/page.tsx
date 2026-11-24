import Link from 'next/link'
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { mockEvents } from '@/lib/mock-data'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-zinc-500 mb-6">This event doesn't exist or the link may be incorrect.</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← Go to SSAP
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            S<span className="text-indigo-500">S</span>AP
          </Link>
          <Badge variant="outline" className="gap-1">
            <Ticket className="h-3 w-3" />
            Event Tickets
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Event Info */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {event.time}{event.end_time && ` - ${event.end_time}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
              </div>
            </div>

            <Card>
              <CardContent>
                <h2 className="font-semibold mb-2">About this event</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Selection */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg">Get Tickets</h2>
            {event.ticket_types.map((tt) => (
              <TicketForm key={tt.id} ticketType={tt} eventTitle={event.title} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
          Powered by <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-700">SSAP</Link>
        </div>
      </footer>
    </div>
  )
}
