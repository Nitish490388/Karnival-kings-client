import { cn } from "@/lib/utils"

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("w-5 h-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin", className)} />
  )
}