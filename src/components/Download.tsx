import { useState } from "react";
import { Copy, Check, Download as DownloadIcon, ShieldCheck } from "lucide-react";
import { useRelease } from "../release";
import type { Release } from "../types";
function ReleaseCard({ item, available, featured=false }: { item: Release | null; available: boolean; featured?: boolean }) {
 const [copied,setCopied]=useState(false);
 if(!item) return <article className="release-card"><span className="release-label">Unavailable</span><h3>Release details pending</h3><p>This release is not currently configured.</p></article>;
 const copy=async()=>{try{await navigator.clipboard.writeText(item.sha256);setCopied(true);setTimeout(()=>setCopied(false),1600)}catch{}};
 return <article className={`release-card ${featured?'release-featured':''}`}>
  <div className="release-top"><span className="release-label">{item.label}</span>{featured&&<span className="latest-tag">LATEST VERSION</span>}</div>
  <h3>SwiftShare <strong>V{item.version}</strong></h3><p className="release-sub">{featured?'The newest SwiftShare release.':'Previous stable release.'}</p>
  <div className="release-meta"><span><b>File size</b>{item.fileSize}</span><span><b>Android</b>{item.minimumAndroidVersion?`${item.minimumAndroidVersion}+`:'See device requirements'}</span><span><b>Release</b>{item.releaseDate||'Release build'}</span></div>
  {available ? <a className={`btn ${featured?'btn-primary':'btn-ghost'} release-download`} href={item.downloadUrl} download={item.fileName}><DownloadIcon size={18}/> Download {item.label} APK</a> : <button className="btn btn-ghost release-download" disabled>APK unavailable</button>}
  <div className="checksum"><div><b>SHA-256</b><code>{item.sha256}</code></div><button onClick={copy} aria-label="Copy SHA-256" title="Copy checksum">{copied?<Check size={17}/>:<Copy size={17}/>}</button></div>
  <p className="release-note"><ShieldCheck size={15}/> Download only from the official SwiftShare website. Android may scan sideloaded apps.</p>
 </article>
}
export default function Download(){const s=useRelease();const latest=s.status==='ready'?s.release:null;const stable=s.status==='ready'?s.stable:s.status==='unavailable'?s.stable:null;return <section id="download" className="section download-section"><div className="wrap"><div className="section-heading"><span className="eyebrow">GET SWIFTSHARE</span><h2>Choose your download.</h2><p>Both releases are available directly from the official SwiftShare website.</p></div><div className="release-grid"><ReleaseCard item={latest || (s.status==='unavailable'?s.release:null)} available={s.status==='ready'} featured/><ReleaseCard item={stable} available={!!stable}/></div><p className="download-footnote">APK files are Android application packages. Your device may display a security prompt before installation. Only install software you trust.</p></div></section>}
