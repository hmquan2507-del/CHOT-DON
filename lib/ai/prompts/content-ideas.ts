import type { AIContentIdeasInput } from "@/types/ai-content-ideas";

function safeText(value: string | null | undefined) {
  return value?.trim() || "Không có";
}

function safeJson(value: unknown) {
  if (!value) {
    return "Không có";
  }

  try {
    return JSON.stringify(value, null, 2).slice(0, 4000);
  } catch {
    return "Không đọc được dữ liệu định vị.";
  }
}

export function buildContentIdeasPrompt(input: AIContentIdeasInput) {
  const system = [
    "Bạn là AI Content Ideas Strategist cho SaaS Content Chốt Đơn.",
    "Nhiệm vụ: tạo ý tưởng video ngắn có thể lưu vào thư viện ý tưởng.",
    "Chỉ trả về JSON hợp lệ. Không markdown. Không giải thích ngoài JSON.",
    "Không viết full script. Không tạo calendar. Không tạo metrics. Không tạo hình/video.",
    "Không bịa review, doanh thu, cam kết kết quả, claim y tế hoặc thông tin sản phẩm không có căn cứ.",
    "Nếu thiếu dữ liệu, hãy tạo ý tưởng an toàn, dễ chỉnh sửa, confidence thấp hơn.",
  ].join("\n");

  const productsText =
    input.products.length > 0
      ? input.products
          .map((product, index) => {
            return [
              `Sản phẩm ${index + 1}:`,
              `- id: ${product.id}`,
              `- name: ${product.name}`,
              `- category: ${safeText(product.category)}`,
              `- strengths: ${safeText(product.strengths)}`,
              `- target_customer: ${safeText(product.target_customer)}`,
              `- notes: ${safeText(product.notes)}`,
              `- priority: ${safeText(product.priority)}`,
            ].join("\n");
          })
          .join("\n\n")
      : "Không có sản phẩm.";

  const selectedProductText = input.selectedProduct
    ? [
        `- id: ${input.selectedProduct.id}`,
        `- name: ${input.selectedProduct.name}`,
        `- category: ${safeText(input.selectedProduct.category)}`,
        `- strengths: ${safeText(input.selectedProduct.strengths)}`,
        `- target_customer: ${safeText(input.selectedProduct.target_customer)}`,
        `- notes: ${safeText(input.selectedProduct.notes)}`,
      ].join("\n")
    : "Không chọn sản phẩm cụ thể.";

  const user = `
Hãy tạo ${input.count} ý tưởng video ngắn.

Yêu cầu người dùng:
- Platform: ${input.platform}
- Goal: ${input.goal}

Hồ sơ kênh:
- Tên kênh: ${safeText(input.channel.name)}
- Nền tảng chính: ${safeText(input.channel.platform)}
- Ngách: ${safeText(input.channel.niche)}
- Mục tiêu kênh: ${safeText(input.channel.goal)}
- Tệp khách hàng: ${safeText(input.channel.target_audience)}
- Phong cách nội dung: ${safeText(input.channel.content_style)}
- Mong muốn định vị: ${safeText(input.channel.desired_positioning)}

AI Channel Positioning:
${safeJson(input.channel.ai_positioning_result)}

Sản phẩm được chọn:
${selectedProductText}

Danh sách sản phẩm tham khảo:
${productsText}

Trả về JSON đúng shape:

{
  "ideas": [
    {
      "title": "string",
      "hook": "string",
      "angle": "string",
      "platform": "TikTok" | "YouTube Shorts" | "Facebook Reels",
      "content_format": "string",
      "goal": "string",
      "target_audience": "string",
      "cta": "string",
      "hashtags": ["string"],
      "notes": "string",
      "priority": "low" | "medium" | "high",
      "ai_reason": "string"
    }
  ],
  "confidence": "high" | "medium" | "low"
}

Quy tắc:
- title: tên ý tưởng ngắn, rõ.
- hook: câu mở đầu gây chú ý.
- angle: góc khai thác nội dung.
- content_format: ví dụ review nhanh, so sánh, kể chuyện, checklist, sai lầm thường gặp.
- cta: lời kêu gọi hành động phù hợp, không ép mua quá lố.
- hashtags: 3–8 hashtag, bắt đầu bằng #.
- notes: ghi chú triển khai ngắn.
- ai_reason: giải thích vì sao ý tưởng này phù hợp với kênh/sản phẩm.
- Không tạo full script.
`;

  return { system, user };
}