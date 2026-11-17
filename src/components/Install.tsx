const steps = [
  "Download the APK from the official SwiftShare website.",
  "Open the downloaded APK from your notifications or Files app.",
  "Follow Android's installation prompts.",
  "Review Android's security warnings and continue only if you trust the source.",
  "Open SwiftShare after installation.",
];

export default function Install() {
  return (
    <section id="install" className="section alt">
      <div className="wrap split">
        <div>
          <h2>Install SwiftShare</h2>
          <p className="lead">Installing outside Google Play takes a few extra taps. Android may ask you to allow installs from your browser or file manager.</p>
          <p className="note">Google Play Protect may scan apps installed outside Google Play. Installing from this website does not mean the app is Google Play verified, and it does not guarantee that an app is safe.</p>
        </div>
        <ol className="steps">
          {steps.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
