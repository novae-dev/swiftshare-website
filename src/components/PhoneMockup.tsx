const rows = [
  { name: "Holiday-clip.mp4", meta: "Video", pct: 72 },
  { name: "Notes.pdf", meta: "Document", pct: 100 },
  { name: "Photos (24)", meta: "Images", pct: 38 },
];

// Illustrative interface only; it is not a screenshot of the released app.
export default function PhoneMockup() {
  return (
    <figure className="phone-wrap">
      <div className="phone" role="img" aria-label="Illustration of the SwiftShare app sending three files">
        <div className="phone-notch" />
        <div className="screen">
          <div className="screen-top">
            <strong>Sending</strong>
            <span>3 files</span>
          </div>
          <ul>
            {rows.map((r) => (
              <li key={r.name}>
                <div className="row-head">
                  <span>{r.name}</span>
                  <small>{r.pct}%</small>
                </div>
                <small className="muted">{r.meta}</small>
                <div className="bar"><i style={{ width: `${r.pct}%` }} /></div>
              </li>
            ))}
          </ul>
          <div className="screen-btn">Send more</div>
        </div>
      </div>
      <figcaption>Illustrative preview, not a screenshot.</figcaption>
    </figure>
  );
}
