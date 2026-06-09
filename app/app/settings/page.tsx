import ComingSoonPage from "@/components/app/ComingSoonPage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <ComingSoonPage
      title="Cài đặt workspace"
      badge="Phase 9"
      subtitle="Quản lý thông tin tài khoản, gói sử dụng và thiết lập workspace Content Chốt Đơn."
      checklist={[
        "Xem thông tin tài khoản",
        "Quản lý plan Free/Pro/Admin",
        "Cài đặt workspace",
        "Chuẩn bị phân quyền thủ công",
      ]}
      primaryLabel="Sắp cấu hình workspace"
      secondaryLabel="Về dashboard"
      secondaryHref="/app"
      icon={Settings}
    />
  );
}
