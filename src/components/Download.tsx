import { useState } from "react";
import {
  Copy,
  Check,
  Download as DownloadIcon,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useRelease } from "../release";
import { features } from "../data/features";
import type { Release } from "../types";

function ReleaseCard({
  item,
  available,
  featured = false,
}: {
  item: Release | null;
  available: boolean;
  featured?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access may be unavailable.
    }
  };

  const description = featured
    ? "The newest SwiftShare release."
    : item.label === "Stable"
      ? "The original stable release."
      : "A previous SwiftShare release.";

  const includedFeatures = features.filter((feature) =>
    item.supportedFeatures?.includes(feature.id)
  );

  return (
    <article className={`release-card ${featured ? "release-featured" : ""}`}>
      <div className="release-top">
        <span className="release-label">{item.label}</span>
        {featured && <span className="latest-tag">LATEST VERSION</span>}
      </div>

      <h3>
        SwiftShare <strong>V{item.version}</strong>
      </h3>

      <p className="release-sub">{description}</p>

      <div className="release-meta">
        <span>
          <b>File size</b>
          {item.fileSize}
        </span>
        <span>
          <b>Minimum Android</b>
          {item.minimumAndroidVersion}
        </span>
        <span>
          <b>Release</b>
          {item.releaseDate || "Date not specified"}
        </span>
      </div>

      {available ? (
        <a
          className={`btn ${featured ? "btn-primary" : "btn-ghost"} release-download`}
          href={"/api/download?version=" + encodeURIComponent(item.version)}
          download={item.fileName}
        >
          <DownloadIcon size={18} />
          Download {item.label} APK
        </a>
      ) : (
        <button className="btn btn-ghost release-download" disabled>
          APK unavailable
        </button>
      )}

      <details className="release-details">
        <summary>
          Version details
          <ChevronDown size={17} />
        </summary>

        <div className="release-details-content">
          <div>
            <h4>Included features</h4>
            {includedFeatures.length > 0 ? (
              <ul>
                {includedFeatures.map((feature) => (
                  <li key={feature.id}>{feature.title}</li>
                ))}
              </ul>
            ) : (
              <p>No feature information available.</p>
            )}
          </div>

          <div>
            <h4>Device compatibility</h4>
            <p>{item.compatibility}</p>
          </div>

          <div>
            <h4>Requirements</h4>
            <ul>
              {item.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Release notes</h4>
            <ul>
              {item.releaseNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>

      <div className="checksum">
        <div>
          <b>SHA-256</b>
          <code>{item.sha256}</code>
        </div>
        <button onClick={copy} aria-label="Copy SHA-256" title="Copy checksum">
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </div>

      <p className="release-note">
        <ShieldCheck size={15} />
        Download only from the official SwiftShare website. Android may scan
        sideloaded apps.
      </p>
    </article>
  );
}

export default function Download() {
  const state = useRelease();

  const latest = state.status === "ready" ? state.latest : null;
  const previous = state.status === "ready" ? state.previous : null;
  const stable = state.status === "ready" ? state.stable : null;

  return (
    <section id="download" className="section download-section">
      <div className="wrap">
        <div className="section-heading">
          <span className="eyebrow">GET SWIFTSHARE</span>
          <h2>Choose your download.</h2>
          <p>
            Explore the available SwiftShare releases and choose the version
            that suits your device.
          </p>
        </div>

        <div className="release-grid">
          <ReleaseCard
            item={latest}
            available={state.status === "ready" && state.latestAvailable}
            featured
          />

          <ReleaseCard
            item={previous}
            available={state.status === "ready" && state.previousAvailable}
          />

          <ReleaseCard
            item={stable}
            available={state.status === "ready" && state.stableAvailable}
          />
        </div>

        <p className="download-footnote">
          APK files are Android application packages. Your device may display
          a security prompt before installation. Only install software you
          trust.
        </p>
      </div>
    </section>
  );
}

