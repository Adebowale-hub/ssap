import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { mockEvents } from '@/lib/mock-data'
import { CheckInClient } from './check-in-client'

export function generateStaticParams() {
  return mockEvents.map(event => ({
    id: event.id,
  }))
}

export default async function CheckInPage(props: PageProps<'/dashboard/events/[id]/check-in'>) {
  const { id } = await props.params
  const event = mockEvents.find(e => e.id === id)

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-zinc-500 mb-4">The event you are trying to check in attendees for does not exist.</p>
        <Link href="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return <CheckInClient event={event} />
}
