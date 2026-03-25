import { Router, type IRouter } from "express";
import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";

const router: IRouter = Router();

const REDBUBBLE_RSS_URL =
  "https://www.redbubble.com/people/VionexStudio/shop.rss";

interface RssItem {
  title?: string;
  link?: string;
  description?: string;
  guid?: string | { "#text"?: string };
  enclosure?: {
    "@_url"?: string;
    "@_type"?: string;
  };
  "media:content"?: {
    "@_url"?: string;
  };
  "media:thumbnail"?: {
    "@_url"?: string;
  };
}

function extractImageFromDescription(description: string): string {
  const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    return imgMatch[1];
  }
  return "";
}

function getLargerImage(url: string): string {
  if (url.includes("redbubble.com") || url.includes("rb.gy")) {
    return url.replace(/\?.*$/, "?w=680");
  }
  return url;
}

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Feedfetcher-Google; (+http://www.google.com/feedfetcher.html)",
];

async function fetchRss(): Promise<string> {
  const errors: string[] = [];

  for (const userAgent of USER_AGENTS) {
    try {
      const response = await fetch(REDBUBBLE_RSS_URL, {
        headers: {
          "User-Agent": userAgent,
          Accept: "application/rss+xml, application/xml, text/xml, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        redirect: "follow",
      });

      if (response.ok) {
        return await response.text();
      }
      errors.push(`HTTP ${response.status} with UA: ${userAgent.substring(0, 40)}`);
    } catch (err) {
      errors.push(`Fetch error: ${err}`);
    }
  }

  throw new Error(`All fetch attempts failed: ${errors.join("; ")}`);
}

function parseRssItems(xmlText: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name) => name === "item",
    cdataPropName: "__cdata",
  });

  const parsed = parser.parse(xmlText);
  const items: RssItem[] = parsed?.rss?.channel?.item ?? [];

  return items.slice(0, 20).map((item: RssItem, idx: number) => {
    const title =
      typeof item.title === "string"
        ? item.title
        : `Product ${idx + 1}`;

    const productUrl =
      typeof item.link === "string"
        ? item.link
        : typeof item.guid === "string"
        ? item.guid
        : (item.guid as { "#text"?: string })?.["#text"] ?? "";

    let imageUrl =
      item.enclosure?.["@_url"] ??
      item["media:content"]?.["@_url"] ??
      item["media:thumbnail"]?.["@_url"] ??
      "";

    if (!imageUrl && item.description) {
      imageUrl = extractImageFromDescription(String(item.description));
    }

    if (imageUrl) {
      imageUrl = getLargerImage(imageUrl);
    }

    const description =
      typeof item.description === "string"
        ? item.description.replace(/<[^>]+>/g, "").trim()
        : "";

    const id = productUrl || `product-${idx}`;

    return { id, title, imageUrl, productUrl, description };
  });
}

router.get("/products", async (req, res) => {
  try {
    const xmlText = await fetchRss();
    const products = parseRssItems(xmlText);
    res.json({ products });
  } catch (err) {
    req.log.warn({ err }, "RSS fetch failed, returning empty product list");
    res.json({
      products: [],
      _notice: "Products could not be loaded from Redbubble at this time.",
    });
  }
});

export default router;
