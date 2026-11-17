import type { ReactNode } from "react";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "../config";

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section legal">
      <div className="wrap narrow">
        <h1>{title}</h1>
        <p className="muted">Last updated: {LEGAL_UPDATED}</p>
        {children}
        {CONTACT_EMAIL && (
          <>
            <h2>Contact</h2>
            <p>Questions about this page: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          </>
        )}
      </div>
    </section>
  );
}

export const Privacy = () => (
  <Page title="Privacy Policy">
    <h2>This website</h2>
    <p>This website has no accounts, no forms and no database. It does not set advertising cookies. Our hosting provider may keep standard server logs, such as IP addresses and requested pages, to run and protect the service.</p>
    <h2>The SwiftShare app</h2>
    <p>Describe here what the SwiftShare app accesses (for example files you choose to share and the permissions it requests), what it stores on your device, and whether any data leaves your device.</p>
    <h2>Changes</h2>
    <p>We may update this policy. The date above shows when it last changed.</p>
  </Page>
);

export const Terms = () => (
  <Page title="Terms of Use">
    <h2>Using SwiftShare</h2>
    <p>You may download and use SwiftShare for lawful purposes. You are responsible for the files you share and for having the right to share them.</p>
    <h2>Installing from outside Google Play</h2>
    <p>SwiftShare is distributed as an APK from this website. Check the published checksum before installing, and install only if you trust the source.</p>
    <h2>No warranty</h2>
    <p>SwiftShare is provided as is, without warranties of any kind, to the extent permitted by law. Replace this section with terms reviewed for your jurisdiction before publication.</p>
  </Page>
);
