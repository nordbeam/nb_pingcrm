import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show only the icon without text */
  iconOnly?: boolean;
  /** Visual variant for different backgrounds */
  variant?: "light" | "dark" | "auto";
}

/**
 * PingCRM Logo component - Linear-inspired design
 *
 * Variants:
 * - "dark": For dark backgrounds (white text, subtle glass effect)
 * - "light": For light backgrounds (foreground text, violet accent)
 * - "auto": Inherits text color from parent
 */
export function Logo({ className, iconOnly = false, variant = "auto" }: LogoProps) {
  const containerClasses = cn(
    "inline-flex items-center gap-2.5",
    className
  );

  const textClasses = cn(
    "text-[15px] font-semibold tracking-tight",
    {
      "text-white": variant === "dark",
      "text-foreground": variant === "light",
      // Auto inherits from parent
    }
  );

  return (
    <span className={containerClasses}>
      <LogoIcon
        className={cn("h-6 w-6", {
          "text-white": variant === "dark",
          "text-primary": variant === "light" || variant === "auto",
        })}
      />
      {!iconOnly && (
        <span className={textClasses}>PingCRM</span>
      )}
    </span>
  );
}

/**
 * Just the logo icon - Linear-inspired geometric mark
 */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Outer ring - subtle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />
      {/* Middle ring */}
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {/* Center dot - solid */}
      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="currentColor"
      />
      {/* Pulse indicator */}
      <circle
        cx="18"
        cy="6"
        r="2"
        fill="currentColor"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export default Logo;
