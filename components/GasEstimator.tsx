"use client";

import { useEffect, useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { BRIDGE_ABI, BRIDGE_CONTRACT_ADDRESS } from "@/lib/contractConfig";
import type { SupportedToken } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

interface GasEstimatorProps {
  amount: string;
  token?: SupportedToken;
}

export function GasEstimator({ amount, token }: GasEstimatorProps) {
  const [estimate, setEstimate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!amount || Number(amount) <= 0 || !token) {
        setEstimate(null);
        return;
      }

      if (typeof window === "undefined" || !(window as any).ethereum) {
        setEstimate(null);
        return;
      }

      try {
        setLoading(true);

        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(BRIDGE_CONTRACT_ADDRESS, BRIDGE_ABI, signer);

        const value = parseUnits(amount, token.decimals);

        const gasEstimate = await contract.lockTokens.estimateGas(value);
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice ?? feeData.maxFeePerGas ?? BigInt(0);

        const fee = gasEstimate * gasPrice;
        const feeEth = Number(fee) / 1e18;

        if (!cancelled) {
          setEstimate(feeEth.toFixed(5));
        }
      } catch (e) {
        if (!cancelled) {
          setEstimate(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [amount, token]);

  return (
    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
      <span>Estimated bridge fee (gas)</span>
      <Badge variant="outline" className="border-slate-700/80 text-slate-200">
        {loading
          ? "Estimating…"
          : estimate
          ? `${estimate} ETH`
          : "—"}
      </Badge>
    </div>
  );
}

