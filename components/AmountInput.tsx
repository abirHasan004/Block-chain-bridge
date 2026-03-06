"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/helpers";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import type { SupportedToken } from "@/lib/constants";

interface AmountInputProps {
  token?: SupportedToken;
  amount: string;
  onChange: (value: string) => void;
}

export function AmountInput({ token, amount, onChange }: AmountInputProps) {
  const { balance } = useTokenBalance(token);

  const handleMax = () => {
    if (!balance) return;
    onChange(balance.formatted);
  };

  return (
    <div className="flex flex-col gap-1.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Amount
        </span>
        <span className="text-[11px] text-slate-400">
          Balance:{" "}
          {balance
            ? `${formatNumber(balance.formatted, 4)} ${balance.symbol}`
            : token
            ? "—"
            : "Select token"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="h-12 bg-slate-900/80 text-base"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleMax}
          className="h-12 px-3 text-xs"
          disabled={!balance}
        >
          MAX
        </Button>
      </div>
    </div>
  );
}

