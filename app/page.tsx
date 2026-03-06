import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.45),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.35),_transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col gap-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 text-xs font-semibold text-white shadow-lg shadow-indigo-500/40">
              BR
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-slate-200">
                Sepolia Bridge
              </span>
              <span className="text-xs text-slate-400">
                Secure cross-chain token locking
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Badge variant="outline" className="gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Audited contract UX
            </Badge>
            <Badge variant="default" className="gap-1">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              DeFi-grade interface
            </Badge>
          </div>
        </header>

        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="success" className="inline-flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/80 text-[10px] font-semibold text-emerald-950">
                  ●
                </span>
                Live on Ethereum Sepolia
              </Badge>

              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                Secure Cross-Chain Token Bridge on Ethereum Sepolia
              </h1>
              <p className="max-w-xl text-balance text-base leading-relaxed text-slate-300">
                A simple and secure interface for locking tokens on Ethereum Sepolia
                and preparing cross-chain transfers. Connect your wallet, approve
                assets, and lock liquidity with full on-chain transparency.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/bridge">
                <Button className="gap-2">
                  Launch Bridge
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="https://sepolia.etherscan.io/address/0x0000000000000000000000000000000000000003"
                target="_blank"
              >
                <Button variant="secondary" className="gap-2">
                  View Smart Contract
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1">
                <Wallet className="h-3.5 w-3.5 text-indigo-300" />
                Wallets: MetaMask, WalletConnect, Coinbase
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Non-custodial & permissionless UX
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bridge-gradient-border rounded-3xl bg-slate-900/80 p-0.5 shadow-2xl shadow-indigo-500/30">
              <div className="relative flex flex-col gap-6 rounded-[1.3rem] bg-slate-950/90 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      How it works
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Three simple on-chain steps
                    </p>
                  </div>
                  <Badge variant="default">Ethereum Sepolia</Badge>
                </div>

                <ol className="space-y-4 text-sm">
                  <li className="flex gap-3 rounded-2xl bg-slate-900/70 p-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">Connect Wallet</p>
                      <p className="text-xs text-slate-400">
                        Connect MetaMask, WalletConnect, or Coinbase Wallet to start.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 rounded-2xl bg-slate-900/70 p-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">Approve Token</p>
                      <p className="text-xs text-slate-400">
                        Grant the bridge secure, one-time permission to move your
                        selected ERC-20 token.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 rounded-2xl bg-slate-900/70 p-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">Lock Tokens</p>
                      <p className="text-xs text-slate-400">
                        Lock tokens into the Sepolia bridge contract to initiate a
                        cross-chain transfer workflow.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-slate-100">
                  Supported Network
                </span>
                <Badge variant="outline" className="border-indigo-500/60 text-indigo-300">
                  Ethereum Sepolia Testnet
                </Badge>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                This application operates on the Ethereum Sepolia testnet for
                demonstration purposes. Do not use real funds. Bridge flows, gas
                estimation, and transaction UX mirror production DeFi interfaces.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
