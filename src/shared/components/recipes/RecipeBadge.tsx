import type { ReactNode } from "react";

export interface RecipeBadgeProps {
  label: string;
  icon?: ReactNode;
  variant?: "default" | "highlight" | "muted";
  className?: string;
  iconPosition?: "left" | "right";
}

function RecipeBadge({
  label,
  icon,
  variant = "default",
  className = "",
  iconPosition = "left",
}: RecipeBadgeProps) {
  const baseClasses = "inline-flex items-center gap-1.5 rounded-full text-sm font-medium";

  const variantClasses: Record<NonNullable<RecipeBadgeProps["variant"]>, string> = {
    default:
      "bg-[#FFF1CC] text-[#A97209] px-3 py-1",
    highlight:
      "bg-[#EAF8EC] text-[#5EAF74] px-3 py-1",
    muted:
      "bg-[#F3EFE7] text-[#64748B] px-3 py-1",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {icon && iconPosition === "left" && (
        <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
          {icon}
        </span>
      )}
      {label}
      {icon && iconPosition === "right" && (
        <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
          {icon}
        </span>
      )}
    </span>
  );
}

export default RecipeBadge;