import { ThemeProvider } from "./components/theme-provide";
import { Card } from "./components/ui/card";
import Todo from "./components/Todo";
import { useAccount } from "wagmi";
import AddTodo from "./components/AddTodo";

import { useReadTodo } from "./hooks/useTodo";
import { Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { getAddress } from 'viem'

function App() {
  const { status } = useAccount();


  const { data: todos, isPending, refetch } = useReadTodo("getTodos");

  if (status === "connecting") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-1">
          <Loader2 className="animate-spin" /> Connecting...
        </div>
      </div>
    );
  }

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-[90vh] flex items-center justify-center p-4">


          {status === "connected" && (
            <Card className="min-w-[600px] max-w-2xl py-10 px-10 rounded-lg  bg-card text-card-foreground space-y-10">
              <div>
                <h2 className="text-center text-3xl font-extrabold">
                  Todo App
                </h2>
              </div>

              <AddTodo refetch={refetch} />

              {isPending ? (
                <div className="mt-4 flex justify-center">
                  <Button variant="ghost">
                    <Loader2 className="animate-spin" /> Loading
                  </Button>
                </div>
              ) : (
                <>
                  {todos?.length > 0 && (
                    <ul className="space-y-3">
                      {[...todos]?.reverse().map((todo) => (
                        <Todo
                          todo={todo}
                          key={Number(todo.id)}
                          refetch={refetch}
                        />
                      ))}
                    </ul>
                  )}

                  {!todos?.length && (
                    <p className="text-center mt-4">Not found todo!</p>
                  )}
                </>
              )}
            </Card>
          )}
          {status === "disconnected" && (
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
