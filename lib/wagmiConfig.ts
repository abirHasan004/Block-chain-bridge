import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Sepolia Token Bridge (Test)",

  // Replace with your real WalletConnect project id via env var in production.
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
    "test-project-id",

  chains: [sepolia],

  transports: {
    [sepolia.id]: http("https://rpc.sepolia.org"),
  },

  ssr: true,
});