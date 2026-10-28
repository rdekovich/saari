import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  getResolvedTheme,
  setTheme,
  subscribeResolvedTheme,
} from "./themePreference";
export function ThemeSwitch() {
  const theme = useSyncExternalStore(
    subscribeResolvedTheme,
    getResolvedTheme,
    () => "light",
  );
  return (
    <button
      className="theme-switch requires-script"
      type="button"
      role="switch"
      aria-label="Dark mode"
      aria-checked={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        className="theme-switch-sun"
        size={14}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <Moon
        className="theme-switch-moon"
        size={14}
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </button>
  );
}
