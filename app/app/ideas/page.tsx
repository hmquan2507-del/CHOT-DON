import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Archive,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Package,
  Search,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ContentIdeaGenerator from "@/components/app/ideas/ContentIdeaGenerator";
import ContentIdeasEmptyState from "@/components/app/ideas/ContentIdeasEmptyState";
import ContentIdeasList from "@/components/app/ideas/ContentIdeasList";
import type {
  ContentIdea,
  ContentIdeaChannelOption,
  ContentIdeaProductOption,
} from "@/types/content-idea";

type IdeaTabKey = "all" | "generate" | "ready" | "archived";

type IdeaStats = {
  totalIdeas: number;
  aiIdeas: number;
  readyForScript: number;
  scheduledIdeas: number;
};

type IdeasPageProps = {
  searchParams?: Promise<{
    tab?: string | string[];
  }>;
};

const tabs: Array<{
  key: IdeaTabKey;
  label: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    key: "all",
    label: "Tất cả",
    href: "/app/ideas?tab=all",
    icon: Lightbulb,
  },
  {
    key: "generate",
    label: "Tạo bằng AI",
    href: "/app/ideas?tab=generate",
    icon: Sparkles,
  },
  {
    key: "ready",
    label: "Sẵn sàng viết kịch bản",
    href: "/app/ideas?tab=ready",
    icon: CheckCircle2,
  },
  {
    key: "archived",
    label: "Đã lưu trữ",
    href: "/app/ideas?tab=archived",
    icon: Archive,
  },
];

function getActiveTab(value: string | string[] | undefined): IdeaTabKey {
  const tab = Array.isArray(value) ? value[0] : value;

  if (tab === "generate" || tab === "ready" || tab === "archived") {
    return tab;
  }

  return "all";
}

function isReadyIdea(idea: ContentIdea) {
  return idea.status === "ready_for_script" || idea.status === "ready";
}

function calculateStats(ideas: ContentIdea[]): IdeaStats {
  return {
    totalIdeas: ideas.length,
    aiIdeas: ideas.filter((idea) => idea.source_type === "ai").length,
    readyForScript: ideas.filter(isReadyIdea).length,
    scheduledIdeas: ideas.filter((idea) => idea.status === "scheduled").length,
  };
}

function filterIdeasByTab(ideas: ContentIdea[], activeTab: IdeaTabKey) {
  if (activeTab === "ready") {
    return ideas.filter(isReadyIdea);
  }

  if (activeTab === "archived") {
    return ideas.filter((idea) => idea.status === "archived");
  }

  return ideas.filter((idea) => idea.status !== "archived");
}

export default async function IdeasPage({ searchParams }: IdeasPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeTab = getActiveTab(resolvedSearchParams?.tab);

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
  const visibleIdeas = filterIdeasByTab(ideas, activeTab);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-5 pb-10">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <span>Content Chốt Đơn</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900">Ý tưởng nội dung</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Ý tưởng nội dung
            </h1>
            <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-slate-500">
              Tạo, chọn lọc và quản lý ý tưởng video ngắn dựa trên kênh, sản
              phẩm và định vị AI.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {activeTab !== "generate" ? (
              <Link
                href="/app/ideas?tab=generate"
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                Tạo ý tưởng bằng AI
              </Link>
            ) : null}

            <Link
              href="/app/products?tab=all"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <Package className="h-4 w-4" />
              Quản lý sản phẩm
            </Link>
          </div>
        </div>
      </header>

      {channels.length === 0 ? (
        <section className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-extrabold text-amber-900">
                Bạn nên tạo hồ sơ kênh trước khi tạo ý tưởng.
              </p>
              <p className="mt-1 text-sm font-medium text-amber-700">
                Hồ sơ kênh giúp AI hiểu đúng nền tảng, ngách và khách hàng.
              </p>
            </div>

            <Link
              href="/app/channel?tab=overview"
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-2xl bg-amber-600 px-4 text-sm font-extrabold text-white transition-all duration-200 ease-out hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 active:scale-[0.98]"
            >
              Tạo hồ sơ kênh
            </Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
          title="Sẵn sàng viết kịch bản"
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

      <div className="overflow-x-auto rounded-[22px] border border-slate-200/80 bg-white p-2 shadow-[0_10px_28px_rgba(15,23,42,0.035)]">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <Link
                key={tab.key}
                href={tab.href}
                className={[
                  "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl px-3.5 text-sm font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                  isActive
                    ? "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(16,185,129,0.22)]"
                    : "border border-transparent bg-transparent text-slate-500 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {activeTab === "generate" ? (
        <GenerateTab channels={channels} products={products} />
      ) : activeTab === "ready" ? (
        <ReadyTab
          ideas={visibleIdeas}
          channels={channels}
          products={products}
        />
      ) : activeTab === "archived" ? (
        <ArchivedTab
          ideas={visibleIdeas}
          channels={channels}
          products={products}
        />
      ) : (
        <AllIdeasTab
          ideas={visibleIdeas}
          channels={channels}
          products={products}
        />
      )}
    </div>
  );
}

function AllIdeasTab({
  ideas,
  channels,
  products,
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
}) {
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,70%)_minmax(300px,30%)]">
      <section className="min-w-0 space-y-3">
        <SectionTitle
          title="Thư viện ý tưởng"
          description="Chọn nhanh ý tưởng tốt nhất để chuẩn bị viết kịch bản ở Phase 7."
          count={ideas.length}
        />

        <IdeaToolbar />

        <div className="rounded-[24px] border border-slate-200/80 bg-white p-3 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
          <div className="max-h-[640px] overflow-y-auto pr-2">
            <ContentIdeasList
              ideas={ideas}
              channels={channels}
              products={products}
            />
          </div>
        </div>
      </section>

      <IdeasActionSidebar />
    </div>
  );
}

function GenerateTab({
  channels,
  products,
}: {
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
}) {
  return (
    <section className="space-y-4">
      <SectionTitle
        title="Tạo ý tưởng bằng AI"
        description="Tập trung tạo ý tưởng mới, xem preview và chỉ lưu những ý tưởng phù hợp."
      />
      <ContentIdeaGenerator channels={channels} products={products} />
    </section>
  );
}

function ReadyTab({
  ideas,
  channels,
  products,
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
}) {
  if (ideas.length === 0) {
    return (
      <ContentIdeasEmptyState
        title="Chưa có ý tưởng sẵn sàng viết kịch bản"
        description="Hãy chọn một ý tưởng nháp và đánh dấu sẵn sàng, hoặc tạo ý tưởng mới bằng AI."
        ctaHref="/app/ideas?tab=generate"
        ctaLabel="Tạo ý tưởng bằng AI"
      />
    );
  }

  return (
    <section className="space-y-4">
      <SectionTitle
        title="Sẵn sàng viết kịch bản"
        description="Những ý tưởng đã được chọn lọc, chuẩn bị chuyển sang Script Generator ở Phase 7."
        count={ideas.length}
      />
      <ContentIdeasList ideas={ideas} channels={channels} products={products} />
    </section>
  );
}

function ArchivedTab({
  ideas,
  channels,
  products,
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
}) {
  if (ideas.length === 0) {
    return (
      <ContentIdeasEmptyState
        title="Chưa có ý tưởng lưu trữ"
        description="Các ý tưởng đã lưu trữ sẽ nằm ở đây để trang chính gọn hơn."
      />
    );
  }

  return (
    <section className="space-y-4">
      <SectionTitle
        title="Ý tưởng đã lưu trữ"
        description="Các ý tưởng chưa dùng tới hoặc muốn giữ lại để tham khảo sau."
        count={ideas.length}
      />
      <ContentIdeasList ideas={ideas} channels={channels} products={products} />
    </section>
  );
}

function IdeaToolbar() {
  const controlClassName =
    "h-10 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30";

  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-3 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
      <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_150px_150px_130px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Tìm ý tưởng..."
            className={`${controlClassName} w-full pl-10`}
          />
        </div>

        <select className={`${controlClassName} cursor-pointer`}>
          <option>Nền tảng</option>
          <option>TikTok</option>
          <option>YouTube Shorts</option>
          <option>Facebook Reels</option>
        </select>

        <select className={`${controlClassName} cursor-pointer`}>
          <option>Trạng thái</option>
          <option>Nháp</option>
          <option>Sẵn sàng</option>
          <option>Đã lưu trữ</option>
        </select>

        <select className={`${controlClassName} cursor-pointer`}>
          <option>Mới nhất</option>
          <option>Cũ nhất</option>
        </select>
      </div>
    </section>
  );
}

function IdeasActionSidebar() {
  return (
    <aside className="space-y-3 xl:sticky xl:top-6">
      <section className="rounded-[22px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.035)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-black tracking-[-0.02em] text-slate-950">
              AI Create panel
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
              Tạo nhanh ý tưởng mới dựa trên kênh, sản phẩm và định vị AI.
            </p>
          </div>
        </div>

        <Link
          href="/app/ideas?tab=generate"
          className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(16,185,129,0.2)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_14px_30px_rgba(16,185,129,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
        >
          Tạo bằng AI
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Workflow className="h-5 w-5" />
          </div>

          <h2 className="text-base font-black tracking-[-0.02em] text-slate-950">
            Workflow
          </h2>
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            "Tạo ý tưởng",
            "Chọn ý tưởng tốt",
            "Đánh dấu sẵn sàng viết kịch bản",
          ].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-black text-white">
                {index + 1}
              </div>
              <p className="text-sm font-extrabold leading-5 text-slate-700">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Target className="h-5 w-5" />
          </div>

          <h2 className="text-base font-black tracking-[-0.02em] text-slate-950">
            Tips
          </h2>
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            "Ưu tiên ý tưởng gắn với sản phẩm chính",
            "Hook phải rõ trong 3 giây đầu",
            "Mỗi sản phẩm nên có nhiều góc nội dung",
          ].map((tip) => (
            <div
              key={tip}
              className="flex gap-2 text-sm font-semibold leading-6 text-slate-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function SectionTitle({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count?: number;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
          {title}
        </h2>
        <p className="mt-1 max-w-3xl text-sm font-medium leading-6 text-slate-500">
          {description}
        </p>
      </div>

      {typeof count === "number" ? (
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">
          {count} mục
        </span>
      ) : null}
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
  icon: LucideIcon;
  tone: "emerald" | "violet" | "blue" | "amber";
}) {
  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    blue: "bg-sky-50 text-sky-600 border-sky-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  }[tone];

  return (
    <article className="rounded-[20px] border border-slate-200/80 bg-white p-3.5 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold text-slate-400">{title}</p>
          <p className="mt-1 text-xl font-black tracking-[-0.04em] text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${toneClass}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}