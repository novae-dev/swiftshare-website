import { Check, Clock } from "lucide-react";
import { features } from "../data/features";
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
          <h2>What SwiftShare does</h2>
          <p className="lead">
            Explore the features included in the latest SwiftShare release.
          </p>
        </div>

        <ul className="feature-list">
          {features.map((f) => {
            const released = supported.includes(f.id);

            return (
              <li key={f.id}>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>

                <span className={`pill ${released ? "pill-on" : ""}`}>
                  {released ? (
                    <Check size={14} aria-hidden />
                  ) : (
                    <Clock size={14} aria-hidden />
                  )}
                  {released ? "In latest release" : "In development"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
