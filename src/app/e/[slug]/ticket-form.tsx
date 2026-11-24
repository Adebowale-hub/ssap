'use client'

import { useState } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface TicketFormProps {
  ticketType: {
    id: string
    name: string
    price: number
    quantity: number
    sold: number
  }
  eventTitle: string
}

export function TicketForm({ ticketType, eventTitle }: TicketFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const remaining = ticketType.quantity - ticketType.sold
  const total = ticketType.price * quantity
  const isFree = ticketType.price === 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = 'TKT-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    setTicketId(id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="border-green-200 dark:border-green-800">
        <CardContent>
          <div className="text-center py-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">
              {isFree ? 'Tickets Claimed!' : 'Tickets Purchased!'}
            </h3>
            <p className="text-sm text-zinc-500 mb-4">
              {quantity}x {ticketType.name} for {eventTitle}
            </p>
            <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg font-mono">
              {ticketId}
            </code>
            <p className="text-xs text-zinc-400 mt-3">Check your email for ticket details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold mb-1">{ticketType.name}</h3>
        <p className="text-sm text-zinc-500 mb-4">
          {isFree ? 'Free' : formatCurrency(ticketType.price)} · {remaining} remaining
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="name" label="Full Name" placeholder="John Doe" required />
          <Input id="email" label="Email" type="email" placeholder="john@example.com" required />
          <Input id="phone" label="Phone (optional)" type="tel" placeholder="+234..." />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(5, quantity + 1, remaining))}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isFree && (
            <div className="flex justify-between items-center py-3 border-t border-zinc-200 dark:border-zinc-800">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold">{formatCurrency(total)}</span>
            </div>
          )}

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
            {isFree ? 'Get Tickets' : `Buy Tickets · ${formatCurrency(total)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
