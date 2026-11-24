'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[140px]" />
      </div>

      <div className="w-full max-w-sm z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-2xl bg-white text-black flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              S
            </div>
            <span className="text-2xl font-black text-white tracking-tight">SSAP</span>
          </Link>
          <p className="text-xs text-white/50">
            {isSignUp ? 'Create your organizer account' : 'Access your events & tickets'}
          </p>
        </div>

        {/* Apple ID Style Card */}
        <Card className="p-6 sm:p-7 bg-[#141418]/90 border border-white/10 shadow-2xl backdrop-blur-3xl">
          {/* iOS Segmented Tab Control */}
          <div className="p-1 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center mb-6">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                id="name"
                label="Full Name"
                type="text"
                placeholder="Sarah Connor"
                required
              />
            )}
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="sarah@example.com"
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              required
            />

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold text-sm shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-95 transition-all mt-2"
            >
              {isSignUp ? 'Get Started' : 'Enter Dashboard'}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/[0.08] text-center">
            <p className="text-[11px] text-white/40">
              Instant demo access · No credit card required
            </p>
          </div>
        </Card>

        <p className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to SSAP Home
          </Link>
        </p>
      </div>
    </div>
  )
}
