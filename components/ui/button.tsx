"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/helpers";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type MotionButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>;

export interface ButtonProps extends MotionButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", loading, disabled, fullWidth, children, ...props },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles =
      "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-400 hover:via-sky-400 hover:to-cyan-300",
      secondary:
        "border border-white/10 bg-white/5 text-white hover:bg-white/10",
      ghost: "text-sm text-indigo-300 hover:bg-white/5",
    };

    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={!isDisabled ? { y: -1 } : undefined}
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
        )}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

