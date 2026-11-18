import { useEffect, useState } from "react";
import { Download, BarChart3 } from "lucide-react";

interface DownloadStatsData {
  total: number;
  versions: Record<string, number>;
  updatedAt: string;
}

const numberFormat = new Intl.NumberFormat();

export default function DownloadStats() {
  const [stats, setStats] = useState<DownloadStatsData | null>(null);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const response = await fetch("/api/stats", {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Statistics unavailable");

        const data = (await response.json()) as DownloadStatsData;

        if (active) setStats(data);
      } catch {
        // Statistics remain unavailable until the next successful request.
      }
    };

    loadStats();

    const interval = window.setInterval(loadStats, 60_000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const formatCount = (version: string) =>
    stats
      ? numberFormat.format(stats.versions?.[version] ?? 0)
      : "—";

  return (
    <section id="download-stats" className="section stats-section">
      <div className="wrap">
        <div className="stats-panel">
          <div className="stats-intro">
            <span className="stats-icon">
              <BarChart3 size={22} />
            </span>

            <div>
              <span className="eyebrow">SWIFTSHARE DOWNLOADS</span>
              <h2>Growing, one share at a time.</h2>
              <p>
                Download requests made through the official SwiftShare website.
              </p>
            </div>
          </div>

          <div className="stats-total">
            <span>Total downloads</span>
            <strong>
              {stats ? numberFormat.format(stats.total) : "—"}
            </strong>
          </div>

          <div className="stats-versions">
            <div>
              <span>V3.0.0</span>
              <strong>{formatCount("3.0.0")}</strong>
            </div>

            <div>
              <span>V2.0.0</span>
              <strong>{formatCount("2.0.0")}</strong>
            </div>

            <div>
              <span>V1.0.0</span>
              <strong>{formatCount("1.0.0")}</strong>
            </div>
          </div>

          <p className="stats-note">
            <Download size={14} />
            Counts download requests started from this website, not confirmed
            installations.
          </p>
        </div>
      </div>
    </section>
  );
}
