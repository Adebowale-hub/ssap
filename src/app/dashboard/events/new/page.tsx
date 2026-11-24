'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

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
    alert('Event created successfully!')
    router.push('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-4">Event Details</h2>
            <div className="space-y-4">
              <Input
                id="title"
                label="Event Title"
                placeholder="e.g. Tech Meetup Lagos"
                required
              />
              <Textarea
                id="description"
                label="Description"
                placeholder="Tell people what your event is about..."
                rows={4}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input id="date" label="Date" type="date" required />
                <Input id="start-time" label="Start Time" type="time" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input id="end-time" label="End Time" type="time" />
                <Input
                  id="location"
                  label="Location"
                  placeholder="e.g. Landmark Centre, Lagos"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Ticket Types</h2>
              <Button type="button" variant="outline" size="sm" onClick={addTicketType} className="gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add Type
              </Button>
            </div>
            <div className="space-y-4">
              {ticketTypes.map((tt, index) => (
                <div key={index} className="flex gap-3 items-end p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <div className="flex-1">
                    <Input
                      id={`tt-name-${index}`}
                      label="Name"
                      value={tt.name}
                      onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                      placeholder="e.g. VIP"
                      required
                    />
                  </div>
                  <div className="w-28">
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
                  <div className="w-24">
                    <Input
                      id={`tt-qty-${index}`}
                      label="Quantity"
                      type="number"
                      min="1"
                      value={tt.quantity}
                      onChange={(e) => updateTicketType(index, 'quantity', e.target.value)}
                      required
                    />
                  </div>
                  {ticketTypes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTicketType(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 mb-0.5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            Create Event
          </Button>
        </div>
      </form>
    </div>
  )
}
