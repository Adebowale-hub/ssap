import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'primary' | 'wallet'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40",
          {
            // Apple Clean White Pill
            'rounded-full bg-white text-black hover:bg-zinc-100 shadow-[0_0_25px_rgba(255,255,255,0.2)] font-semibold': variant === 'default',
            // Apple Vibrant Blue Pill
            'rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white hover:opacity-95 shadow-[0_4px_20px_rgba(59,130,246,0.35)] font-semibold': variant === 'primary',
            // Apple Frosted Glass Pill
            'rounded-full bg-white/[0.07] hover:bg-white/[0.12] active:bg-white/[0.16] text-white border border-white/15 backdrop-blur-xl shadow-inner': variant === 'outline',
            // Ghost
            'rounded-full hover:bg-white/[0.08] active:bg-white/[0.12] text-white/80 hover:text-white': variant === 'ghost',
            // iOS Destructive
            'rounded-full bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 active:bg-red-500/35': variant === 'destructive',
            // Apple Wallet Black Bar
            'rounded-2xl bg-black border border-white/20 text-white hover:bg-zinc-900 shadow-xl flex items-center justify-center gap-2': variant === 'wallet',
          },
          {
            'h-8 px-3.5 text-xs tracking-tight': size === 'sm',
            'h-10 px-5 text-sm tracking-tight': size === 'md',
            'h-12 px-7 text-base tracking-tight font-semibold': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
