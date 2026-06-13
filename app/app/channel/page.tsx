import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
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

type ChannelPageProps = {
  searchParams?: Promise<{
    ai_positioning?: string | string[];
  }>;
};

function getAIPositioningStatus(
  value: string | string[] | undefined,
): AIChannelPositioningStatus | null {
  const status = Array.isArray(value) ? value[0] : value;

  if (status === "succeeded" || status === "missing_key" || status === "failed") {
    return status;
  }

  return null;
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
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <span>Content Chốt Đơn</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Hồ sơ kênh</span>
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Hồ sơ kênh
            </h1>
            <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-slate-500">
              AI hiểu kênh của bạn để gợi ý ý tưởng và nội dung phù hợp nhất.
            </p>
          </div>
        </div>

        <Link
          href="#channel-edit-section"
          className="inline-flex h-11 w-fit items-center justify-center rounded-2xl border border-emerald-200 bg-white px-4 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          Chuyển đến chỉnh sửa
        </Link>
      </header>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.37fr)_minmax(0,0.63fr)]">
        <section className="min-w-0 space-y-6">
          <ChannelProfileCard channel={channel} />
          <ChannelAiReadinessCard
            channel={channel}
            result={positioningResult}
          />
        </section>

        <section className="min-w-0 space-y-6">
          <ChannelPositioningAiCard
            channelId={channel?.id}
            result={positioningResult}
            generatedAt={channel?.ai_positioning_generated_at}
            status={aiPositioningStatus}
            legacyAdvice={channel?.ai_positioning_advice}
          />

          <ChannelStarterIdeasCard result={positioningResult} />
        </section>
      </div>

      <ChannelStrategyCards result={positioningResult} />

      <section id="channel-edit-section" className="scroll-mt-28 space-y-4">
        <div className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">
            KHU VỰC CHỈNH SỬA (kéo xuống)
          </p>

          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
                Chỉnh sửa hồ sơ kênh
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500 sm:text-base">
                Cập nhật thông tin để AI hiểu kênh của bạn chính xác hơn.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-500 ring-1 ring-slate-200">
              Thay đổi sẽ lưu vào Supabase
            </span>
          </div>
        </div>

        <ChannelProfileForm channel={channel} />
      </section>
    </div>
  );
}