import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Release, ReleaseCatalog } from "./types";

export type ReleaseState =
  | { status: "loading" }
  | {
      status: "unavailable";
      latest: null;
      previous: null;
      stable: null;
    }
  | {
      status: "ready";
      latest: Release;
      previous: Release | null;
      stable: Release | null;
      latestAvailable: boolean;
      previousAvailable: boolean;
      stableAvailable: boolean;
    };

const ReleaseContext = createContext<ReleaseState>({ status: "loading" });

async function fileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "";
    return response.ok && !contentType.includes("text/html");
  } catch {
    return false;
  }
}

async function loadRelease(): Promise<ReleaseState> {
  try {
    const response = await fetch("/release.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Release configuration unavailable");
    }

    const data = await response.json() as ReleaseCatalog;

    const [latestAvailable, previousAvailable, stableAvailable] =
      await Promise.all([
        data.latest?.available
          ? fileExists(data.latest.downloadUrl)
          : false,
        data.previous?.available
          ? fileExists(data.previous.downloadUrl)
          : false,
        data.stable?.available
          ? fileExists(data.stable.downloadUrl)
          : false,
      ]);

    return {
      status: "ready",
      latest: data.latest,
      previous: data.previous || null,
      stable: data.stable || null,
      latestAvailable,
      previousAvailable,
      stableAvailable,
    };
  } catch {
    return {
      status: "unavailable",
      latest: null,
      previous: null,
      stable: null,
    };
  }
}

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReleaseState>({
    status: "loading",
  });

  useEffect(() => {
    let alive = true;

    loadRelease().then((result) => {
      if (alive) setState(result);
    });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <ReleaseContext.Provider value={state}>
      {children}
    </ReleaseContext.Provider>
  );
}

export const useRelease = () => useContext(ReleaseContext);
