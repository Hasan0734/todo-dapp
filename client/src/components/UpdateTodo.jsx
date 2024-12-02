import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteTodo } from "@/hooks/useTodo";
import { format, fromUnixTime } from "date-fns";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function UpdateTodo({ refetch, todo, setOpenEdit }) {
  const [newTodo, setNewTodo] = useState(todo.text);
  const { write, isPending } = useWriteTodo();

  const handleDelete = async () => {
    const res = await write(
      "updateTodo",
      [todo.id, newTodo],
      "Update successfully"
    );
    if (res) {
      setOpenEdit(false);
      refetch();
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update your Todo</DialogTitle>
        <DialogDescription>
          Make changes to your todo here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <Label htmlFor="todo" className="text-right">
          Enter update todo
        </Label>
        <Input
          id="todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="col-span-3"
        />
      </div>
        <div>Last update:  {format(fromUnixTime(Number(todo.updated)), "hh:mm aa dd MMM yy")}</div>
      <DialogFooter>
        <Button
          disabled={todo.text === newTodo || isPending}
          onClick={handleDelete}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin " />
              <span className="">Updating</span>
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
