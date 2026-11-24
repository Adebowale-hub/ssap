import Link from 'next/link'
import { Plus, Calendar, Users, DollarSign, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockEvents, mockUser } from '@/lib/mock-data'
import { formatDate, formatCurrency } from '@/lib/utils'
import { FREE_PLAN_LIMITS } from '@/lib/types'

export default function DashboardPage() {
  const totalSold = mockEvents.reduce((sum, e) => sum + e.sold_tickets, 0)
  const totalRevenue = mockEvents.reduce((sum, e) => sum + e.revenue, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {mockUser.name}</h1>
          <p className="text-zinc-500 mt-1">
            {mockEvents.length}/{FREE_PLAN_LIMITS.maxEvents} events used on Free plan
          </p>
        </div>
        <Link href="/dashboard/events/new">
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Total Events</p>
                <p className="text-2xl font-bold">{mockEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Tickets Sold</p>
                <p className="text-2xl font-bold">{totalSold}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <h2 className="text-lg font-semibold mb-4">Your Events</h2>
      <div className="grid gap-4">
        {mockEvents.map((event) => (
          <Link key={event.id} href={`/dashboard/events/${event.id}`}>
            <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <Badge variant={event.is_published ? 'success' : 'warning'}>
                        {event.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">{event.sold_tickets}/{event.total_tickets} sold</p>
                    <p className="font-semibold">{formatCurrency(event.revenue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
