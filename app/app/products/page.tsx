import ComingSoonPage from "@/components/app/ComingSoonPage";
import { Box } from "lucide-react";

export default function ProductsPage() {
  return (
    <ComingSoonPage
      title="Thư viện sản phẩm"
      badge="Phase 4"
      subtitle="Lưu sản phẩm affiliate hoặc sản phẩm bán hàng để AI tạo ý tưởng, script và lịch nội dung chính xác hơn."
      checklist={[
        "Thêm sản phẩm affiliate",
        "Lưu giá, hoa hồng, link affiliate",
        "Gắn sản phẩm với hồ sơ kênh",
        "Dùng sản phẩm để tạo ý tưởng video",
      ]}
      primaryLabel="Chuẩn bị thêm sản phẩm"
      secondaryLabel="Xem hồ sơ kênh"
      secondaryHref="/app/channel"
      icon={Box}
    />
  );
}
