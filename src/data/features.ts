export interface Feature {
  id: string;
  title: string;
  text: string;
}

export const features: Feature[] = [
  {
    id: "apk-sharing",
    title: "Installed-app discovery and APK sharing",
    text: "Find installed applications, extract their APK files and share them with another Android device.",
  },
  {
    id: "nearby-transfer",
    title: "Nearby send and receive",
    text: "Connect nearby Android devices to send and receive content.",
  },
  {
    id: "media-sharing",
    title: "Photo and video sharing",
    text: "Share photos and videos between supported nearby devices.",
  },
  {
    id: "file-sharing",
    title: "Universal file sharing",
    text: "Share different types of files instead of being limited to APK packages.",
  },
  {
    id: "qr-connection",
    title: "QR-code pairing",
    text: "Connect devices through QR-code pairing.",
  },
  {
    id: "transfer-progress",
    title: "Transfer progress and recovery",
    text: "Monitor transfers and use the available recovery features when transfers are interrupted.",
  },
];

export const upcomingFeatures = [
  {
    title: "PC transfers",
    text: "Send files between Android devices and computers through a browser-based local connection.",
  },
  {
    title: "Group sharing",
    text: "Share files with multiple nearby devices, with individual recipient controls.",
  },
];

