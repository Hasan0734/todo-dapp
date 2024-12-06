import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const baseAPI = import.meta.env.VITE_API_URL_V1;

export const handleTransaction = async (transaction) => {
  const txData = {
    from: transaction?.from,
    to: transaction?.to,
    hash: transaction.transactionHash,
    timestamp: transaction?.dataUpdatedAt,
    blockNumber: Number(transaction?.blockNumber),
    gasUsed: Number(transaction?.gasUsed),
    functionName: transaction?.funcName,
  };

  console.log(txData)
  const res = await fetch(`${baseAPI}/transactions`, {
    method: "POST",
    body: JSON.stringify(txData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json()
  return response
};
