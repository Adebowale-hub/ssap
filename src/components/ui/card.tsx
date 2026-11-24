import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] bg-[#121216]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("p-6 sm:p-7 pb-0", className)} {...props} />
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-6 sm:p-7", className)} {...props} />
}

export function CardFooter({ className, ...props }: CardProps) {
  return <div className={cn("p-6 sm:p-7 pt-0", className)} {...props} />
}
