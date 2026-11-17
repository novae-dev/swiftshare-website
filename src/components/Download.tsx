import { useState } from "react";
import { Copy, Check } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { useRelease } from "../release";

function Spec({ label, value }: { label: string; value?: string }) {
  return (
    <div className="spec">
      <dt>{label}</dt>
      <dd>{value || "Published with the release"}</dd>
    </div>
  );
}

export default function Download() {
  const s = useRelease();
  const [copied, setCopied] = useState(false);
  const r = s.status === "loading" ? null : s.release;
  const ready = s.status === "ready";

  const copy = async () => {
    if (!r?.sha256) return;
    try {
      await navigator.clipboard.writeText(r.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the checksum is still selectable */
    }
  };

  return (
    <section id="download" className="section">
      <div className="wrap">
        <div className="dl-card">
          <div className="dl-head">
            <div>
              <h2>{ready ? `Download SwiftShare ${r!.version}` : "Download SwiftShare"}</h2>
              <p>{ready ? "Official APK for Android, hosted on this website." : "SwiftShare is preparing for its first release."}</p>
            </div>
            <DownloadButton variant="light" />
          </div>
          <dl className="specs">
            <Spec label="Version" value={ready ? r!.version : undefined} />
            <Spec label="File size" value={ready ? r!.fileSize : undefined} />
            <Spec label="Android" value={ready && r!.minimumAndroidVersion ? `${r!.minimumAndroidVersion} or newer` : undefined} />
            <Spec label="Release date" value={ready ? r!.releaseDate : undefined} />
          </dl>
          <div className="dl-lower">
            <div>
              <h3>What's new</h3>
              {ready && r!.releaseNotes.length > 0 ? (
                <ul className="notes">{r!.releaseNotes.map((n) => <li key={n}>{n}</li>)}</ul>
              ) : (
                <p className="muted-light">Release notes will appear here with the first release.</p>
              )}
            </div>
            <div>
              <h3>SHA-256 checksum</h3>
              {ready && r!.sha256 ? (
                <div className="hash">
                  <code>{r!.sha256}</code>
                  <button onClick={copy} aria-label="Copy checksum">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
                </div>
              ) : (
                <p className="muted-light">The checksum will be published with the APK.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
