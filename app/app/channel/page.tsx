import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ChevronRight,
  Edit3,
  Link2,
  Target,
  UserCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ChannelAiReadinessCard from "@/components/app/channel/ChannelAiReadinessCard";
import {
  ChannelPositioningAiCard,
  ChannelStarterIdeasCard,
  ChannelStrategyCards,
} from "@/components/app/channel/ChannelPositioningAiCard";
import ChannelProfileCard from "@/components/app/channel/ChannelProfileCard";
import ChannelProfileForm from "@/components/app/channel/ChannelProfileForm";
import type {
  AIChannelPositioningResult,
  AIChannelPositioningStatus,
} from "@/types/ai-channel-positioning";

export type ChannelProfile = {
  id: string;
  user_id: string;
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
  experience_level: string | null;
  avatar_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  facebook_url: string | null;
  channel_status: string | null;
  current_situation: string | null;
  desired_positioning: string | null;
  ai_positioning_advice?: string | null;
  ai_positioning_result?: AIChannelPositioningResult | null;
  ai_positioning_generated_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type ChannelTabKey = "overview" | "positioning" | "edit" | "links";

type ChannelPageProps = {
  searchParams?: Promise<{
    ai_positioning?: string | string[];
    tab?: string | string[];
  }>;
};

const tabItems: Array<{
  key: ChannelTabKey;
  label: string;
  href: string;
  icon: typeof UserCircle2;
}> = [
  {
    key: "overview",
    label: "Tổng quan",
    href: "/app/channel?tab=overview",
    icon: UserCircle2,
  },
  {
    key: "positioning",
    label: "Định vị AI",
    href: "/app/channel?tab=positioning",
    icon: Target,
  },
  {
    key: "edit",
    label: "Chỉnh sửa hồ sơ",
    href: "/app/channel?tab=edit",
    icon: Edit3,
  },
  {
    key: "links",
    label: "Liên kết kênh",
    href: "/app/channel?tab=links",
    icon: Link2,
  },
];

function getAIPositioningStatus(
  value: string | string[] | undefined,
): AIChannelPositioningStatus | null {
  const status = Array.isArray(value) ? value[0] : value;

  if (status === "succeeded" || status === "missing_key" || status === "failed") {
    return status;
  }

  return null;
}

function getChannelTab(value: string | string[] | undefined): ChannelTabKey {
  const tab = Array.isArray(value) ? value[0] : value;

  if (tab === "positioning" || tab === "edit" || tab === "links") {
    return tab;
  }

  return "overview";
}

function safeValue(value?: string | null, fallback = "Chưa cập nhật") {
  return value?.trim() || fallback;
}

export default async function ChannelPage({ searchParams }: ChannelPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const aiPositioningStatus = getAIPositioningStatus(
    resolvedSearchParams?.ai_positioning,
  );
  const activeTab = getChannelTab(resolvedSearchParams?.tab);

  const { data: channelData } = await supabase
    .from("channels")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const channel = channelData as ChannelProfile | null;
  const positioningResult = channel?.ai_positioning_result ?? null;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-7 pb-12">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <span>Content Chốt Đơn</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-900">Hồ sơ kênh</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Hồ sơ kênh
            </h1>
            <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-slate-500">
              Quản lý hồ sơ, định vị AI và liên kết kênh trong từng khu vực nhỏ
              như một module SaaS chuyên nghiệp.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
            Module Hồ sơ kênh
          </div>
        </div>
      </header>

<div className="overflow-x-auto rounded-[24px] border border-slate-200/80 bg-white p-2 shadow-[0_14px_36px_rgba(15,23,42,0.045)] lg:hidden">        
        <div className="flex min-w-max gap-2">
          {tabItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={[
                  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                  isActive
                    ? "bg-emerald-600 text-white shadow-[0_12px_30px_rgba(16,185,129,0.24)]"
                    : "border border-transparent bg-transparent text-slate-500 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" ? (
        <OverviewTab channel={channel} positioningResult={positioningResult} />
      ) : null}

      {activeTab === "positioning" ? (
        <PositioningTab
          channel={channel}
          positioningResult={positioningResult}
          aiPositioningStatus={aiPositioningStatus}
        />
      ) : null}

      {activeTab === "edit" ? (
        <FormTab
          title="Chỉnh sửa hồ sơ"
          subtitle="Cập nhật thông tin cốt lõi để AI hiểu đúng kênh, khách hàng và phong cách nội dung."
        >
          <ChannelProfileForm channel={channel} variant="core" />
        </FormTab>
      ) : null}

      {activeTab === "links" ? (
        <FormTab
          title="Liên kết kênh"
          subtitle="Quản lý ảnh đại diện, trạng thái kênh và các liên kết TikTok, YouTube, Facebook/Reels."
        >
          <ChannelProfileForm channel={channel} variant="links" />
        </FormTab>
      ) : null}
    </div>
  );
}

function OverviewTab({
  channel,
  positioningResult,
}: {
  channel: ChannelProfile | null;
  positioningResult: AIChannelPositioningResult | null;
}) {
  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
      <section className="min-w-0">
        <ChannelProfileCard channel={channel} />
      </section>

      <section className="min-w-0 space-y-5">
        <ChannelAiReadinessCard channel={channel} result={positioningResult} />

        <CompactOverviewCard channel={channel} />

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/app/channel?tab=edit"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <Edit3 className="h-4 w-4" />
            Chỉnh sửa hồ sơ
          </Link>

          <Link
            href="/app/channel?tab=positioning"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 text-sm font-extrabold text-emerald-700 transition-all duration-200 ease-out hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <Target className="h-4 w-4" />
            Xem định vị AI
          </Link>
        </div>
      </section>
    </div>
  );
}

function PositioningTab({
  channel,
  positioningResult,
  aiPositioningStatus,
}: {
  channel: ChannelProfile | null;
  positioningResult: AIChannelPositioningResult | null;
  aiPositioningStatus: AIChannelPositioningStatus | null;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)] sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">
          AI strategy report
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
          Báo cáo định vị kênh
        </h2>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500 sm:text-base">
          Khu vực này gom các kết quả AI quan trọng: định vị, trụ cột nội dung,
          ý tưởng khởi đầu, CTA, lỗi nên tránh và bước tiếp theo.
        </p>
      </section>

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
  );
}

function CompactOverviewCard({ channel }: { channel: ChannelProfile | null }) {
  const items = [
    { label: "Ngách", value: safeValue(channel?.niche), icon: Target },
    { label: "Mục tiêu", value: safeValue(channel?.goal), icon: Target },
    {
      label: "Tệp khách hàng",
      value: safeValue(channel?.target_audience),
      icon: UserCircle2,
    },
    {
      label: "Phong cách",
      value: safeValue(channel?.content_style),
      icon: Edit3,
    },
  ];

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)] sm:p-6">
      <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
        Tóm tắt nhanh
      </h2>
      <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
        Các tín hiệu chính AI đang dùng để hiểu kênh. Thông tin chi tiết đã nằm
        trong card hồ sơ bên trái.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
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

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <p className="text-xs font-extrabold text-slate-400">
          Kinh nghiệm hiện tại
        </p>
        <p className="mt-1 text-sm font-black leading-snug text-slate-950">
          {safeValue(channel?.experience_level)}
        </p>
      </div>
    </section>
  );
}

function FormTab({
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