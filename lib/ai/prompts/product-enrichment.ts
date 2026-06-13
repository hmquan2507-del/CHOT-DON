import type { AIProductEnrichmentInput } from "@/types/ai-product-enrichment";

function safeText(value: string | null | undefined) {
  return value?.trim() || "Không có";
}

export function buildProductEnrichmentPrompt(input: AIProductEnrichmentInput) {
  const system = [
    "Bạn là AI Product Enrichment Assistant cho SaaS Content Chốt Đơn.",
    "Nhiệm vụ: gợi ý thông tin bán hàng cho sản phẩm dựa trên URL, metadata, ghi chú người dùng và hồ sơ kênh.",
    "Chỉ trả về JSON hợp lệ. Không markdown. Không giải thích ngoài JSON.",
    "Tuyệt đối không bịa giá, hoa hồng, affiliate URL, image URL, review giả, cam kết kết quả, claim y tế hoặc claim chính sách nền tảng.",
    "Nếu thiếu dữ liệu, hãy để field liên quan là chuỗi rỗng hoặc mảng rỗng.",
  ].join("\n");

  const user = `
Dữ liệu sản phẩm:
- URL: ${input.sourceUrl}
- Domain: ${safeText(input.sourceDomain)}
- Metadata title: ${safeText(input.metadataTitle)}
- Metadata description: ${safeText(input.metadataDescription)}
- Ghi chú người dùng: ${safeText(input.userNotes)}

Hồ sơ kênh:
- Tên kênh: ${safeText(input.channel?.name)}
- Nền tảng: ${safeText(input.channel?.platform)}
- Ngách: ${safeText(input.channel?.niche)}
- Mục tiêu: ${safeText(input.channel?.goal)}
- Tệp khách hàng: ${safeText(input.channel?.target_audience)}
- Phong cách nội dung: ${safeText(input.channel?.content_style)}

Hãy trả về JSON đúng shape:

{
  "name": "string",
  "category": "string",
  "strengths": "string",
  "target_customer": "string",
  "notes": "string",
  "content_angles": ["string"],
  "hook_examples": ["string"],
  "cta_examples": ["string"],
  "confidence": "high" | "medium" | "low"
}

Quy tắc:
- name: chỉ gợi ý nếu có căn cứ từ metadata hoặc ghi chú.
- category: ngách/phân loại ngắn gọn.
- strengths: điểm mạnh bán hàng hợp lý, không claim quá đà.
- target_customer: mô tả khách hàng phù hợp.
- notes: ghi chú giúp người dùng hoàn thiện ProductForm.
- content_angles: tối đa 5 góc nội dung.
- hook_examples: tối đa 5 hook ngắn.
- cta_examples: tối đa 5 CTA ngắn.
- confidence: high nếu metadata rõ, medium nếu có vài dữ liệu, low nếu dữ liệu ít.
`;

  return { system, user };
}