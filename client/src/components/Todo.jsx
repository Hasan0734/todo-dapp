import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { format, fromUnixTime } from "date-fns";
import { useWriteTodo } from "@/hooks/useTodo";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UpdateTodo } from "./UpdateTodo";
const Todo = ({ todo, refetch }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { write: toggleWrite, isPending: toggling } = useWriteTodo();
  const { write: deleteTodo, isPending: deleting } = useWriteTodo();

  const handleDelete = async (_id) => {
    const res = await deleteTodo("removeTodo", [_id], "Remove successfully");
    if (res) {
      refetch();
    }
  };

  const toggleTodo = async (_id) => {
    const res = await toggleWrite(
      "toggleComplete",
      [_id],
      todo.completed ? "Incomplete todo" : "Completed todo"
    );
    if (res) {
      refetch();
    }
  };

  return (
    <Card className="flex items-center justify-between bg-card text-card-foreground p-2 rounded-lg shadow">
      <div className="flex items-center">
        {toggling ? (
          <>
            <Loader2 size={20} className="animate-spin text-gray-400" />
            <span className="sr-only">Toggling</span>
          </>
        ) : (
          <Checkbox
            disabled={toggling}
            id={`todo-${Number(todo.id)}`}
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(Number(todo.id))}
          />
        )}
        <label
          htmlFor={`todo-${Number(todo.id)}`}
          className={`ml-3 text-sm font-medium line-clamp-1 ${
            todo.completed
              ? "line-through text-gray-500"
              : "text-card-foreground"
          }`}
        >
          {todo.text}
        </label>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs">
          {format(fromUnixTime(Number(todo.timestamp)), " dd MMM yy")}
        </span>

        <div className="flex gap-3">
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="size-5">
                <>
                  <SquarePen className="h-4 w-4 text-green-500" />
                  <span className="sr-only">Update Todo</span>
                </>
              </Button>
            </DialogTrigger>
            {openEdit && <UpdateTodo setOpenEdit={setOpenEdit}  refetch={refetch} todo={todo} />}
          </Dialog>

          <Button
            disabled={deleting}
            variant="ghost"
            size="icon"
            className="size-5"
            onClick={() => handleDelete(Number(todo.id))}
          >
            {deleting ? (
              <>
                <Loader2 className="animate-spin text-red-500" />
                <span className="sr-only">Deleting</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 text-red-500" />
                <span className="sr-only">Delete Todo</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Todo;
