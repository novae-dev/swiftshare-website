import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Release } from "./types";

export type ReleaseState =
  | { status: "loading" }
  | { status: "unavailable"; release: Release | null }
  | { status: "ready"; release: Release };

const ReleaseContext = createContext<ReleaseState>({ status: "loading" });

// Reads /release.json once, then confirms the APK really exists before
// enabling downloads. A missing file on a static host usually returns the
// HTML app shell, so an HTML response counts as "missing".
async function loadRelease(): Promise<ReleaseState> {
  let release: Release | null = null;
  try {
    const res = await fetch("/release.json", { cache: "no-store" });
    if (!res.ok) return { status: "unavailable", release: null };
    release = (await res.json()) as Release;
    if (!release.available || !release.downloadUrl) return { status: "unavailable", release };
    const head = await fetch(release.downloadUrl, { method: "HEAD", cache: "no-store" });
    const type = head.headers.get("content-type") ?? "";
    if (!head.ok || type.includes("text/html")) return { status: "unavailable", release };
    return { status: "ready", release };
  } catch {
    return { status: "unavailable", release };
  }
}

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReleaseState>({ status: "loading" });
  useEffect(() => {
    let alive = true;
    loadRelease().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, []);
  return <ReleaseContext.Provider value={state}>{children}</ReleaseContext.Provider>;
}

export const useRelease = () => useContext(ReleaseContext);
