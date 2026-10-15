import { useEffect, useState } from "react";
import { useSettings } from "./userStore";

const QUERY = "(prefers-color-scheme: dark)";

/** Resolves the saved theme ("light" | "dark" | "system") to the one actually shown. */
export function useResolvedTheme() {
  const [{ appearance }] = useSettings();
  const [systemDark, setSystemDark] = useState(() => typeof window !== "undefined" && window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (appearance.theme === "system") return systemDark ? "dark" : "light";
  return appearance.theme;
}
