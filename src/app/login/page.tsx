'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            S<span className="text-indigo-500">S</span>AP
          </Link>
          <p className="text-zinc-500 mt-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        <Card>
          <CardContent>
            <div className="flex mb-6 border-b border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                  !isSignUp
                    ? 'text-zinc-900 border-b-2 border-zinc-900 dark:text-white dark:border-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                  isSignUp
                    ? 'text-zinc-900 border-b-2 border-zinc-900 dark:text-white dark:border-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Input
                  id="name"
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                required
              />
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                required
              />
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
