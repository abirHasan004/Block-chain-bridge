"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/helpers";

type ToastVariant = "default" | "success" | "error";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastInput = Omit<Toast, "id">;

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((input: ToastInput) => {
    setToasts((current) => {
      const id = Date.now();
      return [...current, { id, ...input }];
    });

    setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 5000);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={cn(
                  "pointer-events-auto rounded-2xl border px-3.5 py-3 text-xs shadow-xl backdrop-blur",
                  t.variant === "success" &&
                    "border-emerald-500/60 bg-emerald-500/15 text-emerald-50",
                  t.variant === "error" &&
                    "border-rose-500/60 bg-rose-500/15 text-rose-50",
                  (!t.variant || t.variant === "default") &&
                    "border-slate-700/80 bg-slate-900/90 text-slate-100"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold">{t.title}</p>
                    {t.description && (
                      <p className="mt-0.5 text-[11px] text-slate-200/80">
                        {t.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setToasts((current) =>
                        current.filter((toastItem) => toastItem.id !== t.id)
                      )
                    }
                    className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/20 text-[10px] text-slate-200 hover:bg-black/40"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

