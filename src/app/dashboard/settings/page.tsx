'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, CreditCard, Users, AlertTriangle, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockUser } from '@/lib/mock-data'
import { FREE_PLAN_LIMITS } from '@/lib/types'

export default function SettingsPage() {
  const [name, setName] = useState(mockUser.name)
  const [email, setEmail] = useState(mockUser.email)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-zinc-500" />
              <h2 className="font-semibold">Profile</h2>
            </div>
            <div className="space-y-4">
              <Input
                id="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button size="sm" onClick={() => alert('Profile saved!')}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plan & Billing */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-5 w-5 text-zinc-500" />
              <h2 className="font-semibold">Plan & Billing</h2>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Free Plan</span>
                  <Badge>Current</Badge>
                </div>
                <p className="text-sm text-zinc-500 mt-1">
                  2/{FREE_PLAN_LIMITS.maxEvents} events · {FREE_PLAN_LIMITS.maxTicketsPerEvent} tickets/event
                </p>
              </div>
              <Link href="/pricing">
                <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Crown className="h-3.5 w-3.5" />
                  Upgrade
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-zinc-500" />
              <h2 className="font-semibold">Team Members</h2>
              <Badge variant="outline">Premium</Badge>
            </div>
            <div className="text-center py-6 text-sm text-zinc-500">
              <Crown className="h-8 w-8 mx-auto mb-2 text-zinc-300 dark:text-zinc-700" />
              <p>Upgrade to Premium to invite team members</p>
              <p className="text-xs mt-1">Collaborate with up to 5 team members</p>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-900">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h2 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
            </div>
            <p className="text-sm text-zinc-500 mb-4">
              Once you delete your account, there is no going back.
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => alert('This would delete your account. Not implemented yet.')}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
