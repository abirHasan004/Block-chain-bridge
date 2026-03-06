"use client";

import { useCallback, useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import { useAccount } from "wagmi";
import { ERC20_ABI } from "@/lib/contractConfig";

export type TxStatus = "idle" | "awaitingSignature" | "pending" | "success" | "error";

interface UseApproveTokenParams {
  tokenAddress?: `0x${string}` | null;
  spender: `0x${string}`;
  decimals: number;
}

export function useApproveToken({ tokenAddress, spender, decimals }: UseApproveTokenParams) {
  const { address } = useAccount();

  const [status, setStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStatus("idle");
    setTxHash(null);
    setError(null);
  };

  const approve = useCallback(
    async (amount: string) => {
      try {
        if (!address) {
          throw new Error("Connect your wallet first.");
        }

        if (!tokenAddress) {
          throw new Error("Select a token to approve.");
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
        const contract = new Contract(tokenAddress, ERC20_ABI, signer);

        const value = parseUnits(amount, decimals);

        const tx = await contract.approve(spender, value);
        setStatus("pending");
        setTxHash(tx.hash);

        const receipt = await tx.wait();
        const status = receipt?.status;
        if (status === 1 || status === BigInt(1)) {
          setStatus("success");
        } else {
          setStatus("error");
          setError("Approval transaction failed.");
        }
      } catch (err: unknown) {
        console.error(err);
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Failed to send approval transaction."
        );
      }
    },
    [address, tokenAddress, spender, decimals]
  );

  const isLoading = status === "awaitingSignature" || status === "pending";

  return {
    status,
    txHash,
    error,
    isLoading,
    approve,
    reset,
  };
}

