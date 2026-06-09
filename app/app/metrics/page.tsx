import ComingSoonPage from "@/components/app/ComingSoonPage";
import { BarChart3 } from "lucide-react";

export default function MetricsPage() {
  return (
    <ComingSoonPage
      title="Phân tích hiệu suất"
      badge="Phase 8"
      subtitle="Nhập số liệu video thủ công để AI hiểu nội dung nào đang hiệu quả và gợi ý nên làm tiếp gì."
      checklist={[
        "Nhập view, like, comment, share",
        "Nhập click, order, revenue",
        "So sánh hiệu suất nội dung",
        "Gợi ý nội dung nên làm tiếp",
      ]}
      primaryLabel="Sắp theo dõi hiệu suất"
      secondaryLabel="Xem lịch nội dung"
      secondaryHref="/app/calendar"
      icon={BarChart3}
    />
  );
}
