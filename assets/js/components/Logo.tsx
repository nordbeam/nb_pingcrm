import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show only the icon without text */
  iconOnly?: boolean;
  /** Visual variant for different backgrounds */
  variant?: "light" | "dark" | "auto";
}

/**
 * PingCRM Logo component
 *
 * Variants:
 * - "dark": For dark backgrounds (white text, glass icon container)
 * - "light": For light backgrounds (indigo text, indigo tinted icon container)
 * - "auto": Inherits text color from parent
 */
export function Logo({ className, iconOnly = false, variant = "auto" }: LogoProps) {
  const containerClasses = cn(
    "inline-flex items-center space-x-3",
    className
  );

  const iconContainerClasses = cn(
    "w-10 h-10 rounded-xl flex items-center justify-center",
    {
      // Dark variant (for dark backgrounds)
      "bg-white/10 backdrop-blur border border-white/20": variant === "dark",
      // Light variant (for light backgrounds)
      "bg-indigo-100": variant === "light",
      // Auto variant (inherits from parent)
      "bg-current/10": variant === "auto",
    }
  );

  const textClasses = cn(
    "text-xl font-semibold tracking-tight",
    {
      "text-white": variant === "dark",
      "text-indigo-900": variant === "light",
      // Auto inherits from parent
    }
  );

  return (
    <span className={containerClasses}>
      <span className={iconContainerClasses}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" opacity="0.3" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </span>
      {!iconOnly && (
        <span className={textClasses}>PingCRM</span>
      )}
    </span>
  );
}

/**
 * Just the logo icon without container styling
 */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export default Logo;
