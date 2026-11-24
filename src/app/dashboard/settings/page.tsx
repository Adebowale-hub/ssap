'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, CreditCard, Users, AlertTriangle, Crown, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockUser } from '@/lib/mock-data'
import { FREE_PLAN_LIMITS } from '@/lib/types'

export default function SettingsPage() {
  const [name, setName] = useState(mockUser.name)
  const [email, setEmail] = useState(mockUser.email)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-xs text-white/50 mt-1">Manage your organizer profile and tier preferences</p>
      </div>

      {/* Profile */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
          <h2 className="font-bold text-base text-white">Organizer Profile</h2>
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

          <Button
            size="sm"
            onClick={handleSave}
            className="bg-white text-black hover:bg-zinc-200 font-bold px-4 active:scale-95"
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </Card>

      {/* Plan & Billing */}
      <Card className="p-6 border-indigo-500/30 bg-gradient-to-b from-[#16161f] to-[#111116]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Plan & Quotas</h2>
              <p className="text-xs text-white/50">Current: Free Starter Tier</p>
            </div>
          </div>
          <Badge variant="blue">Active</Badge>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-5 space-y-2">
          <div className="flex justify-between text-xs text-white/70">
            <span>Active Events Used</span>
            <span className="font-mono font-bold text-white">2 / {FREE_PLAN_LIMITS.maxEvents}</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-2/3 rounded-full" />
          </div>
          <p className="text-[11px] text-white/40">
            Cap: {FREE_PLAN_LIMITS.maxTicketsPerEvent} tickets per event on Free plan.
          </p>
        </div>

        <Link href="/pricing">
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold h-11 gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95">
            <Crown className="h-4 w-4 text-amber-300" />
            Upgrade to SSAP Pro ($12/mo)
          </Button>
        </Link>
      </Card>

      {/* Team (Locked) */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Door Staff & Team</h2>
              <p className="text-xs text-white/50">Assign QR check-in crew</p>
            </div>
          </div>
          <Badge variant="purple">Pro Only</Badge>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-dashed border-white/10 text-center">
          <Crown className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
          <p className="text-xs font-bold text-white">Unlock Door Scanner Team Accounts</p>
          <p className="text-[11px] text-white/50 mt-1 max-w-sm mx-auto">
            Invite up to 5 crew members with dedicated door scanner roles without sharing your master account.
          </p>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-rose-500/20 bg-rose-950/10">
        <div className="flex items-center gap-3 mb-2 text-rose-400">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="font-bold text-base">Danger Zone</h2>
        </div>
        <p className="text-xs text-white/60 mb-4">
          Permanently delete your account and all associated events and ticket records.
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => alert('Demo account cannot be deleted.')}
        >
          Delete Account
        </Button>
      </Card>
    </div>
  )
}
