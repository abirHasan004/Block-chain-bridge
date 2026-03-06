"use client";

import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buildEtherscanTxUrl, formatHash } from "@/lib/helpers";
import type { TxStatus } from "@/hooks/useApproveToken";

interface TransactionStatusProps {
  label?: string;
  status: TxStatus;
  txHash?: string | null;
  error?: string | null;
}

export function TransactionStatus({
  label = "Transaction",
  status,
  txHash,
  error,
}: TransactionStatusProps) {
  if (status === "idle") return null;

  const renderIcon = () => {
    if (status === "awaitingSignature" || status === "pending") {
      return <Loader2 className="h-4 w-4 animate-spin text-sky-300" />;
    }
    if (status === "success") {
      return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
    }
    return <XCircle className="h-4 w-4 text-rose-400" />;
  };

  const renderLabel = () => {
    switch (status) {
      case "awaitingSignature":
        return "Awaiting wallet signature";
      case "pending":
        return "Transaction submitted";
      case "success":
        return "Transaction confirmed";
      case "error":
        return "Transaction failed";
      default:
        return label;
    }
  };

  return (
    <div className="mt-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-3.5 py-3 text-xs text-slate-200">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {renderIcon()}
          <span className="font-medium">{renderLabel()}</span>
        </div>
        <Badge
          variant={
            status === "success"
              ? "success"
              : status === "error"
              ? "destructive"
              : "outline"
          }
        >
          {status}
        </Badge>
      </div>

      {txHash && (
        <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-slate-500" />
            Hash: {formatHash(txHash)}
          </span>
          <a
            href={buildEtherscanTxUrl(txHash)}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-medium text-sky-300 hover:text-sky-200"
          >
            View on Sepolia Etherscan
          </a>
        </div>
      )}

      {status === "error" && error && (
        <p className="mt-1 text-[11px] text-rose-300/90">{error}</p>
      )}
    </div>
  );
}

