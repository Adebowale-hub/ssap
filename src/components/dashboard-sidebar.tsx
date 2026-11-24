'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Settings, Menu, X, Crown, Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Events & Passes', icon: LayoutGrid },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#101014]/90 border-r border-white/[0.08] backdrop-blur-2xl">
      {/* Top Brand Bar */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-white to-zinc-400 flex items-center justify-center font-black text-sm text-black shadow-md shadow-white/10">
            S
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-base text-white">SSAP</span>
            <span className="text-[10px] block font-mono text-white/40 tracking-wider uppercase">
              Organizer OS
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-3 space-y-1.5">
        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
          Management
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-white/[0.12] text-white border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                  : "text-white/60 hover:bg-white/[0.05] hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4", isActive ? "text-indigo-400" : "text-white/40")} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-3.5 w-3.5 text-white/40" />}
            </Link>
          )
        })}
      </nav>

      {/* User & Plan Status Card */}
      <div className="p-4 border-t border-white/[0.08] space-y-3">
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-500/30">
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Demo Organizer</p>
            <p className="text-[10px] text-white/40 truncate">Free Plan (2/3 Events)</p>
          </div>
          <Badge variant="blue" className="text-[10px] px-2">Free</Badge>
        </div>

        <Link href="/pricing" className="block">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs font-semibold gap-1.5 h-9 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/30 text-indigo-300 hover:text-white hover:border-indigo-500/50"
          >
            <Crown className="h-3.5 w-3.5 text-amber-400" />
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Top Dynamic Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 border-b border-white/10 backdrop-blur-2xl flex items-center justify-between px-4 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs">
            S
          </div>
          <span className="font-extrabold text-sm text-white">SSAP</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-white/10 text-white border border-white/10 active:scale-95 transition-all"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slideout Sidebar */}
      <div
        className={cn(
          "lg:hidden fixed top-16 left-0 bottom-0 w-72 z-30 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-20">
        {sidebarContent}
      </aside>
    </>
  )
}
