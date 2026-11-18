import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

const RELEASES = {
  "1.0.0": "SwiftShare-v1.0.0.apk",
  "2.0.0": "SwiftShare_V2.apk",
  "3.0.0": "SwiftShare-v3.apk",
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const version =
    typeof req.query.version === "string" ? req.query.version : "";

  const fileName = RELEASES[version];

  if (!fileName) {
    return res.status(400).json({ error: "Unknown SwiftShare release" });
  }

  try {
    await put(
      "download-events/" + version + "/" + randomUUID() + ".json",
      JSON.stringify({
        version,
        recordedAt: new Date().toISOString(),
      }),
      {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
      }
    );
  } catch (error) {
    console.error("SwiftShare download tracking failed:", error);
  }

  res.setHeader("Cache-Control", "no-store");

  return res.redirect(302, "/downloads/" + fileName);
}
