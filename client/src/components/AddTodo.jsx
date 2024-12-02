import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { useWriteTodo } from "@/hooks/useTodo";

const AddTodo = ({ refetch }) => {
  const [newTodo, setNewTodo] = useState("");

  const { write, isPending } = useWriteTodo();

  const addNewTodo = async () => {
    if (!newTodo) return;
    await write("createTodo", [newTodo], "Added new todo.");
    setNewTodo("");
    refetch();
  };

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
