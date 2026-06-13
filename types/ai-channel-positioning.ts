export type AIChannelPositioningConfidence = "high" | "medium" | "low";

export type AIChannelPositioningStatus = "succeeded" | "missing_key" | "failed";

export type AIChannelPositioningResult = {
  positioning_statement: string;
  target_audience_summary: string;
  channel_angle: string;
  tone_of_voice: string;
  content_pillars: string[];
  starter_video_ideas: string[];
  cta_strategy: string;
  mistakes_to_avoid: string[];
  next_steps: string[];
  confidence: AIChannelPositioningConfidence;
};

export type AIChannelPositioningInput = {
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
  experience_level: string | null;
  current_situation: string | null;
  desired_positioning: string | null;
  channel_status: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  facebook_url: string | null;
};

export type AIChannelPositioningRunResult = {
  status: AIChannelPositioningStatus;
  message: string;
  result?: AIChannelPositioningResult;
  provider?: "openai" | "gemini";
};