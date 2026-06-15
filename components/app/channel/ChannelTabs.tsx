"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Edit3,
  Link2,
  Sparkles,
  Target,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import ChannelAiReadinessCard from "@/components/app/channel/ChannelAiReadinessCard";
import {
  ChannelPositioningAiCard,
  ChannelStarterIdeasCard,
  ChannelStrategyCards,
} from "@/components/app/channel/ChannelPositioningAiCard";
import ChannelProfileCard from "@/components/app/channel/ChannelProfileCard";
import ChannelProfileForm from "@/components/app/channel/ChannelProfileForm";
import type { ChannelProfile } from "@/app/app/channel/page";
import type {
  AIChannelPositioningResult,
  AIChannelPositioningStatus,
} from "@/types/ai-channel-positioning";

type ChannelTabsProps = {
  channel: ChannelProfile | null;
  positioningResult: AIChannelPositioningResult | null;
  aiPositioningStatus: AIChannelPositioningStatus | null;
};

type TabKey = "overview" | "positioning" | "edit" | "links";

const tabs: Array<{
  key: TabKey;
  label: string;
  icon: typeof UserRound;
}> = [
  { key: "overview", label: "Tổng quan", icon: UserRound },
  { key: "positioning", label: "Định vị AI", icon: Bot },
  { key: "edit", label: "Chỉnh sửa hồ sơ", icon: Edit3 },
  { key: "links", label: "Liên kết kênh", icon: Link2 },
];

function safeValue(value?: string | null, fallback = "Chưa cập nhật") {
  return value?.trim() || fallback;
}

export default function ChannelTabs({
  channel,
  positioningResult,
  aiPositioningStatus,
}: ChannelTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const summaryItems = useMemo(
    () => [
      {
        label: "Ngách",
        value: safeValue(channel?.niche),
        icon: Target,
      },
      {
        label: "Mục tiêu kênh",
        value: safeValue(channel?.goal),
        icon: CheckCircle2,
      },
      {
        label: "Tệp khách hàng",
        value: safeValue(channel?.target_audience),
        icon: Users,
      },
      {
        label: "Phong cách nội dung",
        value: safeValue(channel?.content_style),
        icon: Video,
      },
      {
        label: "Kinh nghiệm hiện tại",
        value: safeValue(channel?.experience_level),
        icon: Sparkles,
      },
    ],
    [channel],
  );

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-[24px] border border-slate-200/80 bg-white p-2 shadow-[0_14px_36px_rgba(15,23,42,0.045)]">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-[0_12px_30px_rgba(16,185,129,0.24)]"
                    : "border border-transparent bg-transparent text-slate-500 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" ? (
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
          <section className="min-w-0 space-y-6">
            <ChannelProfileCard
              channel={channel}
              onEditProfile={() => setActiveTab("edit")}
            />

            <ChannelAiReadinessCard
              channel={channel}
              result={positioningResult}
            />
          </section>

          <section className="min-w-0 space-y-6">
            <OverviewSummaryCard
              summaryItems={summaryItems}
              onEdit={() => setActiveTab("edit")}
            />
          </section>
        </div>
      ) : null}

      {activeTab === "positioning" ? (
        <div className="space-y-6">
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <ChannelPositioningAiCard
              channelId={channel?.id}
              result={positioningResult}
              generatedAt={channel?.ai_positioning_generated_at}
              status={aiPositioningStatus}
              legacyAdvice={channel?.ai_positioning_advice}
            />

            <ChannelStarterIdeasCard result={positioningResult} />
          </div>

          <ChannelStrategyCards result={positioningResult} />
        </div>
      ) : null}

      {activeTab === "edit" ? (
        <TabPanelHeader
          title="Chỉnh sửa hồ sơ"
          subtitle="Cập nhật thông tin cốt lõi để AI hiểu kênh của bạn chính xác hơn."
        >
          <ChannelProfileForm channel={channel} variant="core" />
        </TabPanelHeader>
      ) : null}

      {activeTab === "links" ? (
        <TabPanelHeader
          title="Liên kết kênh"
          subtitle="Cập nhật ảnh đại diện, trạng thái kênh và các liên kết TikTok, YouTube, Facebook/Reels."
        >
          <ChannelProfileForm channel={channel} variant="links" />
        </TabPanelHeader>
      ) : null}
    </div>
  );
}

function OverviewSummaryCard({
  summaryItems,
  onEdit,
}: {
  summaryItems: Array<{
    label: string;
    value: string;
    icon: typeof Target;
  }>;
  onEdit: () => void;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
            Tóm tắt hồ sơ kênh
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            Các thông tin quan trọng AI đang dùng để hiểu kênh của bạn.
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 text-sm font-extrabold text-emerald-700 transition-all duration-200 ease-out hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
        >
          <Edit3 className="h-4 w-4" />
          Chỉnh sửa hồ sơ
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-black leading-snug text-slate-950">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TabPanelHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)] sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">
          Khu vực quản lý hồ sơ
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500 sm:text-base">
          {subtitle}
        </p>
      </div>

      {children}
    </section>
  );
}