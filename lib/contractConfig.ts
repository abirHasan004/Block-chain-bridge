import type { Address } from "viem";
import { SEPOLIA_BRIDGE_CONTRACT_ADDRESS } from "./constants";

export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function decimals() view returns (uint8)",
] as const;

export const BRIDGE_ABI = [
  "function lockTokens(uint256 amount) external",
] as const;

export const BRIDGE_CONTRACT_ADDRESS = SEPOLIA_BRIDGE_CONTRACT_ADDRESS as Address;

