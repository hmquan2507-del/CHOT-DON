import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ContentIdeaGenerator from "@/components/app/ideas/ContentIdeaGenerator";
import ContentIdeasList from "@/components/app/ideas/ContentIdeasList";
import type {
  ContentIdea,
  ContentIdeaChannelOption,
  ContentIdeaProductOption,
} from "@/types/content-idea";

type IdeaStats = {
  totalIdeas: number;
  aiIdeas: number;
  readyForScript: number;
  scheduledIdeas: number;
};

function calculateStats(ideas: ContentIdea[]): IdeaStats {
  return {
    totalIdeas: ideas.length,
    aiIdeas: ideas.filter((idea) => idea.source_type === "ai").length,
    readyForScript: ideas.filter((idea) => idea.status === "ready_for_script")
      .length,
    scheduledIdeas: ideas.filter((idea) => idea.status === "scheduled").length,
  };
}

export default async function IdeasPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: channelsData } = await supabase
    .from("channels")
    .select("id, name, platform, niche")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const { data: productsData } = await supabase
    .from("products")
    .select("id, channel_id, name, category, priority")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const { data: ideasData, error: ideasError } = await supabase
    .from("content_ideas")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (ideasError) {
    throw new Error(ideasError.message);
  }

  const channels = (channelsData ?? []) as ContentIdeaChannelOption[];
  const products = (productsData ?? []) as ContentIdeaProductOption[];
  const ideas = (ideasData ?? []) as ContentIdea[];
  const stats = calculateStats(ideas);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          <span>Content Chốt Đơn</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-800">Ý tưởng nội dung</span>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Ý tưởng nội dung
            </h1>
            <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-slate-500">
              Tạo và quản lý ý tưởng video ngắn dựa trên kênh, sản phẩm và định
              vị AI.
            </p>
          </div>

          <Link
            href="/app/products"
            className="inline-flex h-11 w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Quản lý sản phẩm
          </Link>
        </div>
      </header>

      {channels.length === 0 ? (
        <section className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-extrabold text-amber-900">
                Bạn nên tạo hồ sơ kênh trước khi tạo ý tưởng.
              </p>
              <p className="mt-1 text-sm font-medium text-amber-700">
                Hồ sơ kênh giúp AI hiểu đúng nền tảng, ngách, khách hàng và định
                vị nội dung.
              </p>
            </div>

            <Link
              href="/app/channel"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-600 px-4 text-sm font-extrabold text-white transition hover:bg-amber-700"
            >
              Tạo hồ sơ kênh
            </Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tổng ý tưởng"
          value={stats.totalIdeas}
          icon={Lightbulb}
          tone="emerald"
        />
        <StatCard
          title="Ý tưởng từ AI"
          value={stats.aiIdeas}
          icon={Sparkles}
          tone="violet"
        />
        <StatCard
          title="Sẵn sàng làm kịch bản"
          value={stats.readyForScript}
          icon={CheckCircle2}
          tone="blue"
        />
        <StatCard
          title="Đã lên lịch"
          value={stats.scheduledIdeas}
          icon={Calendar}
          tone="amber"
        />
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="min-w-0 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                Thư viện ý tưởng
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Các ý tưởng đã lưu, sẵn sàng để phát triển thành script ở phase
                sau.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">
              {ideas.length} mục
            </span>
          </div>

          <ContentIdeasList
            ideas={ideas}
            channels={channels}
            products={products}
          />
        </section>

        <ContentIdeaGenerator channels={channels} products={products} />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  tone,
}: {
  title: string;
  value: number;
  icon: typeof Video;
  tone: "emerald" | "violet" | "blue" | "amber";
}) {
  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    blue: "bg-sky-50 text-sky-600 border-sky-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  }[tone];

  return (
    <article className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${toneClass}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}