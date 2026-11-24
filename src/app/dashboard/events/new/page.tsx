'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, ArrowLeft, Sparkles, Calendar, Clock, MapPin, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TicketTypeForm {
  name: string
  price: string
  quantity: string
}

export default function NewEventPage() {
  const router = useRouter()
  const [ticketTypes, setTicketTypes] = useState<TicketTypeForm[]>([
    { name: 'General Admission', price: '0', quantity: '100' }
  ])

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '0', quantity: '50' }])
  }

  const removeTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index))
  }

  const updateTicketType = (index: number, field: keyof TicketTypeForm, value: string) => {
    const updated = [...ticketTypes]
    updated[index] = { ...updated[index], [field]: value }
    setTicketTypes(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Event created successfully! Your pass link is live.')
    router.push('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Create Event</h1>
        <p className="text-xs text-white/50 mt-1">Configure event details and ticket tiers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Details Card */}
        <Card className="p-6">
          <h2 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
            Event Information
          </h2>
          <div className="space-y-4">
            <Input
              id="title"
              label="Event Title"
              placeholder="e.g. Afrobeats Rooftop Festival"
              required
            />
            <Textarea
              id="description"
              label="Description"
              placeholder="What can attendees look forward to?"
              rows={4}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input id="date" label="Event Date" type="date" required />
              <Input id="start-time" label="Start Time" type="time" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input id="end-time" label="End Time" type="time" />
              <Input
                id="location"
                label="Venue / Location"
                placeholder="e.g. Landmark Beach, VI"
                required
              />
            </div>
          </div>
        </Card>

        {/* Ticket Tiers Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wider text-white/60">
                Ticket Tiers
              </h2>
              <p className="text-xs text-white/40">Free or paid admissions</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTicketType}
              className="gap-1.5 text-xs font-semibold"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Tier
            </Button>
          </div>

          <div className="space-y-3">
            {ticketTypes.map((tt, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row gap-3 items-end"
              >
                <div className="flex-1 w-full sm:w-auto">
                  <Input
                    id={`tt-name-${index}`}
                    label="Tier Name"
                    value={tt.name}
                    onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                    placeholder="e.g. VIP Backstage"
                    required
                  />
                </div>
                <div className="w-full sm:w-32">
                  <Input
                    id={`tt-price-${index}`}
                    label="Price ($)"
                    type="number"
                    min="0"
                    step="0.01"
                    value={tt.price}
                    onChange={(e) => updateTicketType(index, 'price', e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-28">
                  <Input
                    id={`tt-qty-${index}`}
                    label="Capacity"
                    type="number"
                    min="1"
                    value={tt.quantity}
                    onChange={(e) => updateTicketType(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
                {ticketTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicketType(index)}
                    className="p-2.5 rounded-xl text-rose-400 hover:bg-rose-500/20 active:scale-95 transition-all mb-0.5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/dashboard">
            <Button type="button" variant="ghost" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            size="lg"
            className="bg-white text-black hover:bg-zinc-200 font-bold px-8 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Publish Event Pass
          </Button>
        </div>
      </form>
    </div>
  )
}
