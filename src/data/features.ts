export interface Feature { id: string; title: string; text: string }

// A feature is shown as "Released" only when its id is listed in
// public/release.json -> supportedFeatures AND the APK is available.
export const features: Feature[] = [
  { id: "apk-sharing", title: "APK sharing", text: "Send apps from one Android device to another as APK files." },
  { id: "media-sharing", title: "Photo and video sharing", text: "Move pictures and videos without compressing them through a chat app." },
  { id: "file-sharing", title: "General file sharing", text: "Documents, audio, archives and other files travel the same way." },
  { id: "qr-connection", title: "QR-code connection", text: "Scan a code on the other device to connect." },
  { id: "transfer-progress", title: "Transfer progress", text: "See how much of each file has been sent." },
  { id: "transfer-resume", title: "Transfer recovery", text: "Pick up an interrupted transfer instead of starting over." },
  { id: "simple-ux", title: "Simple experience", text: "A short path from opening the app to sending a file." },
];
