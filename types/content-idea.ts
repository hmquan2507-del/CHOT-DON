export type ContentIdeaPlatform = "TikTok" | "YouTube Shorts" | "Facebook Reels";

export type ContentIdeaGoal =
  | "Bán hàng"
  | "Affiliate"
  | "Tăng nhận diện"
  | "Tăng tương tác"
  | "Giáo dục khách hàng";

export type ContentIdeaSourceType = "ai" | "manual";

export type ContentIdeaStatus =
  | "draft"
  | "ready_for_script"
  | "scripted"
  | "scheduled"
  | "archived";

export type ContentIdeaPriority = "low" | "medium" | "high";

export type ContentIdea = {
  id: string;
  user_id: string;
  channel_id: string;
  product_id: string | null;
  title: string;
  hook: string | null;
  angle: string | null;
  platform: ContentIdeaPlatform | string | null;
  content_format: string | null;
  goal: ContentIdeaGoal | string | null;
  target_audience: string | null;
  cta: string | null;
  hashtags: string | null;
  notes: string | null;
  source_type: ContentIdeaSourceType | string | null;
  status: ContentIdeaStatus | string | null;
  priority: ContentIdeaPriority | string | null;
  ai_reason: string | null;
  ai_raw_result: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type ContentIdeaChannelOption = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

export type ContentIdeaProductOption = {
  id: string;
  channel_id: string | null;
  name: string;
  category: string | null;
  priority: string | null;
};