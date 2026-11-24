import { EventWithStats, TicketType, Ticket, Attendee, User } from './types'

export const mockUser: User = {
  id: '1',
  email: 'demo@ssap.events',
  name: 'Demo User',
  plan: 'free',
  created_at: '2024-01-01T00:00:00Z',
}

export const mockTicketTypes: TicketType[] = [
  {
    id: 'tt-1',
    event_id: 'evt-1',
    name: 'General Admission',
    description: 'Standard entry ticket',
    price: 0,
    quantity: 100,
    sold: 42,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'tt-2',
    event_id: 'evt-1',
    name: 'VIP',
    description: 'VIP access with backstage pass',
    price: 5000,
    quantity: 20,
    sold: 8,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'tt-3',
    event_id: 'evt-2',
    name: 'Standard',
    price: 2500,
    quantity: 200,
    sold: 156,
    created_at: '2024-02-01T00:00:00Z',
  },
]

export const mockEvents: EventWithStats[] = [
  {
    id: 'evt-1',
    user_id: '1',
    title: 'Tech Meetup Lagos',
    slug: 'tech-meetup-lagos',
    description: 'Join us for an evening of tech talks, networking, and innovation in Lagos.',
    date: '2025-02-15',
    time: '18:00',
    end_time: '21:00',
    location: 'Landmark Centre, Victoria Island, Lagos',
    is_published: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    total_tickets: 120,
    sold_tickets: 50,
    revenue: 400000,
    ticket_types: [mockTicketTypes[0], mockTicketTypes[1]],
  },
  {
    id: 'evt-2',
    user_id: '1',
    title: 'Afrobeats Concert',
    slug: 'afrobeats-concert',
    description: 'A night of amazing Afrobeats music featuring top artists.',
    date: '2025-03-20',
    time: '20:00',
    end_time: '23:30',
    location: 'Eko Convention Centre, Lagos',
    is_published: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
    total_tickets: 200,
    sold_tickets: 156,
    revenue: 3900000,
    ticket_types: [mockTicketTypes[2]],
  },
]

export const mockAttendees: Attendee[] = [
  { id: 'att-1', name: 'John Doe', email: 'john@example.com', created_at: '2024-01-20T00:00:00Z' },
  { id: 'att-2', name: 'Jane Smith', email: 'jane@example.com', phone: '+2348012345678', created_at: '2024-01-21T00:00:00Z' },
  { id: 'att-3', name: 'Mike Johnson', email: 'mike@example.com', created_at: '2024-01-22T00:00:00Z' },
  { id: 'att-4', name: 'Sarah Williams', email: 'sarah@example.com', created_at: '2024-02-05T00:00:00Z' },
  { id: 'att-5', name: 'David Brown', email: 'david@example.com', phone: '+2348098765432', created_at: '2024-02-06T00:00:00Z' },
]

export const mockTickets: Ticket[] = mockAttendees.map((att, i) => ({
  id: `tkt-${i + 1}`,
  ticket_type_id: i < 3 ? 'tt-1' : 'tt-3',
  event_id: i < 3 ? 'evt-1' : 'evt-2',
  attendee_id: att.id,
  status: i === 2 ? 'used' as const : 'valid' as const,
  created_at: att.created_at,
}))
