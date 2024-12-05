import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provide";
import SignInButton from "./SignInButton";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }
    if (theme === "light") {
      setTheme("dark");
      return;
    }
  };

  return (
    <nav className="mx-auto w-full border-border/40 dark:border-border max-w-7xl  px-2 py-3">
      <div className="flex items-center justify-between">
        <a href="/" className="text-xl font-semibold uppercase">
          Smart Todo
        </a>
        <a className="text-lg" href="/transactions">
          Transactions
        </a>
        <div className="flex items-center gap-3">
          <SignInButton />
          <Button
            onClick={handleTheme}
            variant="outline"
            className="rounded-xl shadow-md"
          >
            {theme === "light" ? <Moon size={30} /> : <Sun size={30} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
