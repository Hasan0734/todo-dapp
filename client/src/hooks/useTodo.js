import { contractConfig } from "@/lib/contractConfig";
import wagmiConfig from "../config/wagmiConfig";
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import toast from "react-hot-toast";
import axios from "axios";
import { baseAPI } from "@/lib/utils";

export const useReadTodo = (functionName, args = []) => {
  const { address } = useAccount();
  const result = useReadContract({
    ...contractConfig,
    config: wagmiConfig,
    functionName,
    args,
    account: address,
  });

  return result;
};

export const useWriteTodo = () => {
  const { data, writeContractAsync, writeContract, ...rest } = useWriteContract(
    {
      config: wagmiConfig,
      mutation: {
        onError: (e) => {
          toast.error(e.cause.shortMessage);
        },
        onSuccess: (data ) => {
          console.log(data)
         
        },
      },
    }
  );

  const write = async (functionName, args = [], successMessage) => {
    try {
      const res = await writeContractAsync({
        ...contractConfig,
        functionName,
        args,
      });
      if (res) {
        toast.success(successMessage);
      }
      return res;
    } catch (error) {
      console.log(error.cause);
    }
  };

  // {
  //   "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  //   "from": "0xabcdef1234567890abcdef1234567890abcdef12",
  //   "to": "0x1234567890abcdef1234567890abcdef12345678",
  //   "value": "1000000000000000000",
  //   "gasUsed": "21000",
  //   "blockNumber": 1,
  //   "timestamp": "2024-11-29T12:34:56.000Z"
  // }

  return { hash: data, write, ...rest };
};
