"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { truncateAddress } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { useWalletNetwork } from "@/hooks/useWalletNetwork";

export function WalletConnect() {
  const { nativeBalance, isOnSepolia } = useWalletNetwork();

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/70 px-3 py-2.5 text-xs">
      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
          Wallet status
        </span>
        <span className="mt-1 text-xs text-slate-200">
          {nativeBalance
            ? `${nativeBalance.formatted.slice(0, 8)} ${nativeBalance.symbol}`
            : "Connect to view Sepolia balance"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Badge
          variant={isOnSepolia ? "success" : "warning"}
          className="hidden items-center gap-1 sm:flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {isOnSepolia ? "Sepolia" : "Wrong network"}
        </Badge>

        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            if (!connected) {
              return (
                <button
                  onClick={openConnectModal}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white shadow shadow-indigo-500/40 hover:bg-indigo-400"
                >
                  Connect Wallet
                </button>
              );
            }

            return (
              <button
                onClick={openConnectModal}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-indigo-500/80"
              >
                <span className="hidden text-slate-400 sm:inline">
                  {chain?.name ?? "Network"}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:inline" />
                <span>{truncateAddress(account?.address)}</span>
              </button>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
}

