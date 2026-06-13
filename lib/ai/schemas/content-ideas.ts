import type {
  AIContentIdea,
  AIContentIdeaConfidence,
  AIContentIdeasResult,
} from "@/types/ai-content-ideas";
import type {
  ContentIdeaPlatform,
  ContentIdeaPriority,
} from "@/types/content-idea";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeString(value: unknown, maxLength = 1200) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizePlatform(value: unknown): ContentIdeaPlatform {
  if (
    value === "TikTok" ||
    value === "YouTube Shorts" ||
    value === "Facebook Reels"
  ) {
    return value;
  }

  return "TikTok";
}

function normalizePriority(value: unknown): ContentIdeaPriority {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }

  return "medium";
}

function normalizeConfidence(value: unknown): AIContentIdeaConfidence {
  if (value === "high" || value === "medium" || value === "low") {
    return value;
  }

  return "low";
}

function normalizeHashtags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeString(item, 40))
    .filter(Boolean)
    .map((item) => (item.startsWith("#") ? item : `#${item}`))
    .slice(0, 8);
}

function normalizeIdea(value: unknown): AIContentIdea | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = normalizeString(value.title, 180);
  const hook = normalizeString(value.hook, 260);

  if (!title || !hook) {
    return null;
  }

  return {
    title,
    hook,
    angle: normalizeString(value.angle, 500),
    platform: normalizePlatform(value.platform),
    content_format: normalizeString(value.content_format, 120),
    goal: normalizeString(value.goal, 120),
    target_audience: normalizeString(value.target_audience, 500),
    cta: normalizeString(value.cta, 260),
    hashtags: normalizeHashtags(value.hashtags),
    notes: normalizeString(value.notes, 800),
    priority: normalizePriority(value.priority),
    ai_reason: normalizeString(value.ai_reason, 800),
  };
}

export function normalizeAIContentIdeasResult(
  value: unknown,
  requestedCount: number,
): AIContentIdeasResult | null {
  if (!isRecord(value) || !Array.isArray(value.ideas)) {
    return null;
  }

  const ideas = value.ideas
    .map((item) => normalizeIdea(item))
    .filter((item): item is AIContentIdea => Boolean(item))
    .slice(0, requestedCount);

  if (ideas.length === 0) {
    return null;
  }

  return {
    ideas,
    confidence: normalizeConfidence(value.confidence),
  };
}