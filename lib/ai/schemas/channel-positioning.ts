import type {
  AIChannelPositioningConfidence,
  AIChannelPositioningResult,
} from "@/types/ai-channel-positioning";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeString(value: unknown, maxLength = 1400) {
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
    .map((item) => normalizeString(item, 260))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeConfidence(value: unknown): AIChannelPositioningConfidence {
  if (value === "high" || value === "medium" || value === "low") {
    return value;
  }

  return "low";
}

export function normalizeAIChannelPositioningResult(
  value: unknown,
): AIChannelPositioningResult | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    positioning_statement: normalizeString(value.positioning_statement, 900),
    target_audience_summary: normalizeString(
      value.target_audience_summary,
      900,
    ),
    channel_angle: normalizeString(value.channel_angle, 900),
    tone_of_voice: normalizeString(value.tone_of_voice, 600),
    content_pillars: normalizeStringArray(value.content_pillars),
    starter_video_ideas: normalizeStringArray(value.starter_video_ideas),
    cta_strategy: normalizeString(value.cta_strategy, 900),
    mistakes_to_avoid: normalizeStringArray(value.mistakes_to_avoid),
    next_steps: normalizeStringArray(value.next_steps),
    confidence: normalizeConfidence(value.confidence),
  };
}