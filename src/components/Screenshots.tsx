import { ImagePlus } from "lucide-react";
const slots = [
  ["Home screen", "The SwiftShare home interface."],
  ["Send files", "Selecting content to share."],
  ["Receive files", "Receiving shared content."],
  ["Connection", "Connecting nearby devices."],
  ["Transfer progress", "Transfers in progress."],
  ["Transfer history", "Previously completed transfers."],
];
export default function Screenshots() {
  return (
    <section id="screenshots" className="section screenshots-section">
      <div className="wrap">
        <div className="section-heading">
          <span className="eyebrow">SEE IT IN ACTION</span>
          <h2>A closer look at SwiftShare.</h2>
          <p>A look at the features and interface that make sharing simple.</p>
        </div>
        <div className="screenshot-grid">
          {slots.map(([title, desc], i) => (
            <div className="screenshot-slot" key={title}>
              <div className="shot-placeholder">
                <ImagePlus size={30} />
                <span>Screenshot {String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="shot-caption">
                <b>{title}</b>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="screenshots-hint">
          A preview of SwiftShare, captured directly from a real device during
          testing.
        </p>
      </div>
    </section>
  );
}

