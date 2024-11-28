import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provide";

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
    <nav className="mx-auto w-full border-border/40 dark:border-border max-w-7xl  px-2 py-1">
      <div className="flex items-center justify-between">
        <a href="/" className="text-xl font-semibold uppercase">
          Smart Todo
        </a>
        <div>
          <Button onClick={handleTheme} variant="ghost">
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
