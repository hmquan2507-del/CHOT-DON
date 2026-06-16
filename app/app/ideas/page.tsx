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
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ContentIdeaGenerator from "@/components/app/ideas/ContentIdeaGenerator";
import ContentIdeasEmptyState from "@/components/app/ideas/ContentIdeasEmptyState";
import ContentIdeasList from "@/components/app/ideas/ContentIdeasList";
import IdeasManagementToolbar from "@/components/app/ideas/IdeasManagementToolbar";
import type { IdeasToolbarFilters } from "@/components/app/ideas/IdeasManagementToolbar";
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
    q?: string | string[];
    platform?: string | string[];
    status?: string | string[];
    source?: string | string[];
    productId?: string | string[];
    sort?: string | string[];
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

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getActiveTab(value: string | string[] | undefined): IdeaTabKey {
  const tab = getSingleParam(value);

  if (tab === "generate" || tab === "ready" || tab === "archived") {
    return tab;
  }

  return "all";
}

function getFilters(
  searchParams: Awaited<NonNullable<IdeasPageProps["searchParams"]>> | undefined,
): IdeasToolbarFilters {
  return {
    q: getSingleParam(searchParams?.q)?.trim() ?? "",
    platform: getSingleParam(searchParams?.platform) ?? "",
    status: getSingleParam(searchParams?.status) ?? "",
    source: getSingleParam(searchParams?.source) ?? "",
    productId: getSingleParam(searchParams?.productId) ?? "",
    sort: getSingleParam(searchParams?.sort) ?? "newest",
  };
}

function isReadyIdea(idea: ContentIdea) {
  return idea.status === "ready_for_script" || idea.status === "ready";
}

function isArchivedIdea(idea: ContentIdea) {
  return idea.status === "archived";
}

function calculateStats(ideas: ContentIdea[]): IdeaStats {
  return {
    totalIdeas: ideas.length,
    aiIdeas: ideas.filter((idea) => idea.source_type === "ai").length,
    readyForScript: ideas.filter(isReadyIdea).length,
    scheduledIdeas: ideas.filter((idea) => idea.status === "scheduled").length,
  };
}

function matchStatus(idea: ContentIdea, status: string) {
  if (!status) {
    return true;
  }

  if (status === "ready") {
    return isReadyIdea(idea);
  }

  return idea.status === status;
}

function getBaseIdeasByTab(
  ideas: ContentIdea[],
  activeTab: IdeaTabKey,
  statusFilter: string,
) {
  if (activeTab === "ready") {
    return ideas.filter(isReadyIdea);
  }

  if (activeTab === "archived") {
    return ideas.filter(isArchivedIdea);
  }

  if (statusFilter === "archived") {
    return ideas.filter(isArchivedIdea);
  }

  return ideas.filter((idea) => !isArchivedIdea(idea));
}

function applyIdeaFilters(
  ideas: ContentIdea[],
  filters: IdeasToolbarFilters,
): ContentIdea[] {
  const keyword = filters.q.toLowerCase();

  return ideas.filter((idea) => {
    if (keyword) {
      const searchableText = [
        idea.title,
        idea.hook,
        idea.angle,
        idea.cta,
        idea.hashtags,
        idea.notes,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(keyword)) {
        return false;
      }
    }

    if (filters.platform && idea.platform !== filters.platform) {
      return false;
    }

    if (filters.status && !matchStatus(idea, filters.status)) {
      return false;
    }

    if (filters.source && idea.source_type !== filters.source) {
      return false;
    }

    if (filters.productId && idea.product_id !== filters.productId) {
      return false;
    }

    return true;
  });
}

function getPriorityScore(priority?: string | null) {
  if (priority === "high") {
    return 0;
  }

  if (priority === "medium" || priority === "normal") {
    return 1;
  }

  if (priority === "low") {
    return 2;
  }

  return 3;
}

function sortIdeas(ideas: ContentIdea[], sort: string) {
  return [...ideas].sort((a, b) => {
    if (sort === "oldest") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sort === "priority") {
      return getPriorityScore(a.priority) - getPriorityScore(b.priority);
    }

    if (sort === "ready") {
      if (isReadyIdea(a) && !isReadyIdea(b)) {
        return -1;
      }

      if (!isReadyIdea(a) && isReadyIdea(b)) {
        return 1;
      }
    }

    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

function hasActiveFilters(filters: IdeasToolbarFilters) {
  return Boolean(
    filters.q ||
      filters.platform ||
      filters.status ||
      filters.source ||
      filters.productId ||
      (filters.sort && filters.sort !== "newest"),
  );
}

function buildTabHref(tab: IdeaTabKey, filters: IdeasToolbarFilters) {
  const params = new URLSearchParams();

  params.set("tab", tab);

  if (filters.q) params.set("q", filters.q);
  if (filters.platform) params.set("platform", filters.platform);
  if (filters.status) params.set("status", filters.status);
  if (filters.source) params.set("source", filters.source);
  if (filters.productId) params.set("productId", filters.productId);
  if (filters.sort && filters.sort !== "newest") {
    params.set("sort", filters.sort);
  }

  return `/app/ideas?${params.toString()}`;
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
  const filters = getFilters(resolvedSearchParams);

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

  const baseIdeas = getBaseIdeasByTab(ideas, activeTab, filters.status);
  const filteredIdeas = applyIdeaFilters(baseIdeas, filters);
  const visibleIdeas = sortIdeas(filteredIdeas, filters.sort);
  const hasFilters = hasActiveFilters(filters);

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
                href={buildTabHref(tab.key, filters)}
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
          filters={filters}
          hasFilters={hasFilters}
        />
      ) : activeTab === "archived" ? (
        <ArchivedTab
          ideas={visibleIdeas}
          channels={channels}
          products={products}
          filters={filters}
          hasFilters={hasFilters}
        />
      ) : (
        <AllIdeasTab
          ideas={visibleIdeas}
          channels={channels}
          products={products}
          filters={filters}
          hasFilters={hasFilters}
        />
      )}
    </div>
  );
}

function AllIdeasTab({
  ideas,
  channels,
  products,
  filters,
  hasFilters,
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
  filters: IdeasToolbarFilters;
  hasFilters: boolean;
}) {
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,70%)_minmax(300px,30%)]">
      <section className="min-w-0 space-y-3">
        <SectionTitle
          title="Thư viện ý tưởng"
          description="Chọn nhanh ý tưởng tốt nhất để chuẩn bị viết kịch bản ở Phase 7."
          count={ideas.length}
        />

        <IdeasManagementToolbar
          activeTab="all"
          filters={filters}
          products={products}
        />

        <IdeasListSurface
          ideas={ideas}
          channels={channels}
          products={products}
          hasFilters={hasFilters}
        />
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
  filters,
  hasFilters,
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
  filters: IdeasToolbarFilters;
  hasFilters: boolean;
}) {
  return (
    <section className="space-y-4">
      <SectionTitle
        title="Sẵn sàng viết kịch bản"
        description="Những ý tưởng đã được chọn lọc, chuẩn bị chuyển sang Script Generator ở Phase 7."
        count={ideas.length}
      />

      <IdeasManagementToolbar
        activeTab="ready"
        filters={filters}
        products={products}
      />

      <IdeasListSurface
        ideas={ideas}
        channels={channels}
        products={products}
        hasFilters={hasFilters}
        emptyTitle="Chưa có ý tưởng sẵn sàng viết kịch bản"
        emptyDescription="Hãy chọn một ý tưởng nháp và đánh dấu sẵn sàng, hoặc tạo ý tưởng mới bằng AI."
      />
    </section>
  );
}

function ArchivedTab({
  ideas,
  channels,
  products,
  filters,
  hasFilters,
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
  filters: IdeasToolbarFilters;
  hasFilters: boolean;
}) {
  return (
    <section className="space-y-4">
      <SectionTitle
        title="Ý tưởng đã lưu trữ"
        description="Các ý tưởng chưa dùng tới hoặc muốn giữ lại để tham khảo sau."
        count={ideas.length}
      />

      <IdeasManagementToolbar
        activeTab="archived"
        filters={filters}
        products={products}
      />

      <IdeasListSurface
        ideas={ideas}
        channels={channels}
        products={products}
        hasFilters={hasFilters}
        emptyTitle="Chưa có ý tưởng đã lưu trữ"
        emptyDescription="Các ý tưởng bạn lưu trữ sẽ xuất hiện tại đây."
        emptyCtaHref=""
      />
    </section>
  );
}

function IdeasListSurface({
  ideas,
  channels,
  products,
  hasFilters,
  emptyTitle,
  emptyDescription,
  emptyCtaHref = "/app/ideas?tab=generate",
}: {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
  hasFilters: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyCtaHref?: string;
}) {
  if (ideas.length === 0) {
    return (
      <ContentIdeasEmptyState
        title={
          hasFilters
            ? "Không tìm thấy ý tưởng phù hợp"
            : emptyTitle ?? "Chưa có ý tưởng nào"
        }
        description={
          hasFilters
            ? "Thử đổi từ khóa, bộ lọc hoặc tạo thêm ý tưởng mới bằng AI."
            : emptyDescription ??
              "Chọn kênh, sản phẩm và mục tiêu để AI tạo ý tưởng video ngắn đầu tiên."
        }
        ctaHref={hasFilters ? "/app/ideas?tab=generate" : emptyCtaHref}
        ctaLabel="Tạo ý tưởng bằng AI"
      />
    );
  }

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-3 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
      <div className="max-h-[640px] overflow-y-auto pr-2">
        <ContentIdeasList ideas={ideas} channels={channels} products={products} />
      </div>
    </div>
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
              Tạo ý tưởng mới
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
            Việc nên làm
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
            Mẹo chọn ý tưởng
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