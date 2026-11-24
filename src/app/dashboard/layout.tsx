import { Suspense } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Lighting (Apple Aurora) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <Suspense fallback={<aside className="hidden lg:block lg:w-64 border-r border-white/10 bg-black" />}>
        <DashboardSidebar />
      </Suspense>

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
