import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 py-1 text-sm text-foreground",
        // Placeholder
        "placeholder:text-muted-foreground",
        // Focus - subtle ring
        "outline-none transition-colors",
        "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/10",
        // Selection
        "selection:bg-primary/20",
        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/10",
        className
      )}
      {...props}
    />
  )
}

export { Input }
