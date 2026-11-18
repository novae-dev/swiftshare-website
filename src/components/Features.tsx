import { Check, Clock } from "lucide-react";
import { features } from "../data/features";
import { useRelease } from "../release";

export default function Features() {
  const s = useRelease();
  const supported = s.status === "ready" ? s.release.supportedFeatures ?? [] : [];
  return (
    <section id="features" className="section">
      <div className="wrap split">
        <div>
          <h2>What SwiftShare does</h2>
          <p className="lead">See what is included in the current V2 download and what is being developed for future releases.</p>
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
                  {released ? <Check size={14} aria-hidden /> : <Clock size={14} aria-hidden />}
                  {released ? "In V2" : "In development"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

