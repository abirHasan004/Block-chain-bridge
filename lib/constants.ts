export const SEPOLIA_CHAIN_ID = 11155111;

export type SupportedNetwork = {
  id: number;
  name: string;
  key: "sepolia" | "destination-testnet";
};

export const NETWORKS: SupportedNetwork[] = [
  {
    id: SEPOLIA_CHAIN_ID,
    name: "Ethereum Sepolia",
    key: "sepolia",
  },
  {
    id: 0,
    name: "Test Destination Network",
    key: "destination-testnet",
  },
];

export type SupportedToken = {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  icon?: string;
};

// Replace these placeholder addresses with your actual deployed token contracts on Sepolia.
export const SUPPORTED_TOKENS: SupportedToken[] = [
  {
    symbol: "USDC",
    name: "USD Coin (Test)",
    address: "0x0000000000000000000000000000000000000001",
    decimals: 6,
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin (Test)",
    address: "0x0000000000000000000000000000000000000002",
    decimals: 18,
  },
];

// Replace with your real bridge contract address on Sepolia.
export const SEPOLIA_BRIDGE_CONTRACT_ADDRESS =
  "0x0000000000000000000000000000000000000003" as const;

