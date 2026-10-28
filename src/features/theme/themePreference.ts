export type ThemePreference = "system" | "light" | "dark";
const storageKey = "saari-theme";
const changeEvent = "saari-theme-change";
const systemQuery = "(prefers-color-scheme: dark)";

export function getTheme(): ThemePreference {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}

export function getResolvedTheme(): Exclude<ThemePreference, "system"> {
  const preference = getTheme();
  if (preference !== "system") return preference;
  return window.matchMedia(systemQuery).matches ? "dark" : "light";
}
export function subscribeResolvedTheme(onChange: () => void) {
  const media = window.matchMedia(systemQuery);
  const unsubscribe = subscribeTheme(onChange);
  media.addEventListener("change", onChange);
  return () => {
    unsubscribe();
    media.removeEventListener("change", onChange);
  };
}

function applyTheme(value: string | null) {
  if (value === "light" || value === "dark")
    document.documentElement.dataset.theme = value;
  else delete document.documentElement.dataset.theme;
}

export function setTheme(value: string) {
  applyTheme(value);
  try {
    if (value === "system") localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, getTheme());
  } catch {}
  window.dispatchEvent(new Event(changeEvent));
}

export function subscribeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    applyTheme(event.newValue);
    onChange();
  };
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
