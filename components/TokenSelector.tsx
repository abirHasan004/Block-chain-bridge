"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SUPPORTED_TOKENS, type SupportedToken } from "@/lib/constants";
import { cn } from "@/lib/helpers";

interface TokenSelectorProps {
  value?: SupportedToken;
  onChange: (token: SupportedToken) => void;
}

export function TokenSelector({ value, onChange }: TokenSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 hover:border-indigo-500/70"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-100">
            {value?.symbol?.slice(0, 3) ?? "TOK"}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs text-slate-400">Token</span>
            <span className="text-sm font-medium">
              {value ? value.symbol : "Select token"}
            </span>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-800/80 bg-slate-950/95 p-1.5 shadow-xl shadow-black/40 backdrop-blur">
          <ul className="max-h-52 space-y-1 overflow-y-auto text-sm">
            {SUPPORTED_TOKENS.map((token) => (
              <li key={token.address}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(token);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left hover:bg-slate-900",
                    value?.address === token.address && "bg-slate-900"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-100">
                      {token.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-100">
                        {token.symbol}
                      </p>
                      <p className="text-[10px] text-slate-500">{token.name}</p>
                    </div>
                  </div>
                  <p className="max-w-[160px] truncate text-[10px] text-slate-500">
                    {token.address}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

