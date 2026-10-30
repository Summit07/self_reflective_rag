"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}. Click to switch.`}
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm hover:border-[#f47716] dark:hover:border-[#f47716] hover:text-[#f47716] dark:hover:text-[#ff9b42] transition-all duration-150 active:scale-95"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
    </button>
  );
}

