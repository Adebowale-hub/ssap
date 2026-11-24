'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, Search, QrCode, AlertCircle, Camera, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { EventWithStats } from '@/lib/types'
import { mockTickets, mockAttendees, mockTicketTypes } from '@/lib/mock-data'

export function CheckInClient({ event }: { event: EventWithStats }) {
  const [ticketState, setTicketState] = useState(
    mockTickets.filter(t => t.event_id === event.id).map(t => ({
      ...t,
      attendee: mockAttendees.find(a => a.id === t.attendee_id),
      ticketType: mockTicketTypes.find(tt => tt.id === t.ticket_type_id),
    }))
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [scanInput, setScanInput] = useState('')
  const [lastScanResult, setLastScanResult] = useState<{
    status: 'success' | 'already_used' | 'not_found'
    message: string
    ticketId?: string
    attendeeName?: string
  } | null>(null)

  const checkedInCount = ticketState.filter(t => t.status === 'used').length
  const totalTickets = ticketState.length

  const handleCheckIn = (ticketId: string) => {
    const cleanId = ticketId.trim().toLowerCase()
    const ticket = ticketState.find(t => t.id.toLowerCase() === cleanId)

    if (!ticket) {
      setLastScanResult({
        status: 'not_found',
        message: `Pass ID "${ticketId}" not recognized`,
      })
      return
    }

    if (ticket.status === 'used') {
      setLastScanResult({
        status: 'already_used',
        message: `Already Admitted! Checked in earlier.`,
        ticketId: ticket.id,
        attendeeName: ticket.attendee?.name,
      })
      return
    }

    // Mark as used
    setTicketState(prev =>
      prev.map(t => (t.id === ticket.id ? { ...t, status: 'used' as const } : t))
    )

    setLastScanResult({
      status: 'success',
      message: `Pass Verified! Welcome, ${ticket.attendee?.name || 'Guest'}`,
      ticketId: ticket.id,
      attendeeName: ticket.attendee?.name,
    })
  }

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!scanInput.trim()) return

    let rawId = scanInput.trim()
    try {
      const parsed = JSON.parse(rawId)
      if (parsed.ticketId) {
        rawId = parsed.ticketId
      }
    } catch {
      // Plain ID
    }

    handleCheckIn(rawId)
    setScanInput('')
  }

  const filteredTickets = ticketState.filter(t => {
    const q = searchQuery.toLowerCase()
    return (
      t.id.toLowerCase().includes(q) ||
      t.attendee?.name.toLowerCase().includes(q) ||
      t.attendee?.email.toLowerCase().includes(q)
    )
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href={`/dashboard/events/${event.id}`}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {event.title}
      </Link>

      {/* Top Status Banner */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-white tracking-tight">Door Scanner</h1>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-xs text-white/50 mt-0.5">{event.title}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/50 font-medium">Admitted</p>
          <p className="text-xl font-black text-emerald-400 font-mono">
            {checkedInCount} <span className="text-white/30 text-sm">/ {totalTickets}</span>
          </p>
        </div>
      </div>

      {/* iPhone Camera Viewfinder Simulation */}
      <div className="relative rounded-[36px] bg-[#0c0c0e] border border-white/15 p-6 overflow-hidden shadow-2xl">
        {/* Scanning Target Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-gradient-to-b from-[#18181f]/80 to-[#101014]/90 rounded-3xl border border-white/10 flex flex-col items-center justify-center overflow-hidden">
          {/* Laser Scanline */}
          <div className="absolute inset-x-8 top-12 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-scanline pointer-events-none" />

          {/* Viewfinder Reticle Corners */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
            {/* Top-Left */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
            {/* Top-Right */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
            {/* Bottom-Left */}
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
            {/* Bottom-Right */}
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

            <div className="text-center p-4">
              <Camera className="h-8 w-8 text-white/30 mx-auto mb-2" />
              <p className="text-[11px] font-semibold text-white/60">Position QR Code Here</p>
              <p className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">Camera Active</p>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleScanSubmit} className="mt-5 flex gap-2.5">
          <Input
            id="ticket-scanner-input"
            value={scanInput}
            onChange={e => setScanInput(e.target.value)}
            placeholder="Type ticket ID (e.g. tkt-1) or scan barcode..."
            className="flex-1 font-mono text-sm h-12"
            autoFocus
          />
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6 font-bold bg-white text-black hover:bg-zinc-200 active:scale-95"
          >
            Verify
          </Button>
        </form>

        {/* Scan Status Feedback */}
        {lastScanResult && (
          <div
            className={`mt-4 p-4 rounded-2xl flex items-center gap-3 border transition-all ${
              lastScanResult.status === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                : lastScanResult.status === 'already_used'
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
            }`}
          >
            {lastScanResult.status === 'success' && <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />}
            {lastScanResult.status === 'already_used' && <AlertCircle className="h-6 w-6 text-amber-400 shrink-0" />}
            {lastScanResult.status === 'not_found' && <XCircle className="h-6 w-6 text-rose-400 shrink-0" />}

            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm">{lastScanResult.message}</p>
              {lastScanResult.ticketId && (
                <p className="text-[11px] font-mono opacity-70 mt-0.5">
                  ID: {lastScanResult.ticketId}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Manual Guest List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-sm text-white uppercase tracking-wider">
            Guest List ({filteredTickets.length})
          </h2>

          <div className="relative w-52">
            <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              placeholder="Search name or ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-white/10 bg-white/[0.05] text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {filteredTickets.map(ticket => {
            const isCheckedIn = ticket.status === 'used'
            return (
              <div key={ticket.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs text-white truncate">{ticket.attendee?.name}</p>
                    <Badge variant="outline" className="text-[10px] py-0 px-2">
                      {ticket.ticketType?.name}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-white/40 font-mono mt-0.5">
                    {ticket.id} · {ticket.attendee?.email}
                  </p>
                </div>

                {isCheckedIn ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Admitted
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCheckIn(ticket.id)}
                    className="text-xs h-8 px-3 text-white font-semibold hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40"
                  >
                    Check In
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
