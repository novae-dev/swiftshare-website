import { list } from "@vercel/blob";

const RELEASE_VERSIONS = ["1.0.0", "2.0.0", "3.0.0"];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const versions = Object.fromEntries(
      RELEASE_VERSIONS.map((version) => [version, 0])
    );

    let cursor;
    let hasMore = true;

    while (hasMore) {
      const page = await list({
        prefix: "download-events/",
        limit: 1000,
        ...(cursor ? { cursor } : {}),
      });

      for (const blob of page.blobs) {
        const match = blob.pathname.match(
          /^download-events\/(1\.0\.0|2\.0\.0|3\.0\.0)\//
        );

        if (match && Object.prototype.hasOwnProperty.call(versions, match[1])) {
          versions[match[1]] += 1;
        }
      }

      hasMore = page.hasMore;
      cursor = page.cursor;

      if (hasMore && !cursor) break;
    }

    const total = Object.values(versions).reduce(
      (sum, count) => sum + count,
      0
    );

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );

    return res.status(200).json({
      total,
      versions,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("SwiftShare statistics lookup failed:", error);

    return res.status(503).json({
      error: "Statistics are temporarily unavailable",
    });
  }
}
