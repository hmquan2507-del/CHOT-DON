import type {
  ContentIdeaGoal,
  ContentIdeaPlatform,
  ContentIdeaPriority,
} from "@/types/content-idea";

export type AIContentIdeaConfidence = "high" | "medium" | "low";

export type AIContentIdeaStatus = "succeeded" | "missing_key" | "failed";

export type AIContentIdea = {
  title: string;
  hook: string;
  angle: string;
  platform: ContentIdeaPlatform;
  content_format: string;
  goal: ContentIdeaGoal | string;
  target_audience: string;
  cta: string;
  hashtags: string[];
  notes: string;
  priority: ContentIdeaPriority;
  ai_reason: string;
};

export type AIContentIdeasResult = {
  ideas: AIContentIdea[];
  confidence: AIContentIdeaConfidence;
};

export type AIContentIdeasChannelContext = {
  id: string;
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
  desired_positioning: string | null;
  ai_positioning_result: unknown | null;
};

export type AIContentIdeasProductContext = {
  id: string;
  name: string;
  category: string | null;
  strengths: string | null;
  target_customer: string | null;
  notes: string | null;
  priority: string | null;
};

export type AIContentIdeasInput = {
  channel: AIContentIdeasChannelContext;
  selectedProduct: AIContentIdeasProductContext | null;
  products: AIContentIdeasProductContext[];
  platform: ContentIdeaPlatform;
  goal: ContentIdeaGoal;
  count: number;
};

export type AIContentIdeasRunResult = {
  status: AIContentIdeaStatus;
  message: string;
  result?: AIContentIdeasResult;
  provider?: "openai" | "gemini";
};