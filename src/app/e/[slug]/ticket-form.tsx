'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Plus, Sparkles, ArrowRight, Smartphone } from 'lucide-react'
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
    const id = 'tkt-1' // Connect to demo pass
    setTicketId(id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="border-emerald-500/40 bg-emerald-950/20 backdrop-blur-2xl">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400">
            <Check className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black text-white">
            {isFree ? 'Pass Claimed!' : 'Order Confirmed!'}
          </h3>
          <p className="text-xs text-white/60 mt-1 mb-4">
            {quantity}x {ticketType.name} pass issued for {eventTitle}
          </p>

          <Link href={`/ticket/${ticketId}`}>
            <Button
              className="w-full bg-white text-black hover:bg-zinc-200 font-bold text-xs h-11 gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
            >
              <Smartphone className="h-4 w-4" />
              Open Apple Wallet Pass
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:border-white/20 transition-all">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-extrabold text-base text-white">{ticketType.name}</h3>
            <p className="text-xs text-white/50">
              {isFree ? 'Free Admission' : formatCurrency(ticketType.price)} · {remaining} left
            </p>
          </div>
          <span className="text-lg font-black text-white">
            {isFree ? 'Free' : formatCurrency(ticketType.price)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input id={`name-${ticketType.id}`} label="Full Name" placeholder="Alex Morgan" required />
          <Input id={`email-${ticketType.id}`} label="Email" type="email" placeholder="alex@example.com" required />

          {/* iOS Segmented Quantity Stepper */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
              Quantity
            </label>
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white/[0.05] border border-white/10">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-bold font-mono text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(5, quantity + 1, remaining))}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isFree && (
            <div className="flex justify-between items-center py-2.5 border-t border-white/10">
              <span className="text-xs text-white/60 font-semibold uppercase">Total</span>
              <span className="text-lg font-black text-white">{formatCurrency(total)}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-12 text-sm shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95"
          >
            {isFree ? 'Claim Pass' : `Buy Pass · ${formatCurrency(total)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
