import { ThemeProvider } from "./components/theme-provide";
import { Card } from "./components/ui/card";
import Todo from "./components/Todo";
import { useAccount } from "wagmi";
import AddTodo from "./components/AddTodo";
import { useReadTodo } from "./hooks/useTodo";
import { Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { useSessionStore } from "./store";
import { ScrollArea } from "./components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";

function App() {
  const { status } = useAccount();
  const {
    data: todos,
    isPending,
    refetch,
    isRefetching,
  } = useReadTodo("getTodos");
  const { loading, auth } = useSessionStore((state) => state);
  const [selected, setSelected] = useState("All");
  const [filtered, setFiltered] = useState(todos);

  useEffect(() => {
    if (!isPending || isRefetching) {
      setFiltered(todos);
    }
  }, [!isPending, isRefetching]);

  const handleSelect = (value) => {
    setSelected(value);

    if (value === "All") {
      setFiltered(todos);
      return;
    }
    const filter = todos.filter((todo) => todo.completed === value);
    setFiltered(filter);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (!value) {
      handleSelect(selected);
      return;
    }
    const searchItems = filtered.filter((todo) =>
      todo.text.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(searchItems);
  };

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
          {status === "connected" ? (
            loading ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center gap-1">
                  <Loader2 className="animate-spin" /> Signing...
                </div>
              </div>
            ) : auth ? (
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
                    <div className="flex justify-between gap-7 items-center">
                      <div className="whitespace-nowrap">
                        Total : {filtered?.length}
                      </div>
                      <Input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search todo"
                        className=" rounded-full"
                      />
                      <Select
                        onValueChange={handleSelect}
                        defaultValue={selected}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"All"}>All</SelectItem>
                          <SelectItem value={true}>Completed</SelectItem>
                          <SelectItem value={false}>Incomplete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {todos?.length > 0 && (
                      <ScrollArea className="h-72 pr-5">
                        <ul className="space-y-3">
                          {[...filtered]?.reverse().map((todo) => (
                            <Todo
                              todo={todo}
                              key={Number(todo.id)}
                              refetch={refetch}
                            />
                          ))}
                        </ul>
                      </ScrollArea>
                    )}

                    {!todos?.length && (
                      <p className="text-center mt-4">Not found todo!</p>
                    )}
                  </>
                )}
              </Card>
            ) : (
              <></>
            )
          ) : (
            <></>
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
