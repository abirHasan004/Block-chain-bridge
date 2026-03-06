"use client";

import * as React from "react";
import { cn } from "@/lib/helpers";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
      default: "bg-slate-800/80 text-slate-100 border border-slate-700/70",
      success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/50",
      warning: "bg-amber-500/15 text-amber-300 border border-amber-500/50",
      destructive: "bg-rose-500/15 text-rose-300 border border-rose-500/50",
      outline: "border border-slate-600/60 text-slate-100",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

