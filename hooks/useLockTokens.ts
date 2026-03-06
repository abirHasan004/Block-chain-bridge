"use client";

import { useCallback, useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { useAccount } from "wagmi";
import { BRIDGE_ABI, BRIDGE_CONTRACT_ADDRESS } from "@/lib/contractConfig";
import type { TxStatus } from "./useApproveToken";

interface UseLockTokensParams {
  decimals: number;
}

export function useLockTokens({ decimals }: UseLockTokensParams) {
  const { address } = useAccount();

  const [status, setStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStatus("idle");
    setTxHash(null);
    setError(null);
  };

  const lockTokens = useCallback(
    async (amount: string) => {
      try {
        if (!address) {
          throw new Error("Connect your wallet first.");
        }

        if (!amount || Number(amount) <= 0) {
          throw new Error("Enter a valid amount.");
        }

        if (typeof window === "undefined" || !(window as any).ethereum) {
          throw new Error("No Ethereum provider found.");
        }

        setError(null);
        setStatus("awaitingSignature");

        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(BRIDGE_CONTRACT_ADDRESS, BRIDGE_ABI, signer);

        const value = parseUnits(amount, decimals);

        const tx = await contract.lockTokens(value);
        setStatus("pending");
        setTxHash(tx.hash);

        const receipt = await tx.wait();
        if (receipt && (receipt.status === 1 || receipt.status === 1)) {
          setStatus("success");
        } else {
          setStatus("error");
          setError("Bridge transaction failed.");
        }
      } catch (err: unknown) {
        console.error(err);
        setStatus("error");
        setError(
          err instanceof Error
            ? err.message
            : "Failed to send lockTokens transaction."
        );
      }
    },
    [address, decimals]
  );

  const isLoading = status === "awaitingSignature" || status === "pending";

  return {
    status,
    txHash,
    error,
    isLoading,
    lockTokens,
    reset,
  };
}

