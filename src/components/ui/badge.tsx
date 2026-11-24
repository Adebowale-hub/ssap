import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' | 'purple' | 'blue'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight backdrop-blur-md",
        {
          'bg-white/10 text-white border border-white/15': variant === 'default',
          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.2)]': variant === 'success',
          'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(251,191,36,0.2)]': variant === 'warning',
          'bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]': variant === 'destructive',
          'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]': variant === 'blue',
          'bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]': variant === 'purple',
          'border border-white/20 text-white/80': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}
