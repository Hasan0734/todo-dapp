import { contractConfig } from "@/lib/contractConfig";
import wagmiConfig from "../config/wagmiConfig";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import toast from "react-hot-toast";

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
  const { writeContractAsync, writeContract, ...rest } = useWriteContract({
    config: wagmiConfig,
    mutation: {
      onError: (e) => {
        toast.error(e.cause.shortMessage);
      },
      onsSettle: (data) => {
        console.log(data);
      },
    },
  });

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
        console.log(error.cause)
    }
  };

  return { write, ...rest };
};
