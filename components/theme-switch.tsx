"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import clsx from "clsx";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={clsx("h-9 w-9", className)} aria-hidden />;
  }

  const isLight = resolvedTheme === "light";

  return (
    <button
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg",
        "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
        "transition-colors",
        className,
      )}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
};
