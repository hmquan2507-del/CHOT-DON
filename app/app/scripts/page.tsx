import ComingSoonPage from "@/components/app/ComingSoonPage";
import { FileText } from "lucide-react";

export default function ScriptsPage() {
  return (
    <ComingSoonPage
      title="Kịch bản video"
      badge="Phase 6"
      subtitle="Chọn ý tưởng và để AI viết kịch bản video 15s, 30s hoặc 60s với hook, nội dung và CTA rõ ràng."
      checklist={[
        "Viết hook 3 giây đầu",
        "Tạo script 15s/30s/60s",
        "Viết caption, hashtag, CTA",
        "Lưu script để đưa vào lịch đăng",
      ]}
      primaryLabel="Sắp tạo script AI"
      secondaryLabel="Xem ý tưởng"
      secondaryHref="/app/ideas"
      icon={FileText}
    />
  );
}
