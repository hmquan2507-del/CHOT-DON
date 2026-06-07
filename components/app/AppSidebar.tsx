import {
  BarChart3,
  CalendarDays,
  FileText,
  Home,
  Layers3,
  Lightbulb,
  LogOut,
  Settings,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";

const mainMenu = [
  { name: "Dashboard", href: "/app", icon: Home, active: true },
  { name: "Hồ sơ kênh", href: "/app/channel", icon: Target },
  { name: "Sản phẩm", href: "/app/products", icon: Layers3 },
  { name: "Ý tưởng", href: "/app/ideas", icon: Lightbulb },
  { name: "Kịch bản", href: "/app/scripts", icon: FileText },
  { name: "Lịch nội dung", href: "/app/calendar", icon: CalendarDays },
  { name: "Phân tích", href: "/app/analytics", icon: BarChart3 },
];

const systemMenu = [
  { name: "Cài đặt", href: "/app/settings", icon: Settings },
  { name: "Đăng xuất", href: "/", icon: LogOut },
];

export default function AppSidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-[#F8FAF8] px-5 py-6 lg:flex lg:flex-col">
      <a href="/" className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Sparkles className="size-5" />
        </div>

        <div>
          <p className="text-lg font-bold leading-none tracking-tight text-slate-950">
            Content Chốt Đơn
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            AI Creator Workspace
          </p>
        </div>
      </a>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Wand2 className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Starter Plan</p>
            <p className="text-xs font-medium text-slate-500">
              76 AI credits còn lại
            </p>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <p className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Main menu
        </p>

        <nav className="mt-3 space-y-1.5">
          {mainMenu.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${
                  item.active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-950"
                }`}
              >
                <Icon
                  className={`size-4 ${
                    item.active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        <p className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          System
        </p>

        <nav className="mt-3 space-y-1.5">
          {systemMenu.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950"
              >
                <Icon className="size-4 text-slate-400 group-hover:text-slate-700" />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-[28px] bg-slate-950 p-4 text-white shadow-sm">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
          <Sparkles className="size-5 text-emerald-200" />
        </div>

        <p className="mt-4 text-sm font-semibold">AI Copilot</p>
        <p className="mt-2 text-xs leading-5 text-white/65">
          Tạo ngay kế hoạch nội dung 7 ngày đầu tiên cho người mới xây kênh bán
          hàng.
        </p>

        <a
          href="/app/ideas"
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
        >
          Tạo ý tưởng
        </a>
      </div>
    </aside>
  );
}
