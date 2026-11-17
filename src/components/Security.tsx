import { useState } from "react";

const points = [
  "Downloads are served over HTTPS when the site is deployed.",
  "You can check the published SHA-256 checksum against your downloaded file.",
  "Releases should be signed with the same developer key every time.",
  "Android's own security checks stay active when you install.",
  "This website is the official distribution point for SwiftShare.",
];

const cmds: Record<string, string> = {
  Windows: "Get-FileHash .\\swiftshare.apk -Algorithm SHA256",
  "macOS / Linux": "shasum -a 256 swiftshare.apk",
  Android: "Use any file manager or hashing app that supports SHA-256.",
};

export default function Security() {
  const [os, setOs] = useState("Windows");
  return (
    <section id="security" className="section">
      <div className="wrap split">
        <div>
          <h2>Check what you downloaded</h2>
          <ul className="plain">
            {points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="verify">
          <h3>Verify the checksum</h3>
          <div className="tabs" role="tablist">
            {Object.keys(cmds).map((k) => (
              <button key={k} role="tab" aria-selected={os === k} className={os === k ? "on" : ""} onClick={() => setOs(k)}>{k}</button>
            ))}
          </div>
          <pre><code>{cmds[os]}</code></pre>
          <p>The result must match the checksum in the Download section exactly. If it does not, delete the file and download it again.</p>
        </div>
      </div>
    </section>
  );
}
