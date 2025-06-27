// components/ui/error-message.tsx
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ErrorMessage({ message, className }: { message?: string; className?: string }) {
  if (!message) return null

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md mt-2",
        className
      )}
    >
      <AlertTriangle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  )
}
