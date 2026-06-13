export type AIProductEnrichmentConfidence = "high" | "medium" | "low";

export type AIProductEnrichmentResult = {
  name: string;
  category: string;
  strengths: string;
  target_customer: string;
  notes: string;
  content_angles: string[];
  hook_examples: string[];
  cta_examples: string[];
  confidence: AIProductEnrichmentConfidence;
};

export type AIProductEnrichmentStatus = "succeeded" | "missing_key" | "failed";

export type AIProductEnrichmentChannelContext = {
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
};

export type AIProductEnrichmentInput = {
  sourceUrl: string;
  sourceDomain: string | null;
  metadataTitle: string | null;
  metadataDescription: string | null;
  userNotes: string | null;
  channel: AIProductEnrichmentChannelContext | null;
};

export type AIProductEnrichmentRunResult = {
  status: AIProductEnrichmentStatus;
  message: string;
  result?: AIProductEnrichmentResult;
  provider?: "openai" | "gemini";
};