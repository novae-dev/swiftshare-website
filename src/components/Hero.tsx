import { ArrowDown, Smartphone } from "lucide-react";
import DownloadButton from "./DownloadButton";
import PhoneMockup from "./PhoneMockup";
import { useRelease } from "../release";

export default function Hero() {
  const s = useRelease();
  const min = s.status === "ready" && s.release.minimumAndroidVersion;
  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>Share files. Move faster.</h1>
          <p className="lead">SwiftShare makes sharing applications, photos, videos and other files between Android devices simple and convenient.</p>
          <div className="actions">
            <DownloadButton />
            <a className="btn btn-ghost" href="#features">
              <ArrowDown size={18} aria-hidden /> View features
            </a>
          </div>
          <p className="hint">
            <Smartphone size={16} aria-hidden />
            {min ? `Requires Android ${min} or newer. APK download.` : s.status === "ready" ? "Android app, delivered as an APK." : "SwiftShare is preparing for its first release."}
          </p>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
}
