import { Download } from "lucide-react";
import { useRelease } from "../release";

export default function DownloadButton({
  variant = "primary",
  label = "Download APK",
}: {
  variant?: "primary" | "light";
  label?: string;
}) {
  const s = useRelease();
  const cls = `btn btn-${variant}`;

  if (s.status === "ready" && s.latestAvailable) {
    return (
      <a
        className={cls}
        href={"/api/download?version=" + encodeURIComponent(s.latest.version)}
        download={s.latest.fileName}
      >
        <Download size={18} aria-hidden /> {label}
      </a>
    );
  }

  return (
    <button className={cls} disabled title="No APK is currently available">
      <Download size={18} aria-hidden />
      {s.status === "loading" ? "Checking release..." : "APK unavailable"}
    </button>
  );
}

