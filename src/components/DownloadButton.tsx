import { Download } from "lucide-react";
import { useRelease } from "../release";

export default function DownloadButton({ variant = "primary", label = "Download APK" }: { variant?: "primary" | "light"; label?: string }) {
  const s = useRelease();
  const cls = `btn btn-${variant}`;
  if (s.status === "ready") {
    return (
      <a className={cls} href={s.release.downloadUrl} download={s.release.fileName}>
        <Download size={18} aria-hidden /> {label}
      </a>
    );
  }
  return (
    <button className={cls} disabled title="No APK has been published yet">
      <Download size={18} aria-hidden /> {s.status === "loading" ? "Checking release…" : label}
    </button>
  );
}
