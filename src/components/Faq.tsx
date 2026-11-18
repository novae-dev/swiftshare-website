import { ChevronDown } from "lucide-react";
import { faq } from "../data/faq";

export default function Faq() {
  return (
    <section id="faq" className="section alt">
      <div className="wrap narrow">
        <h2>Frequently asked questions about SwiftShare</h2>
        {faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}<ChevronDown size={20} aria-hidden /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

