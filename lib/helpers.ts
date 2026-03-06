export function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function truncateAddress(address?: string | null, length = 4) {
  if (!address) return "";
  return `${address.slice(0, 2 + length)}…${address.slice(-length)}`;
}

export function formatNumber(value: string | number | bigint, decimals = 4) {
  const num =
    typeof value === "bigint"
      ? Number(value)
      : typeof value === "string"
      ? Number(value)
      : value;

  if (!Number.isFinite(num)) return "0";

  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatHash(hash?: string | null) {
  if (!hash) return "";
  return `${hash.slice(0, 10)}…${hash.slice(-8)}`;
}

export function buildEtherscanTxUrl(txHash: string, network: "sepolia" = "sepolia") {
  switch (network) {
    case "sepolia":
    default:
      return `https://sepolia.etherscan.io/tx/${txHash}`;
  }
}

