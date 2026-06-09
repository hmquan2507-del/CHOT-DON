import ComingSoonPage from "@/components/app/ComingSoonPage";
import { CalendarDays } from "lucide-react";

export default function CalendarPage() {
  return (
    <ComingSoonPage
      title="Lịch nội dung"
      badge="Phase 7"
      subtitle="Quản lý lịch đăng video theo ngày, trạng thái sản xuất và nền tảng đăng nội dung."
      checklist={[
        "Lên lịch đăng TikTok, Reels, Shorts",
        "Trạng thái: Chưa làm, Đang làm, Đã quay, Đã edit, Đã đăng",
        "Gắn script vào lịch đăng",
        "Theo dõi nội dung cần tối ưu",
      ]}
      primaryLabel="Sắp lên lịch nội dung"
      secondaryLabel="Xem script"
      secondaryHref="/app/scripts"
      icon={CalendarDays}
    />
  );
}
