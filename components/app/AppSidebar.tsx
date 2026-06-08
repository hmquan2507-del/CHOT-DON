import {
  BarChart3,
  Box,
  CalendarDays,
  Crown,
  FileText,
  Home,
  Lightbulb,
  LifeBuoy,
  Settings,
  Sparkles,
  UserCircle2,
} from "lucide-react";

const navItems = [
  { label: "Tổng quan", icon: Home, active: true },
  { label: "Hồ sơ kênh", icon: UserCircle2, active: false },
  { label: "Sản phẩm", icon: Box, active: false },
  { label: "Ý tưởng", icon: Lightbulb, active: false },
  { label: "Kịch bản", icon: FileText, active: false },
  { label: "Lịch nội dung", icon: CalendarDays, active: false },
  { label: "Phân tích", icon: BarChart3, active: false },
  { label: "Cài đặt", icon: Settings, active: false },
];

export default function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 border-r border-[#DDEBE4] bg-white/82 backdrop-blur-2xl lg:flex lg:flex-col">
      <div className="flex h-[84px] items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#059669] text-white shadow-[0_18px_35px_rgba(5,150,105,0.22)]">
            <Sparkles className="h-5 w-5" strokeWidth={2.4} />
          </div>

          <div className="text-[17px] font-black tracking-[-0.04em] text-[#07111F]">
            Content Chốt Đơn
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-5 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href="#"
              className={`group flex h-12 items-center gap-3 rounded-2xl px-4 text-[14px] font-bold transition ${
                item.active
                  ? "bg-[#ECFDF5] text-[#047857] shadow-[inset_0_0_0_1px_rgba(5,150,105,0.08)]"
                  : "text-slate-600 hover:bg-[#F7FAF4] hover:text-[#047857]"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  item.active
                    ? "text-[#059669]"
                    : "text-slate-500 group-hover:text-[#059669]"
                }`}
                strokeWidth={2.2}
              />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="space-y-4 px-5 pb-5">
        <div className="rounded-[22px] border border-[#DDEBE4] bg-[#ECFDF5] p-4 shadow-[0_14px_34px_rgba(5,150,105,0.06)]">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#059669] shadow-sm">
              <Crown className="h-5 w-5" strokeWidth={2.3} />
            </div>

            <div className="min-w-0">
              <div className="text-[14px] font-black text-[#07111F]">
                Nâng cấp Pro
              </div>
              <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500">
                Mở khóa tính năng nâng cao và AI không giới hạn
              </p>
            </div>
          </div>

          <button className="mt-4 h-11 w-full rounded-2xl bg-[#059669] text-[13px] font-black text-white shadow-[0_14px_28px_rgba(5,150,105,0.22)] transition hover:bg-[#047857]">
            Nâng cấp ngay
          </button>
        </div>

        <div className="rounded-[20px] border border-[#DDEBE4] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F7FAF4] text-slate-500">
              <LifeBuoy className="h-5 w-5" strokeWidth={2.2} />
            </div>

            <div>
              <div className="text-[13px] font-black text-[#07111F]">
                Trung tâm hỗ trợ
              </div>
              <div className="mt-1 text-[12px] font-medium text-slate-500">
                Góp ý & hỗ trợ 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}