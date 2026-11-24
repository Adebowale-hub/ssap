import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-white/60">
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            "flex h-11 w-full rounded-2xl border border-white/10 bg-[#1c1c20]/90 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 shadow-inner backdrop-blur-md transition-all duration-200 focus:border-blue-500 focus:bg-[#222228] focus:outline-none focus:ring-2 focus:ring-blue-500/30",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
