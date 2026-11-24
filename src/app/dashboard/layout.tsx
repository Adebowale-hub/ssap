import { Suspense } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Suspense fallback={<aside className="hidden lg:block lg:w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" />}>
        <DashboardSidebar />
      </Suspense>
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
