"use client";

import { ChevronDown } from "lucide-react";
import { NETWORKS } from "@/lib/constants";

interface NetworkSelectorProps {
  label: string;
  valueKey: "sepolia" | "destination-testnet";
  disabled?: boolean;
}

export function NetworkSelector({ label, valueKey, disabled }: NetworkSelectorProps) {
  const network = NETWORKS.find((n) => n.key === valueKey);

  return (
    <div className="flex flex-col gap-1.5 text-xs">
      <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2.5 text-left text-sm text-slate-100"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-medium">
            {network?.name ?? "Unknown Network"}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  );
}

