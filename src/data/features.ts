export interface Feature { id: string; title: string; text: string }

export const features: Feature[] = [
  { id: "apk-sharing", title: "Installed-app discovery and APK sharing", text: "Find installed apps, extract their APKs and share them with another Android device." },
  { id: "nearby-transfer", title: "Nearby send and receive", text: "Connect Android devices nearby and send or receive shared content." },
  { id: "media-sharing", title: "Photo and video sharing", text: "Expanded media and universal file sharing is being developed for a future release." },
  { id: "file-sharing", title: "Universal file sharing", text: "Support for sharing different file types is part of the universal-sharing roadmap." },
  { id: "qr-connection", title: "QR-code pairing", text: "QR-based pairing is being developed for a future release." },
  { id: "transfer-progress", title: "Transfer progress and recovery", text: "Advanced progress, pause, retry and recovery workflows are being developed." }
];
