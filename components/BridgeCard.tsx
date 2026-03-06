"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowDownUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import { NetworkSelector } from "@/components/NetworkSelector";
import { TokenSelector } from "@/components/TokenSelector";
import { AmountInput } from "@/components/AmountInput";
import { TransactionStatus } from "@/components/TransactionStatus";
import { GasEstimator } from "@/components/GasEstimator";
import { useWalletNetwork } from "@/hooks/useWalletNetwork";
import { useApproveToken, type TxStatus } from "@/hooks/useApproveToken";
import { useLockTokens } from "@/hooks/useLockTokens";
import { SEPOLIA_BRIDGE_CONTRACT_ADDRESS, type SupportedToken } from "@/lib/constants";
import { useToast } from "@/components/ui/toast";

export function BridgeCard() {
  const { isConnected, isOnSepolia, switchToSepolia } = useWalletNetwork();
  const { toast } = useToast();

  const [token, setToken] = useState<SupportedToken | undefined>(undefined);
  const [amount, setAmount] = useState<string>("");
  const [hasApproval, setHasApproval] = useState(false);

  const decimals = token?.decimals ?? 18;

  const {
    status: approveStatus,
    txHash: approveHash,
    error: approveError,
    isLoading: isApproving,
    approve,
  } = useApproveToken({
    tokenAddress: token?.address ?? null,
    spender: SEPOLIA_BRIDGE_CONTRACT_ADDRESS,
    decimals,
  });

  const {
    status: lockStatus,
    txHash: lockHash,
    error: lockError,
    isLoading: isLocking,
    lockTokens,
  } = useLockTokens({ decimals });

  const prevApproveStatus = useRef<TxStatus>("idle");
  const prevLockStatus = useRef<TxStatus>("idle");

  useEffect(() => {
    if (
      prevApproveStatus.current !== "success" &&
      approveStatus === "success"
    ) {
      toast({
        title: "Token approved",
        description: "Your ERC-20 approval has been confirmed on Sepolia.",
        variant: "success",
      });
    }
    if (
      prevApproveStatus.current !== "error" &&
      approveStatus === "error" &&
      approveError
    ) {
      toast({
        title: "Approval failed",
        description: approveError,
        variant: "error",
      });
    }
    prevApproveStatus.current = approveStatus;
  }, [approveStatus, approveError, toast]);

  useEffect(() => {
    if (prevLockStatus.current !== "success" && lockStatus === "success") {
      toast({
        title: "Tokens locked",
        description:
          "Your tokens have been locked in the Sepolia bridge contract.",
        variant: "success",
      });
    }
    if (
      prevLockStatus.current !== "error" &&
      lockStatus === "error" &&
      lockError
    ) {
      toast({
        title: "Bridge transaction failed",
        description: lockError,
        variant: "error",
      });
    }
    prevLockStatus.current = lockStatus;
  }, [lockStatus, lockError, toast]);

  const canSubmitAmount = useMemo(
    () => !!token && !!amount && Number(amount) > 0,
    [token, amount]
  );

  const handleApprove = async () => {
    if (!canSubmitAmount) return;
    await approve(amount);
    setHasApproval(true);
  };

  const handleBridge = async () => {
    if (!canSubmitAmount) return;
    await lockTokens(amount);
  };

  const primaryButtonLabel = useMemo(() => {
    if (!isConnected) return "Connect wallet";
    if (!isOnSepolia) return "Switch to Sepolia";
    if (!token) return "Select token";
    if (!amount || Number(amount) <= 0) return "Enter amount";
    if (!hasApproval) return "Approve token";
    return "Bridge tokens";
  }, [isConnected, isOnSepolia, token, amount, hasApproval]);

  const primaryDisabled =
    (!isConnected ||
      (!isOnSepolia && primaryButtonLabel !== "Connect wallet") ||
      !token ||
      !amount ||
      Number(amount) <= 0) &&
    primaryButtonLabel !== "Connect wallet";

  const primaryLoading =
    (!hasApproval && isApproving && isConnected && isOnSepolia) ||
    (hasApproval && isLocking);

  const onPrimaryClick = () => {
    if (!isConnected) return;
    if (!isOnSepolia) {
      switchToSepolia();
      return;
    }
    if (!token || !amount || Number(amount) <= 0) return;

    if (!hasApproval) {
      handleApprove();
    } else {
      handleBridge();
    }
  };

  const showDualButtons = isConnected && isOnSepolia && canSubmitAmount;

  return (
    <Card className="max-w-xl border-slate-800/80">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Sepolia bridge
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-50">
            Lock tokens for cross-chain transfer
          </h2>
        </div>
        <div className="rounded-2xl bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300">
          <span className="mr-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Non-custodial
        </div>
      </div>

      <div className="mb-4">
        <WalletConnect />
      </div>

      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <NetworkSelector label="From network" valueKey="sepolia" />
        <NetworkSelector label="To network" valueKey="destination-testnet" />
      </div>

      <div className="mb-3 flex justify-center">
        <motion.div
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-slate-300"
          whileHover={{ y: -1 }}
        >
          <ArrowDownUp className="h-3.5 w-3.5" />
        </motion.div>
      </div>

      <div className="space-y-3">
        <TokenSelector value={token} onChange={(t) => setToken(t)} />
        <AmountInput token={token} amount={amount} onChange={setAmount} />

        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Estimated receive</span>
          <span>
            {amount && token
              ? `${amount} ${token.symbol}`
              : "Enter amount to preview"}
          </span>
        </div>

        <GasEstimator amount={amount} token={token} />

        <div className="mt-4 space-y-2">
          {showDualButtons ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant={hasApproval ? "secondary" : "primary"}
                loading={isApproving}
                disabled={!canSubmitAmount || hasApproval}
                onClick={handleApprove}
                fullWidth
              >
                {hasApproval ? "Approved" : "1. Approve Token"}
              </Button>
              <Button
                type="button"
                variant="primary"
                loading={isLocking}
                disabled={!canSubmitAmount || !hasApproval}
                onClick={handleBridge}
                fullWidth
              >
                2. Bridge Tokens
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="primary"
              loading={primaryLoading}
              disabled={primaryDisabled}
              onClick={onPrimaryClick}
              fullWidth
            >
              {primaryButtonLabel}
            </Button>
          )}

          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-amber-400" />
            <p>
              Bridging on Sepolia is for testing only. Confirm all details in your
              wallet before signing and avoid using real funds.
            </p>
          </div>
        </div>

        <TransactionStatus
          label="Approval"
          status={approveStatus}
          txHash={approveHash ?? undefined}
          error={approveError}
        />

        <TransactionStatus
          label="Bridge"
          status={lockStatus}
          txHash={lockHash ?? undefined}
          error={lockError}
        />
      </div>
    </Card>
  );
}

