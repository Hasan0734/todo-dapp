import { Plus } from "lucide-react";
import { ThemeProvider } from "./components/theme-provide";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import Todo from "./components/Todo";
import { useState } from "react";
import { useAccount } from "wagmi";

function App() {
  const { address } = useAccount();

  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
    {
      id: 3,
      text: "Deploy to production fsd fsdf sfsdf sf sdfsfsdfds fsf ss sd fsdfsdfsdf sdf  sdfsdfdsfsdf saf sdfs sdf skjf skdf jslflsdfl slfsdfjlsdfjljsaflaflsdklfj fjldjfl jsdlf sfsfsd",
      completed: false,
    },
  ]);
console.log(address)
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-[90vh] flex items-center justify-center p-4">
          {address ? (
            <Card className="min-w-[600px] max-w-2xl py-10 px-10 rounded-lg  bg-card text-card-foreground space-y-10">
              <div>
                <h2 className="text-center text-3xl font-extrabold">
                  Todo App
                </h2>
              </div>

              <div className="flex items-center">
                <Input
                  type="text"
                  // value={newTodo}
                  // onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo"
                  className="flex-grow mr-2 py-5 rounded-lg"
                />
                <Button className="py-5 rounded-lg">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Add Todo</span>
                </Button>
              </div>

              <ul className="space-y-3">
                {todos.map((todo) => (
                  <Todo todo={todo} />
                ))}
              </ul>
            </Card>
          ) : (
            <div>
              <h1 className="text-center text-2xl font-bold">
                Welcome to our Todo DAAP
              </h1>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
