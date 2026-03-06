"use client";

import { useAccount, useBalance, useChainId, useSwitchChain } from "wagmi";
import { SEPOLIA_CHAIN_ID } from "@/lib/constants";

export function useWalletNetwork() {
  const { address, status } = useAccount();
  const chainId = useChainId();
  const {
    switchChain,
    isPending: isSwitching,
    error: switchError,
  } = useSwitchChain();

  const { data: nativeBalance, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: SEPOLIA_CHAIN_ID,
    query: {
      enabled: Boolean(address),
    },
  });

  const isConnected = status === "connected" && Boolean(address);
  const isOnSepolia = chainId === SEPOLIA_CHAIN_ID;

  const switchToSepolia = () => {
    if (!switchChain) return;
    switchChain({ chainId: SEPOLIA_CHAIN_ID });
  };

  return {
    address,
    chainId,
    isConnected,
    isOnSepolia,
    status,
    nativeBalance,
    isBalanceLoading,
    switchToSepolia,
    isSwitching,
    switchError,
  };
}

