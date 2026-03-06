"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/helpers";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

export interface CardProps extends MotionDivProps {
  children?: React.ReactNode;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] backdrop-blur-xl",
          className
        )}
        {...props}
      >
        {glow && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),_transparent_55%)]" />
        )}
        <div className="relative z-10 h-full w-full rounded-2xl bg-slate-950/80 p-5 sm:p-6">
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

