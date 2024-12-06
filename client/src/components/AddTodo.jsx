import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { useWriteTodo } from "@/hooks/useTodo";
import { useTransactionReceipt } from "wagmi";
import { baseAPI, handleTransaction } from "@/lib/utils";

const AddTodo = ({ refetch }) => {
  const [newTodo, setNewTodo] = useState("");
  const { write, isPending, hash } = useWriteTodo();
  const [newHash, setNewHash] = useState("");
  const { data: transaction, dataUpdatedAt } = useTransactionReceipt({
    hash: newHash,
  });

  const addNewTodo = async () => {
    if (!newTodo) return;
    const res = await write("createTodo", [newTodo], "Added new todo.");
    setNewHash(res);
    setNewTodo("");
    refetch();
  };

  useEffect(() => {
    if (newHash && transaction?.transactionHash) {
      handleTransaction({
        ...transaction,
        dataUpdatedAt,
        funcName: "createTodo",
      });
    }
  }, [newHash, transaction?.transactionHash]);


  return (
    <>
      <div className="flex items-center">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2 py-5 rounded-lg"
        />
        <Button
          disabled={isPending}
          onClick={addNewTodo}
          className="py-5 rounded-lg"
        >
          {isPending ? (
            "Adding..."
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add Todo</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default AddTodo;
