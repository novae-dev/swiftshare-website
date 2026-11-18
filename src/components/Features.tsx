import { Check, Clock } from "lucide-react";
import {
  features,
  upcomingFeatures,
} from "../data/features";
import { useRelease } from "../release";

export default function Features() {
  const s = useRelease();

  const supported =
    s.status === "ready"
      ? s.latest.supportedFeatures ?? []
      : [];

  return (
    <section id="features" className="section">
      <div className="wrap split">
        <div>
          <span className="eyebrow">SWIFTSHARE CAPABILITIES</span>
          <h2>What SwiftShare does</h2>
          <p className="lead">
            From sharing installed applications to transferring files between
            nearby devices, explore what is available in SwiftShare.
          </p>
        </div>

        <ul className="feature-list">
          {features.map((feature) => {
            const released = supported.includes(feature.id);

            return (
              <li key={feature.id}>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>

                <span className={`pill ${released ? "pill-on" : ""}`}>
                  {released ? (
                    <Check size={14} aria-hidden />
                  ) : (
                    <Clock size={14} aria-hidden />
                  )}
                  {released ? "Available in V3" : "Not in latest release"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="wrap roadmap-section">
        <div className="section-heading">
          <span className="eyebrow">WHAT'S NEXT</span>
          <h2>More is on the way.</h2>
          <p>
            SwiftShare is being developed with more ways to move files between
            devices.
          </p>
        </div>

        <div className="roadmap-grid">
          {upcomingFeatures.map((feature) => (
            <article className="roadmap-card" key={feature.title}>
              <span className="pill">
                <Clock size={14} aria-hidden />
                Planned
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
