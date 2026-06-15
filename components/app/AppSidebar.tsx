"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BarChart3,
  Box,
  CalendarDays,
  ChevronDown,
  Crown,
  Edit3,
  FileText,
  Home,
  Lightbulb,
  LifeBuoy,
  Link2,
  LogOut,
  Settings,
  Sparkles,
  Target,
  UserCircle2,
} from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";

const navItems = [
  { label: "Tổng quan", icon: Home, href: "/app" },
  { label: "Hồ sơ kênh", icon: UserCircle2, href: "/app/channel" },
  { label: "Sản phẩm", icon: Box, href: "/app/products" },
  { label: "Ý tưởng", icon: Lightbulb, href: "/app/ideas" },
  { label: "Kịch bản", icon: FileText, href: "/app/scripts" },
  { label: "Lịch nội dung", icon: CalendarDays, href: "/app/calendar" },
  { label: "Phân tích", icon: BarChart3, href: "/app/metrics" },
  { label: "Cài đặt", icon: Settings, href: "/app/settings" },
];

const channelSubItems = [
  {
    label: "Tổng quan",
    href: "/app/channel?tab=overview",
    tab: "overview",
    icon: UserCircle2,
  },
  {
    label: "Định vị AI",
    href: "/app/channel?tab=positioning",
    tab: "positioning",
    icon: Target,
  },
  {
    label: "Chỉnh sửa hồ sơ",
    href: "/app/channel?tab=edit",
    tab: "edit",
    icon: Edit3,
  },
  {
    label: "Liên kết kênh",
    href: "/app/channel?tab=links",
    tab: "links",
    icon: Link2,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeChannelTab = searchParams.get("tab") || "overview";
  const isChannelActive = pathname === "/app/channel";

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] shrink-0 border-r border-[#DDEBE2] bg-white/90 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col px-6">
        <div className="flex h-[84px] items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#059669] text-white shadow-lg shadow-emerald-600/20">
            <Sparkles className="h-5 w-5" strokeWidth={2.4} />
          </div>

          <div className="min-w-0">
            <div className="text-[15px] font-black leading-tight tracking-[-0.02em] text-[#07111F]">
              Content <span className="text-[#059669]">Chốt Đơn</span>
            </div>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AI Creator Workspace
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-[24px] border border-emerald-100 bg-[#F3FBF5] p-4">
          <div className="flex items-center gap-2 text-[13px] font-bold text-[#047857]">
            <Crown className="h-4 w-4" />
            Gói Free
          </div>

          <p className="mt-2 text-[12px] leading-5 text-slate-500">
            Lên kế hoạch nội dung, quản lý ý tưởng và chuẩn bị kịch bản bán
            hàng.
          </p>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);

            if (item.href === "/app/channel") {
              return (
                <div key={item.label} className="space-y-1">
                  <Link
                    href="/app/channel?tab=overview"
                    className={[
                      "group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[14px] font-bold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                      isChannelActive
                        ? "bg-[#07111F] text-white shadow-lg shadow-slate-950/10"
                        : "text-slate-500 hover:bg-[#F3FBF5] hover:text-[#07111F]",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4.5 w-4.5 transition-all duration-200 ease-out",
                        isChannelActive
                          ? "text-emerald-300"
                          : "text-slate-400 group-hover:text-emerald-600",
                      ].join(" ")}
                    />
                    <span className="min-w-0 flex-1">{item.label}</span>
                    <ChevronDown
                      className={[
                        "h-4 w-4 transition-transform duration-200 ease-out",
                        isChannelActive ? "rotate-180 text-emerald-300" : "",
                      ].join(" ")}
                    />
                  </Link>

                  {isChannelActive ? (
                    <div className="ml-4 space-y-1 border-l border-emerald-100 pl-3">
                      {channelSubItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeChannelTab === subItem.tab;

                        return (
                          <Link
                            key={subItem.tab}
                            href={subItem.href}
                            className={[
                              "group flex h-9 cursor-pointer items-center gap-2 rounded-xl px-3 text-[13px] font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                              isSubActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700",
                            ].join(" ")}
                          >
                            <SubIcon
                              className={[
                                "h-3.5 w-3.5 transition-colors",
                                isSubActive
                                  ? "text-emerald-600"
                                  : "text-slate-400 group-hover:text-emerald-600",
                              ].join(" ")}
                            />
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[14px] font-bold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                  isActive
                    ? "bg-[#07111F] text-white shadow-lg shadow-slate-950/10"
                    : "text-slate-500 hover:bg-[#F3FBF5] hover:text-[#07111F]",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-4.5 w-4.5 transition-all duration-200 ease-out",
                    isActive
                      ? "text-emerald-300"
                      : "text-slate-400 group-hover:text-emerald-600",
                  ].join(" ")}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pb-6">
          <div className="mb-3 rounded-[24px] border border-[#E8F2EA] bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <LifeBuoy className="h-4.5 w-4.5" />
              </div>

              <div>
                <p className="text-[13px] font-black text-[#07111F]">
                  Cần hỗ trợ?
                </p>
                <p className="mt-1 text-[12px] leading-5 text-slate-500">
                  Tối ưu kế hoạch nội dung và kịch bản bán hàng nhanh hơn.
                </p>
              </div>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[14px] font-bold text-slate-500 transition-all duration-200 ease-out hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 active:scale-[0.98]"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Đăng xuất</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}