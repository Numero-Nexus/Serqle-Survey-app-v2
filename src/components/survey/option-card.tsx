"use client";

import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  role?: "radio" | "checkbox";
}

export const OptionCard = memo(function OptionCard({
  label,
  icon: Icon,
  selected,
  onSelect,
  role = "radio",
}: OptionCardProps) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 min-h-11 w-full rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted"
      )}
    >
      <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
     <span>{label}</span>
    </button>
  );
});