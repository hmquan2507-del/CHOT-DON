"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
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
  Link2,
  LogOut,
  PlusCircle,
  Settings,
  Sparkles,
  Target,
  UploadCloud,
  UserCircle2,
} from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";

type SidebarChildItem = {
  label: string;
  href: string;
  tab: string;
  icon: LucideIcon;
};

type SidebarModuleItem = {
  type: "module";
  key: string;
  label: string;
  icon: LucideIcon;
  basePath: string;
  defaultTab: string;
  children: SidebarChildItem[];
};

type SidebarLinkItem = {
  type: "link";
  label: string;
  icon: LucideIcon;
  href: string;
};

type SidebarItem = SidebarModuleItem | SidebarLinkItem;

const sidebarItems: SidebarItem[] = [
  {
    type: "link",
    label: "Tổng quan",
    icon: Home,
    href: "/app",
  },
  {
    type: "module",
    key: "channel",
    label: "Hồ sơ kênh",
    icon: UserCircle2,
    basePath: "/app/channel",
    defaultTab: "overview",
    children: [
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
    ],
  },
  {
    type: "module",
    key: "products",
    label: "Sản phẩm",
    icon: Box,
    basePath: "/app/products",
    defaultTab: "all",
    children: [
      {
        label: "Tất cả sản phẩm",
        href: "/app/products?tab=all",
        tab: "all",
        icon: Box,
      },
      {
        label: "Thêm sản phẩm",
        href: "/app/products?tab=create",
        tab: "create",
        icon: PlusCircle,
      },
      {
        label: "Nhập bằng link",
        href: "/app/products?tab=import",
        tab: "import",
        icon: UploadCloud,
      },
      {
        label: "AI phân tích",
        href: "/app/products?tab=ai",
        tab: "ai",
        icon: Sparkles,
      },
    ],
  },
  {
    type: "module",
    key: "ideas",
    label: "Ý tưởng",
    icon: Lightbulb,
    basePath: "/app/ideas",
    defaultTab: "all",
    children: [
      {
        label: "Tất cả ý tưởng",
        href: "/app/ideas?tab=all",
        tab: "all",
        icon: Lightbulb,
      },
      {
        label: "Tạo bằng AI",
        href: "/app/ideas?tab=generate",
        tab: "generate",
        icon: Sparkles,
      },
      {
        label: "Sẵn sàng viết kịch bản",
        href: "/app/ideas?tab=ready",
        tab: "ready",
        icon: FileText,
      },
    ],
  },
  {
    type: "module",
    key: "scripts",
    label: "Kịch bản",
    icon: FileText,
    basePath: "/app/scripts",
    defaultTab: "all",
    children: [
      {
        label: "Tất cả kịch bản",
        href: "/app/scripts?tab=all",
        tab: "all",
        icon: FileText,
      },
      {
        label: "Tạo kịch bản",
        href: "/app/scripts?tab=create",
        tab: "create",
        icon: PlusCircle,
      },
    ],
  },
  {
    type: "module",
    key: "calendar",
    label: "Lịch nội dung",
    icon: CalendarDays,
    basePath: "/app/calendar",
    defaultTab: "month",
    children: [
      {
        label: "Lịch tháng",
        href: "/app/calendar?tab=month",
        tab: "month",
        icon: CalendarDays,
      },
      {
        label: "Việc cần làm",
        href: "/app/calendar?tab=tasks",
        tab: "tasks",
        icon: CalendarDays,
      },
    ],
  },
  {
    type: "module",
    key: "metrics",
    label: "Phân tích",
    icon: BarChart3,
    basePath: "/app/metrics",
    defaultTab: "overview",
    children: [
      {
        label: "Tổng quan",
        href: "/app/metrics?tab=overview",
        tab: "overview",
        icon: BarChart3,
      },
      {
        label: "Theo video",
        href: "/app/metrics?tab=videos",
        tab: "videos",
        icon: FileText,
      },
      {
        label: "AI gợi ý",
        href: "/app/metrics?tab=ai",
        tab: "ai",
        icon: Sparkles,
      },
    ],
  },
  {
    type: "link",
    label: "Cài đặt",
    icon: Settings,
    href: "/app/settings",
  },
];

function getCurrentModuleKey(pathname: string) {
  const activeModule = sidebarItems.find((item) => {
    return item.type === "module" && pathname.startsWith(item.basePath);
  });

  return activeModule?.type === "module" ? activeModule.key : null;
}

function getModuleActiveTab(
  item: SidebarModuleItem,
  pathname: string,
  tab: string | null,
) {
  if (!pathname.startsWith(item.basePath)) {
    return item.defaultTab;
  }

  return tab || item.defaultTab;
}

export default function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const currentModuleKey = useMemo(
    () => getCurrentModuleKey(pathname),
    [pathname],
  );

  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() =>
    currentModuleKey ? { [currentModuleKey]: true } : {},
  );

  useEffect(() => {
    if (!currentModuleKey) {
      return;
    }

    setOpenModules((current) => ({
      ...current,
      [currentModuleKey]: true,
    }));
  }, [currentModuleKey]);

  function toggleModule(moduleKey: string) {
    setOpenModules((current) => ({
      ...current,
      [moduleKey]: !current[moduleKey],
    }));
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] shrink-0 border-r border-[#DDEBE2] bg-white/95 backdrop-blur-xl lg:block">
      <div className="flex h-full min-h-0 flex-col px-4">
        <div className="flex h-[80px] shrink-0 items-center gap-3 px-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Sparkles className="h-5 w-5" strokeWidth={2.4} />
          </div>

          <div className="min-w-0">
            <div className="text-[15px] font-black leading-tight tracking-[-0.02em] text-slate-950">
              Content <span className="text-emerald-600">Chốt Đơn</span>
            </div>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AI Creator Workspace
            </div>
          </div>
        </div>

        <div className="mb-4 shrink-0 rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-4">
          <div className="flex items-center gap-2 text-[13px] font-black text-emerald-700">
            <Crown className="h-4 w-4" />
            Gói Free
          </div>

          <p className="mt-2 text-[12px] font-medium leading-5 text-slate-500">
            Lên kế hoạch nội dung, quản lý ý tưởng và chuẩn bị kịch bản bán
            hàng.
          </p>
        </div>

        <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
          {sidebarItems.map((item) => {
            if (item.type === "link") {
              return (
                <SidebarLink
                  key={item.href}
                  item={item}
                  isActive={
                    item.href === "/app"
                      ? pathname === "/app"
                      : pathname.startsWith(item.href)
                  }
                />
              );
            }

            const isModuleActive = pathname.startsWith(item.basePath);
            const isOpen = Boolean(openModules[item.key]);
            const activeTab = getModuleActiveTab(item, pathname, tab);

            return (
              <SidebarModule
                key={item.key}
                item={item}
                isOpen={isOpen}
                isActive={isModuleActive}
                activeTab={activeTab}
                onToggle={() => toggleModule(item.key)}
              />
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-slate-100 py-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[14px] font-bold text-slate-500 transition-all duration-200 ease-out hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 active:scale-[0.98]"
            >
              <LogOut className="h-[18px] w-[18px]" />
              <span>Đăng xuất</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  item,
  isActive,
}: {
  item: SidebarLinkItem;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={[
        "group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[14px] font-bold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
        isActive
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
          : "text-slate-500 hover:bg-emerald-50/80 hover:text-emerald-700",
      ].join(" ")}
    >
      <Icon
        className={[
          "h-[18px] w-[18px] transition-all duration-200 ease-out",
          isActive
            ? "text-emerald-600"
            : "text-slate-400 group-hover:text-emerald-600",
        ].join(" ")}
      />
      <span>{item.label}</span>
    </Link>
  );
}

function SidebarModule({
  item,
  isOpen,
  isActive,
  activeTab,
  onToggle,
}: {
  item: SidebarModuleItem;
  isOpen: boolean;
  isActive: boolean;
  activeTab: string;
  onToggle: () => void;
}) {
  const Icon = item.icon;

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          "group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[14px] font-bold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
          isActive
            ? "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
            : "text-slate-500 hover:bg-emerald-50/80 hover:text-emerald-700",
        ].join(" ")}
      >
        <Icon
          className={[
            "h-[18px] w-[18px] transition-all duration-200 ease-out",
            isActive
              ? "text-emerald-600"
              : "text-slate-400 group-hover:text-emerald-600",
          ].join(" ")}
        />

        <span className="min-w-0 flex-1">{item.label}</span>

        <ChevronDown
          className={[
            "h-4 w-4 transition-transform duration-200 ease-out",
            isOpen ? "rotate-180" : "rotate-0",
            isActive
              ? "text-emerald-600"
              : "text-slate-400 group-hover:text-emerald-600",
          ].join(" ")}
        />
      </button>

      <div
        className={[
          "grid transition-all duration-200 ease-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="ml-4 space-y-1 border-l border-emerald-100 pl-3 pt-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = isActive && activeTab === child.tab;

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={[
                    "group flex h-9 cursor-pointer items-center gap-2 rounded-xl px-3 text-[13px] font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                    isChildActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700",
                  ].join(" ")}
                >
                  <ChildIcon
                    className={[
                      "h-3.5 w-3.5 transition-colors duration-200 ease-out",
                      isChildActive
                        ? "text-emerald-600"
                        : "text-slate-400 group-hover:text-emerald-600",
                    ].join(" ")}
                  />
                  <span className="truncate">{child.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}