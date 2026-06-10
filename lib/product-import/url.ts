/**
 * Validate a product/affiliate URL.
 * Returns null if valid, or an error message string if invalid.
 */
export function validateUrl(url: string): string | null {
  if (!url || !url.trim()) {
    return "Vui lòng nhập link sản phẩm.";
  }

  const trimmed = url.trim();

  // Allow URLs without protocol (will be normalized later)
  const urlToCheck = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(urlToCheck);

    if (!parsed.protocol.startsWith("http")) {
      return "Link phải bắt đầu bằng http:// hoặc https://.";
    }

    if (!parsed.hostname || !parsed.hostname.includes(".")) {
      return "Link không hợp lệ. Vui lòng kiểm tra lại.";
    }

    return null;
  } catch {
    return "Link không hợp lệ. Vui lòng kiểm tra lại.";
  }
}

/**
 * Normalize a URL by ensuring it has a protocol prefix.
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

/**
 * Extract the domain (hostname without www.) from a URL.
 * Returns null if the URL cannot be parsed.
 */
export function extractDomain(url: string): string | null {
  try {
    const normalized = normalizeUrl(url);
    const parsed = new URL(normalized);
    return parsed.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}
