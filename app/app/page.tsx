import {
  BarChart3,
  Box,
  CalendarDays,
  MonitorPlay,
} from "lucide-react";
import DashboardPerformanceCard from "@/components/app/DashboardPerformanceCard";
import DashboardPlanCard from "@/components/app/DashboardPlanCard";
import DashboardStatCard from "@/components/app/DashboardStatCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AppDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: channel } = await supabase
    .from("channels")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

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
          title="Hồ sơ kênh"
          value={channel ? "1" : "0"}
          description={
            channel
              ? `${channel.name || "Chưa đặt tên kênh"} • ${channel.platform || "Chưa chọn nền tảng"} • ${channel.niche || "Chưa có ngách"} • ${channel.goal || "Chưa có mục tiêu"}`
              : "Chưa kết nối kênh"
          }
          cta={channel ? "Thêm sản phẩm affiliate" : "Tạo hồ sơ kênh"}
          href={channel ? undefined : "/app/channel"}
          icon={MonitorPlay}
          accent="emerald"
        />

        <DashboardStatCard
          title="Nội dung & Lịch đăng"
          value="0"
          description="Sẽ được cập nhật ở phase tiếp theo"
          cta="Chưa có dữ liệu"
          icon={CalendarDays}
          accent="blue"
        />

        <DashboardStatCard
          title="Sản phẩm affiliate"
          value="0"
          description="Sẽ được cập nhật ở phase tiếp theo"
          cta="Chưa có dữ liệu"
          icon={Box}
          accent="purple"
        />

        <DashboardStatCard
          title="Hiệu suất nội dung"
          value="0"
          description="Sẽ được cập nhật ở phase tiếp theo"
          cta="Chưa có dữ liệu"
          icon={BarChart3}
          accent="amber"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardPlanCard isEmpty={true} />
        <DashboardPerformanceCard isEmpty={true} />
      </section>
    </div>
  );
}
