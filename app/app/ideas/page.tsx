import ComingSoonPage from "@/components/app/ComingSoonPage";
import { Lightbulb } from "lucide-react";

export default function IdeasPage() {
  return (
    <ComingSoonPage
      title="Ý tưởng nội dung"
      badge="Phase 5"
      subtitle="AI sẽ tạo ý tưởng video ngắn dựa trên hồ sơ kênh và sản phẩm bạn đang muốn đẩy bán."
      checklist={[
        "Tạo ý tưởng theo ngách",
        "Gắn ý tưởng với sản phẩm",
        "Phân loại hook, review, so sánh, story",
        "Lưu ý tưởng để viết script",
      ]}
      primaryLabel="Sắp tạo ý tưởng AI"
      secondaryLabel="Thêm sản phẩm trước"
      secondaryHref="/app/products"
      icon={Lightbulb}
    />
  );
}
