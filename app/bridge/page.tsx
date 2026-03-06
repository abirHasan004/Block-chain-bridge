import { BridgeCard } from "@/components/BridgeCard";

export default function BridgePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10 text-slate-50">
      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start">
        <section className="flex-1">
          <BridgeCard />
        </section>

        <aside className="mt-6 flex w-full flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-xs text-slate-200 md:mt-0 md:max-w-xs">
          <h3 className="text-sm font-semibold text-slate-50">
            Bridge overview
          </h3>
          <p className="text-[11px] leading-relaxed text-slate-400">
            This interface locks ERC-20 tokens into a dedicated bridge smart
            contract on Ethereum Sepolia. Once locked, an off-chain or separate
            relayer system can mint or release assets on the destination network.
          </p>
          <div className="rounded-xl bg-slate-900/80 p-3">
            <p className="mb-1 text-[11px] font-medium text-slate-200">
              Contract address (Sepolia)
            </p>
            <p className="truncate text-[11px] text-slate-400">
              0x0000000000000000000000000000000000000003
            </p>
          </div>
          <ul className="space-y-2 text-[11px] text-slate-400">
            <li>• Non-custodial: you always sign transactions from your wallet.</li>
            <li>• Transparent: every approval and lock action is visible on-chain.</li>
            <li>• Testnet-only: flows and UX mirror mainnet bridging, but use test ETH.</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}

