export type ChannelPlatform = "TikTok" | "YouTube Shorts" | "Facebook Reels" | "Đa nền tảng";

export type ExperienceLevel = "Người mới bắt đầu" | "Đã từng đăng video" | "Đã có kênh nhưng chưa đều" | "Đã có doanh thu";

export interface Channel {
  id: string;
  user_id: string;
  name: string;
  platform: ChannelPlatform;
  niche: string;
  goal: string;
  target_audience: string | null;
  content_style: string | null;
  experience_level: ExperienceLevel | null;
  created_at: string;
  updated_at: string;
}
