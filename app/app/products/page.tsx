import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  BadgeDollarSign,
  BarChart3,
  Box,
  CheckCircle2,
  ChevronRight,
  Link2,
  PackagePlus,
  Percent,
  PlusCircle,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";
import ProductAnalytics from "@/components/app/products/ProductAnalytics";
import ProductEmptyState from "@/components/app/products/ProductEmptyState";
import ProductForm from "@/components/app/products/ProductForm";
import ProductImportCard from "@/components/app/products/ProductImportCard";
import ProductList from "@/components/app/products/ProductList";
import ProductPriorityPanel from "@/components/app/products/ProductPriorityPanel";

type ProductTabKey = "all" | "create" | "import" | "ai";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

type ProductStatsData = {
  totalProducts: number;
  affiliateProducts: number;
  averageCommission: number;
  potentialValue: number;
};

type CategoryDistributionItem = {
  category: string;
  count: number;
  percent: number;
};

type ProductsPageProps = {
  searchParams?: Promise<{
    tab?: string | string[];
  }>;
};

const productTabs: Array<{
  key: ProductTabKey;
  label: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    key: "all",
    label: "Tất cả sản phẩm",
    href: "/app/products?tab=all",
    icon: Box,
  },
  {
    key: "create",
    label: "Thêm sản phẩm",
    href: "/app/products?tab=create",
    icon: PlusCircle,
  },
  {
    key: "import",
    label: "Nhập bằng link",
    href: "/app/products?tab=import",
    icon: UploadCloud,
  },
  {
    key: "ai",
    label: "AI phân tích",
    href: "/app/products?tab=ai",
    icon: Sparkles,
  },
];

function getActiveTab(value: string | string[] | undefined): ProductTabKey {
  const tab = Array.isArray(value) ? value[0] : value;

  if (tab === "create" || tab === "import" || tab === "ai") {
    return tab;
  }

  return "all";
}

function toNumber(value: number | string | null | undefined) {
  const parsedValue = Number(value ?? 0);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function calculateStats(products: Product[]): ProductStatsData {
  const productsWithCommission = products.filter((product) => {
    return product.commission !== null && toNumber(product.commission) > 0;
  });

  const totalCommission = productsWithCommission.reduce((total, product) => {
    return total + toNumber(product.commission);
  }, 0);

  const averageCommission =
    productsWithCommission.length > 0
      ? totalCommission / productsWithCommission.length
      : 0;

  const potentialValue = products.reduce((total, product) => {
    const price = toNumber(product.price);
    const commission = toNumber(product.commission);

    if (price <= 0 || commission <= 0) {
      return total;
    }

    return total + (price * commission) / 100;
  }, 0);

  return {
    totalProducts: products.length,
    affiliateProducts: products.filter((product) =>
      Boolean(product.affiliate_url),
    ).length,
    averageCommission,
    potentialValue,
  };
}

function calculateCategoryDistribution(
  products: Product[],
): CategoryDistributionItem[] {
  if (products.length === 0) {
    return [];
  }

  const categoryMap = new Map<string, number>();

  products.forEach((product) => {
    const category = product.category?.trim() || "Chưa phân loại";
    categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({
      category,
      count,
      percent: Math.round((count / products.length) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

function getTopCommissionProducts(products: Product[]) {
  return [...products]
    .filter((product) => toNumber(product.commission) > 0)
    .sort((a, b) => toNumber(b.commission) - toNumber(a.commission))
    .slice(0, 5);
}

function getPriorityProducts(products: Product[]) {
  return [...products]
    .sort((a, b) => {
      const aPriorityScore = a.priority === "high" ? 1000 : 0;
      const bPriorityScore = b.priority === "high" ? 1000 : 0;

      const aAffiliateScore = a.affiliate_url ? 200 : 0;
      const bAffiliateScore = b.affiliate_url ? 200 : 0;

      const aCommissionScore = toNumber(a.commission);
      const bCommissionScore = toNumber(b.commission);

      return (
        bPriorityScore +
        bAffiliateScore +
        bCommissionScore -
        (aPriorityScore + aAffiliateScore + aCommissionScore)
      );
    })
    .slice(0, 3);
}

function getProductsWithMissingInfo(products: Product[]) {
  return products
    .filter((product) => {
      return (
        !product.affiliate_url ||
        !product.category ||
        !product.strengths ||
        !product.target_customer ||
        toNumber(product.commission) <= 0
      );
    })
    .slice(0, 6);
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
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

  const { data: channelData } = await supabase
    .from("channels")
    .select("id, name, platform, niche")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (productsError) {
    throw new Error(productsError.message);
  }

  const channel = channelData as ChannelSummary | null;
  const products = (productsData ?? []) as Product[];

  const stats = calculateStats(products);
  const categoryDistribution = calculateCategoryDistribution(products);
  const topCommissionProducts = getTopCommissionProducts(products);
  const priorityProducts = getPriorityProducts(products);
  const missingInfoProducts = getProductsWithMissingInfo(products);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-10">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <span>Content Chốt Đơn</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900">Sản phẩm</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {activeTab === "create"
                ? "Thêm sản phẩm"
                : activeTab === "import"
                  ? "Nhập sản phẩm bằng link"
                  : activeTab === "ai"
                    ? "AI phân tích sản phẩm"
                    : "Thư viện sản phẩm"}
            </h1>

            <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-slate-500">
              {activeTab === "create"
                ? "Cung cấp thông tin sản phẩm để AI tạo ý tưởng và kịch bản tốt hơn."
                : activeTab === "import"
                  ? "Dán link sản phẩm, lấy metadata, dùng AI gợi ý thông tin rồi lưu vào thư viện."
                  : activeTab === "ai"
                    ? "Xem các tín hiệu sản phẩm để quyết định nên đẩy sản phẩm nào trong nội dung."
                    : "Quản lý sản phẩm giúp AI tạo ý tưởng và kịch bản chính xác hơn."}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/app/products?tab=create"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <PlusCircle className="h-4 w-4" />
              Thêm sản phẩm
            </Link>

            <Link
              href="/app/products?tab=import"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <UploadCloud className="h-4 w-4" />
              Nhập bằng link
            </Link>
          </div>
        </div>
      </header>

      {!channel ? (
        <section className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-extrabold text-amber-900">
                Bạn nên tạo hồ sơ kênh trước khi thêm sản phẩm.
              </p>
              <p className="mt-1 text-sm font-medium text-amber-700">
                Hồ sơ kênh giúp hệ thống hiểu đúng nền tảng, ngách và khách
                hàng mục tiêu.
              </p>
            </div>

            <Link
              href="/app/channel?tab=overview"
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-2xl bg-amber-600 px-4 text-sm font-extrabold text-white transition-all duration-200 ease-out hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 active:scale-[0.98]"
            >
              Tạo hồ sơ kênh
            </Link>
          </div>
        </section>
      ) : null}

      <ProductTabBar activeTab={activeTab} />

      {activeTab === "create" ? (
        <CreateProductTab channel={channel} />
      ) : activeTab === "import" ? (
        <ImportProductTab channel={channel} />
      ) : activeTab === "ai" ? (
        <AIProductTab
          products={products}
          stats={stats}
          categoryDistribution={categoryDistribution}
          topCommissionProducts={topCommissionProducts}
          priorityProducts={priorityProducts}
          missingInfoProducts={missingInfoProducts}
        />
      ) : (
        <AllProductsTab
          products={products}
          channel={channel}
          stats={stats}
        />
      )}
    </div>
  );
}

function ProductTabBar({ activeTab }: { activeTab: ProductTabKey }) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-slate-200/80 bg-white p-2 shadow-[0_14px_36px_rgba(15,23,42,0.045)]">
      <div className="flex min-w-max gap-2">
        {productTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={[
                "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                isActive
                  ? "bg-emerald-600 text-white shadow-[0_12px_30px_rgba(16,185,129,0.24)]"
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
  );
}

function AllProductsTab({
  products,
  channel,
  stats,
}: {
  products: Product[];
  channel: ChannelSummary | null;
  stats: ProductStatsData;
}) {
  return (
    <section className="space-y-5">
      <CompactProductStats stats={stats} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
            Danh sách sản phẩm
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            Quản lý các sản phẩm đã lưu. Form thêm sản phẩm và nhập link đã được
            tách sang tab riêng để dễ thao tác hơn.
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">
          {products.length} sản phẩm
        </span>
      </div>

      {products.length === 0 ? (
        <ProductEmptyState />
      ) : (
        <ProductList products={products} channel={channel} />
      )}
    </section>
  );
}

function CreateProductTab({ channel }: { channel: ChannelSummary | null }) {
  return (
    <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
      <IntroCard
        icon={PackagePlus}
        title="Thêm sản phẩm mới"
        description="Cung cấp thông tin sản phẩm để AI tạo ý tưởng và kịch bản tốt hơn."
        bullets={[
          "Nhập tên, giá, hoa hồng và link affiliate.",
          "Bổ sung điểm mạnh và chân dung khách hàng.",
          "Đánh dấu ưu tiên để biết sản phẩm nào nên đẩy nội dung.",
        ]}
      />

      <ProductForm channel={channel} />
    </section>
  );
}

function ImportProductTab({ channel }: { channel: ChannelSummary | null }) {
  return (
    <section className="space-y-5">
      <IntroCard
        icon={UploadCloud}
        title="Dán link → lấy dữ liệu → AI gợi ý → lưu sản phẩm"
        description="Tab này chỉ tập trung cho luồng nhập sản phẩm bằng link để bạn không bị rối bởi danh sách sản phẩm."
        bullets={[
          "Dán link sản phẩm hoặc link affiliate.",
          "Lấy metadata cơ bản trước.",
          "Dùng AI gợi ý thông tin bán hàng nếu cần.",
        ]}
        horizontal
      />

      <ProductImportCard channel={channel} />
    </section>
  );
}

function AIProductTab({
  products,
  stats,
  categoryDistribution,
  topCommissionProducts,
  priorityProducts,
  missingInfoProducts,
}: {
  products: Product[];
  stats: ProductStatsData;
  categoryDistribution: CategoryDistributionItem[];
  topCommissionProducts: Product[];
  priorityProducts: Product[];
  missingInfoProducts: Product[];
}) {
  if (products.length === 0) {
    return (
      <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.045)]">
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[22px] border border-dashed border-emerald-200 bg-emerald-50/45 px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-slate-950">
            Chưa có dữ liệu để phân tích
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
            Hãy thêm sản phẩm thủ công hoặc nhập bằng link để hệ thống có dữ
            liệu phân tích.
          </p>

          <Link
            href="/app/products?tab=create"
            className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white transition-all duration-200 ease-out hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            Thêm sản phẩm
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <CompactProductStats stats={stats} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0 space-y-6">
          <ProductAnalytics
            products={products}
            categoryDistribution={categoryDistribution}
            topCommissionProducts={topCommissionProducts}
          />

          <MissingInfoPanel products={missingInfoProducts} />
        </section>

        <aside className="space-y-6">
          <ProductPriorityPanel products={priorityProducts} />

          <section className="rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="mt-4 text-lg font-black tracking-[-0.03em] text-slate-950">
              Gợi ý sử dụng tab AI
            </h2>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              Ưu tiên sản phẩm có link affiliate, hoa hồng rõ ràng, điểm mạnh
              cụ thể và chân dung khách hàng tốt. Đây là dữ liệu nền cho Ideas
              và Script Generator.
            </p>
          </section>
        </aside>
      </div>
    </section>
  );
}

function CompactProductStats({ stats }: { stats: ProductStatsData }) {
  const cards = [
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts.toString(),
      icon: Box,
      tone: "emerald" as const,
    },
    {
      title: "Có link affiliate",
      value: stats.affiliateProducts.toString(),
      icon: Link2,
      tone: "violet" as const,
    },
    {
      title: "Hoa hồng trung bình",
      value: `${stats.averageCommission.toFixed(1)}%`,
      icon: Percent,
      tone: "blue" as const,
    },
    {
      title: "Giá trị tiềm năng",
      value: formatCompactCurrency(stats.potentialValue),
      icon: BadgeDollarSign,
      tone: "amber" as const,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <CompactStatCard key={card.title} {...card} />
      ))}
    </section>
  );
}

function CompactStatCard({
  title,
  value,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
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
    <article className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.035)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${toneClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}

function IntroCard({
  icon: Icon,
  title,
  description,
  bullets,
  horizontal,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  horizontal?: boolean;
}) {
  return (
    <section
      className={[
        "rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)] sm:p-6",
        horizontal ? "" : "xl:sticky xl:top-6",
      ].join(" ")}
    >
      <div
        className={[
          "gap-4",
          horizontal
            ? "grid md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:items-start"
            : "space-y-5",
        ].join(" ")}
      >
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)]">
            <Icon className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-slate-950">
            {title}
          </h2>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div className="rounded-[22px] border border-emerald-100 bg-white/80 p-4">
          <p className="text-sm font-black text-slate-950">Nên chuẩn bị</p>

          <ul className="mt-3 space-y-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2 text-sm font-semibold leading-6 text-slate-600"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MissingInfoPanel({ products }: { products: Product[] }) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <AlertCircle className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-black tracking-[-0.03em] text-slate-950">
            Sản phẩm còn thiếu dữ liệu
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            Những sản phẩm này nên bổ sung thêm link, hoa hồng, điểm mạnh hoặc
            chân dung khách hàng.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm font-semibold leading-6 text-emerald-700">
          Tốt rồi. Các sản phẩm hiện tại đã có dữ liệu cơ bản khá đầy đủ.
        </div>
      ) : (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
            >
              <p className="line-clamp-1 text-sm font-black text-slate-950">
                {product.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {[
                  !product.affiliate_url ? "thiếu link" : null,
                  !product.category ? "thiếu phân loại" : null,
                  !product.strengths ? "thiếu điểm mạnh" : null,
                  !product.target_customer ? "thiếu khách hàng" : null,
                  toNumber(product.commission) <= 0 ? "thiếu hoa hồng" : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}