import type { ProductMetadataResult } from "@/types/product-import";

/**
 * Extract basic metadata (OG tags, title, description) from an external URL.
 * Uses server-side fetch and regex-based HTML parsing.
 * No external packages, no Playwright/Puppeteer, no AI.
 * Best-effort — may return partial or empty metadata.
 */
export async function extractMetadata(
  sourceUrl: string,
): Promise<ProductMetadataResult> {
  const html = await fetchHtml(sourceUrl);
  const rawMetadata: Record<string, string> = {};

  // Extract OG and Twitter meta tags
  const ogTitle = extractMetaValue(html, "og:title");
  const ogDescription = extractMetaValue(html, "og:description");
  const ogImage = extractMetaValue(html, "og:image");
  const twitterTitle = extractMetaValue(html, "twitter:title");
  const twitterDescription = extractMetaValue(html, "twitter:description");
  const twitterImage = extractMetaValue(html, "twitter:image");

  // Store raw metadata
  if (ogTitle) rawMetadata["og:title"] = ogTitle;
  if (ogDescription) rawMetadata["og:description"] = ogDescription;
  if (ogImage) rawMetadata["og:image"] = ogImage;
  if (twitterTitle) rawMetadata["twitter:title"] = twitterTitle;
  if (twitterDescription) rawMetadata["twitter:description"] = twitterDescription;
  if (twitterImage) rawMetadata["twitter:image"] = twitterImage;

  // Fallback to <title> tag
  const pageTitle = extractTitleTag(html);
  if (pageTitle && !ogTitle && !twitterTitle) {
    rawMetadata["title"] = pageTitle;
  }

  // Fallback to <meta name="description">
  const metaDescription = extractMetaValue(html, "description");
  if (metaDescription && !ogDescription && !twitterDescription) {
    rawMetadata["description"] = metaDescription;
  }

  // Determine best title: og:title > twitter:title > <title>
  const title = ogTitle ?? twitterTitle ?? pageTitle ?? null;

  // Determine best description: og:description > twitter:description > meta description
  const description = ogDescription ?? twitterDescription ?? metaDescription ?? null;

  // Determine best image: og:image > twitter:image
  const imageUrl = ogImage ?? twitterImage ?? null;

  // Detect source domain
  let sourceDomain: string | null = null;
  try {
    const parsed = new URL(sourceUrl);
    sourceDomain = parsed.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    // ignore
  }

  return {
    sourceUrl,
    sourceDomain,
    title,
    description,
    imageUrl,
    rawMetadata,
  };
}

/**
 * Fetch HTML from a URL with timeout and reasonable headers.
 * Does not execute JavaScript — only fetches the raw HTML.
 */
async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ContentChotDonBot/1.0; +https://contentchotdon.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(
        `Không thể truy cập link (HTTP ${response.status}).`,
      );
    }

    const text = await response.text();

    if (!text || text.length < 50) {
      throw new Error("Trang web không có nội dung.");
    }

    return text;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Quá thời gian chờ. Link có thể quá chậm hoặc không khả dụng.");
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Không thể kết nối đến link. Vui lòng kiểm tra lại URL.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Extract a meta tag value by property or name attribute.
 * Handles both:
 *   <meta property="og:title" content="value" />
 *   <meta name="description" content="value" />
 *   <meta content="value" property="og:title" />
 */
function extractMetaValue(html: string, name: string): string | null {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Pattern 1: property="name" or name="name" before content="value"
  const pattern1 = new RegExp(
    `<meta[^>]+(?:property|name)\\s*=\\s*["']${escapedName}["'][^>]+content\\s*=\\s*["']([^"']*)["']`,
    "i",
  );
  const match1 = html.match(pattern1);
  if (match1?.[1]) {
    const value = match1[1].trim();
    if (value) return value;
  }

  // Pattern 2: content="value" before property="name" or name="name"
  const pattern2 = new RegExp(
    `<meta[^>]+content\\s*=\\s*["']([^"']*)["'][^>]+(?:property|name)\\s*=\\s*["']${escapedName}["']`,
    "i",
  );
  const match2 = html.match(pattern2);
  if (match2?.[1]) {
    const value = match2[1].trim();
    if (value) return value;
  }

  return null;
}

/**
 * Extract the <title> tag content.
 */
function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() || null;
}
