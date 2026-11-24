import Link from 'next/link'
import { Plus, Calendar, Users, DollarSign, MapPin, QrCode, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react'
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
    <div className="space-y-8">
      {/* Header with Welcome & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tight text-white">Events</h1>
            <Badge variant="blue" className="text-xs">
              Live OS
            </Badge>
          </div>
          <p className="text-white/50 text-sm mt-1">
            {mockEvents.length} of {FREE_PLAN_LIMITS.maxEvents} events used · Free Plan
          </p>
        </div>

        <Link href="/dashboard/events/new">
          <Button
            size="md"
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-bold px-5 gap-2 shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* iOS Activity & Revenue Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Total Events */}
        <Card className="relative overflow-hidden group hover:border-white/20">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                Active Events
              </span>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">{mockEvents.length}</span>
              <span className="text-xs text-white/40">/ {FREE_PLAN_LIMITS.maxEvents} limit</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(mockEvents.length / FREE_PLAN_LIMITS.maxEvents) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Tickets Sold */}
        <Card className="relative overflow-hidden group hover:border-white/20">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                Tickets Issued
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">{totalSold}</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center">
                +14% this week
              </span>
            </div>
            <p className="text-[11px] text-white/40 mt-3">Across all registered attendee tiers</p>
          </CardContent>
        </Card>

        {/* Metric 3: Total Revenue */}
        <Card className="relative overflow-hidden group hover:border-white/20">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                Total Revenue
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <span className="text-3xl sm:text-4xl font-black text-white">
              {formatCurrency(totalRevenue)}
            </span>
            <p className="text-[11px] text-white/40 mt-3">Instant payouts enabled on free plan</p>
          </CardContent>
        </Card>
      </div>

      {/* Event List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">Your Event Passes</h2>
          <span className="text-xs text-white/40 font-mono">{mockEvents.length} Active</span>
        </div>

        <div className="grid gap-3.5">
          {mockEvents.map((event) => {
            const percentSold = Math.round((event.sold_tickets / event.total_tickets) * 100)
            return (
              <Card
                key={event.id}
                className="group p-5 sm:p-6 bg-[#131317]/85 hover:bg-[#18181f]/90 border border-white/[0.08] hover:border-white/20 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-extrabold text-lg text-white group-hover:text-indigo-300 transition-colors truncate">
                        {event.title}
                      </h3>
                      <Badge variant={event.is_published ? 'success' : 'warning'}>
                        {event.is_published ? 'Live' : 'Draft'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1.5 truncate max-w-xs">
                        <MapPin className="h-3.5 w-3.5 text-rose-400" />
                        {event.location}
                      </span>
                    </div>

                    {/* Progress Bar for Tickets */}
                    <div className="pt-2 max-w-sm">
                      <div className="flex justify-between text-[11px] text-white/50 mb-1">
                        <span>{event.sold_tickets} claimed</span>
                        <span>{percentSold}% of {event.total_tickets} cap</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions & Shortcut Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-white/40">Revenue</p>
                      <p className="font-extrabold text-base text-white">
                        {formatCurrency(event.revenue)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/events/${event.id}/check-in`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs font-semibold gap-1.5 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 active:scale-95"
                        >
                          <QrCode className="h-3.5 w-3.5" />
                          Door Scan
                        </Button>
                      </Link>

                      <Link href={`/dashboard/events/${event.id}`}>
                        <Button
                          size="sm"
                          className="h-8 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white active:scale-95"
                        >
                          Manage
                          <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
