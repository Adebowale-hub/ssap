export type Plan = 'free' | 'premium'

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  plan: Plan
  created_at: string
}

export interface Event {
  id: string
  user_id: string
  title: string
  slug: string
  description: string
  date: string
  time: string
  end_date?: string
  end_time?: string
  location: string
  cover_image?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface TicketType {
  id: string
  event_id: string
  name: string
  description?: string
  price: number
  quantity: number
  sold: number
  created_at: string
}

export interface Ticket {
  id: string
  ticket_type_id: string
  event_id: string
  attendee_id: string
  status: 'valid' | 'used' | 'cancelled'
  qr_code?: string
  created_at: string
}

export interface Attendee {
  id: string
  name: string
  email: string
  phone?: string
  created_at: string
}

export interface CheckIn {
  id: string
  ticket_id: string
  event_id: string
  checked_in_at: string
  checked_in_by: string
}

export interface EventWithStats extends Event {
  total_tickets: number
  sold_tickets: number
  revenue: number
  ticket_types: TicketType[]
}

export const FREE_PLAN_LIMITS = {
  maxEvents: 3,
  maxTicketsPerEvent: 200,
} as const

export const PREMIUM_PRICE = 1200
