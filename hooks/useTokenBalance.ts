"use client";

import { useBalance } from "wagmi";
import type { SupportedToken } from "@/lib/constants";
import { SEPOLIA_CHAIN_ID } from "@/lib/constants";
import { useAccount } from "wagmi";

export function useTokenBalance(token?: SupportedToken) {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useBalance({
    address,
    token: token?.address,
    chainId: SEPOLIA_CHAIN_ID,
    query: {
      enabled: Boolean(address && token?.address),
    },
  });

  return {
    balance: data,
    isLoading,
    refetch,
  };
}

