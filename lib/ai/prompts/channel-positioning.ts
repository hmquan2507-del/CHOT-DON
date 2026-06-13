import type { AIChannelPositioningInput } from "@/types/ai-channel-positioning";

function safeText(value: string | null | undefined) {
  return value?.trim() || "Không có";
}

export function buildChannelPositioningPrompt(input: AIChannelPositioningInput) {
  const system = [
    "Bạn là AI Channel Positioning Strategist cho SaaS Content Chốt Đơn.",
    "Nhiệm vụ: phân tích hồ sơ kênh của người dùng và tạo định vị kênh rõ ràng, thực tế, dễ triển khai cho TikTok, YouTube Shorts hoặc Facebook Reels.",
    "Chỉ trả về JSON hợp lệ. Không markdown. Không giải thích ngoài JSON.",
    "Không tạo kế hoạch nội dung chi tiết theo lịch. Không viết full script. Không tạo AI Content Ideas pipeline.",
    "Không bịa số liệu, doanh thu, cam kết tăng trưởng, review giả hoặc kết quả chắc chắn.",
    "Nếu dữ liệu thiếu, hãy đưa khuyến nghị an toàn và đặt confidence thấp hơn.",
  ].join("\n");

  const user = `
Hồ sơ kênh hiện tại:

- Tên kênh: ${safeText(input.name)}
- Nền tảng: ${safeText(input.platform)}
- Ngách: ${safeText(input.niche)}
- Mục tiêu kênh: ${safeText(input.goal)}
- Tệp khách hàng: ${safeText(input.target_audience)}
- Phong cách nội dung: ${safeText(input.content_style)}
- Kinh nghiệm hiện tại: ${safeText(input.experience_level)}
- Hiện trạng kênh: ${safeText(input.current_situation)}
- Mong muốn xây kênh: ${safeText(input.desired_positioning)}
- Trạng thái kênh: ${safeText(input.channel_status)}
- TikTok URL: ${safeText(input.tiktok_url)}
- YouTube URL: ${safeText(input.youtube_url)}
- Facebook URL: ${safeText(input.facebook_url)}

Hãy trả về JSON đúng shape:

{
  "positioning_statement": "string",
  "target_audience_summary": "string",
  "channel_angle": "string",
  "tone_of_voice": "string",
  "content_pillars": ["string"],
  "starter_video_ideas": ["string"],
  "cta_strategy": "string",
  "mistakes_to_avoid": ["string"],
  "next_steps": ["string"],
  "confidence": "high" | "medium" | "low"
}

Quy tắc:
- positioning_statement: 1–2 câu định vị kênh rõ ràng.
- target_audience_summary: mô tả khách hàng/người xem mục tiêu.
- channel_angle: góc tiếp cận chính của kênh.
- tone_of_voice: giọng điệu nên dùng.
- content_pillars: 3–5 trụ cột nội dung.
- starter_video_ideas: 3–5 ý tưởng video khởi đầu, không viết full script.
- cta_strategy: chiến lược CTA phù hợp mục tiêu.
- mistakes_to_avoid: 3–5 lỗi nên tránh.
- next_steps: 3–5 bước tiếp theo.
- confidence: high nếu hồ sơ rõ, medium nếu đủ cơ bản, low nếu thiếu nhiều dữ liệu.
`;

  return { system, user };
}