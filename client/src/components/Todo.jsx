import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Card } from "./ui/card";

const Todo = ({todo}) => {
  return (
    <Card className="flex items-center justify-between bg-card text-card-foreground p-2 rounded-lg shadow">
      <div className="flex items-center">
        <Checkbox
        //   id={`todo-${todo.id}`}
          checked={todo.completed}
        //   onCheckedChange={() => toggleTodo(todo.id)}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`ml-3 text-sm font-medium line-clamp-1 ${
            todo.completed ? "line-through text-gray-500" : "text-gray-700"
          }`}
        >
          {todo.text}
        </label>
      </div>
      <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)}>
        <Trash2 className="h-4 w-4 text-red-500" />
        <span className="sr-only">Delete Todo</span>
      </Button>
    </Card>
  );
};

export default Todo;
