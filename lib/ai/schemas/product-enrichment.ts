import type {
  AIProductEnrichmentConfidence,
  AIProductEnrichmentResult,
} from "@/types/ai-product-enrichment";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeString(value: unknown, maxLength = 1200) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizeStringArray(value: unknown, maxItems = 5) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeString(item, 240))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeConfidence(value: unknown): AIProductEnrichmentConfidence {
  if (value === "high" || value === "medium" || value === "low") {
    return value;
  }

  return "low";
}

export function normalizeAIProductEnrichmentResult(
  value: unknown,
): AIProductEnrichmentResult | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    name: normalizeString(value.name, 180),
    category: normalizeString(value.category, 120),
    strengths: normalizeString(value.strengths, 1200),
    target_customer: normalizeString(value.target_customer, 900),
    notes: normalizeString(value.notes, 1200),
    content_angles: normalizeStringArray(value.content_angles),
    hook_examples: normalizeStringArray(value.hook_examples),
    cta_examples: normalizeStringArray(value.cta_examples),
    confidence: normalizeConfidence(value.confidence),
  };
}