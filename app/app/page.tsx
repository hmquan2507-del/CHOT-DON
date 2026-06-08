import {
  BarChart3,
  Box,
  CalendarDays,
  ClipboardList,
} from "lucide-react";
import DashboardPerformanceCard from "@/components/app/DashboardPerformanceCard";
import DashboardPlanCard from "@/components/app/DashboardPlanCard";
import DashboardStatCard from "@/components/app/DashboardStatCard";

export default function AppDashboardPage() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[30px] font-black leading-tight tracking-[-0.05em] text-[#07111F] sm:text-[34px]">
            Chào buổi sáng, Creator 👋
          </h1>
          <p className="mt-2 text-[14px] font-medium text-slate-500">
            Hôm nay là ngày tuyệt vời để tạo nội dung chốt đơn.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Kế hoạch 30 ngày"
          value="18/30"
          description="Nội dung đã lên kế hoạch"
          cta="Xem chi tiết"
          icon={ClipboardList}
          accent="emerald"
          progress={60}
        />

        <DashboardStatCard
          title="Lịch đăng"
          value="12"
          description="Nội dung sắp đăng"
          cta="Xem lịch"
          icon={CalendarDays}
          accent="blue"
        />

        <DashboardStatCard
          title="Hiệu suất nội dung"
          value="342"
          description="Tổng lượt hoạt động"
          cta="Xem phân tích"
          icon={BarChart3}
          accent="amber"
          chart={[34, 48, 62, 80, 68, 92, 74]}
        />

        <DashboardStatCard
          title="Sản phẩm affiliate"
          value="23"
          description="Sản phẩm đang hợp tác"
          cta="Quản lý sản phẩm"
          icon={Box}
          accent="purple"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardPlanCard />
        <DashboardPerformanceCard />
      </section>
    </div>
  );
}