import { useEffect } from "react";
import { getResolvedTheme, subscribeResolvedTheme } from "./themePreference";
export function useBrowserTheme() {
  useEffect(() => {
    const update = () => {
      const dark = getResolvedTheme() === "dark";
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        "content",
        getComputedStyle(document.documentElement)
          .getPropertyValue(dark ? "--paper-dark" : "--paper-light")
          .trim(),
      );
    };
    const unsubscribe = subscribeResolvedTheme(update);
    update();
    return unsubscribe;
  }, []);
}
