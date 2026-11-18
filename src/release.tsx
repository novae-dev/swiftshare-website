import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Release, ReleaseCatalog } from "./types";
export type ReleaseState = { status: "loading" } | { status: "unavailable"; release: Release | null; stable: Release | null } | { status: "ready"; release: Release; stable: Release | null };
const ReleaseContext = createContext<ReleaseState>({ status: "loading" });
async function fileExists(url: string) {
  try { const r = await fetch(url, { method: "HEAD", cache: "no-store" }); const t = r.headers.get("content-type") || ""; return r.ok && !t.includes("text/html"); } catch { return false; }
}
async function loadRelease(): Promise<ReleaseState> {
  try { const res = await fetch("/release.json", { cache: "no-store" }); if (!res.ok) throw new Error("release config unavailable");
    const data = await res.json() as ReleaseCatalog; const latest = data.latest; const stable = data.stable;
    const [latestOk, stableOk] = await Promise.all([latest?.available ? fileExists(latest.downloadUrl) : false, stable?.available ? fileExists(stable.downloadUrl) : false]);
    const latestRelease = latestOk ? latest : null; const stableRelease = stableOk ? stable : null;
    return latestRelease ? { status: "ready", release: latestRelease, stable: stableRelease } : { status: "unavailable", release: latest || null, stable: stableRelease };
  } catch { return { status: "unavailable", release: null, stable: null }; }
}
export function ReleaseProvider({ children }: { children: ReactNode }) {
 const [state,setState]=useState<ReleaseState>({status:"loading"});
 useEffect(()=>{let alive=true; loadRelease().then(s=>{if(alive)setState(s)}); return ()=>{alive=false}},[]);
 return <ReleaseContext.Provider value={state}>{children}</ReleaseContext.Provider>;
}
export const useRelease=()=>useContext(ReleaseContext);
