import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";
import ProductStats from "@/components/app/products/ProductStats";
import ProductAnalytics from "@/components/app/products/ProductAnalytics";
import ProductEmptyState from "@/components/app/products/ProductEmptyState";
import ProductForm from "@/components/app/products/ProductForm";
import ProductList from "@/components/app/products/ProductList";
import ProductPriorityPanel from "@/components/app/products/ProductPriorityPanel";

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
    affiliateProducts: products.filter((product) => Boolean(product.affiliate_url))
      .length,
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

export default async function ProductsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

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

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          <span>Content Chốt Đơn</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-800">Thư viện sản phẩm</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Thư viện sản phẩm
          </h1>
        </div>

        <p className="max-w-3xl text-base font-medium leading-7 text-slate-500">
          Quản lý sản phẩm giúp AI tạo ý tưởng và kịch bản chính xác, phù hợp
          hơn với kênh của bạn.
        </p>
      </header>

      {!channel ? (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 shadow-sm">
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
              href="/app/channel"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-600 px-4 text-sm font-extrabold text-white transition hover:bg-amber-700"
            >
              Tạo hồ sơ kênh
            </Link>
          </div>
        </div>
      ) : null}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0 space-y-6">
          <ProductStats stats={stats} />

          <ProductAnalytics
            products={products}
            categoryDistribution={categoryDistribution}
            topCommissionProducts={topCommissionProducts}
          />

          {products.length === 0 ? (
            <ProductEmptyState />
          ) : (
            <ProductList products={products} />
          )}
        </section>

        <aside className="space-y-6">
          <ProductForm channel={channel} />
          <ProductPriorityPanel products={priorityProducts} />
        </aside>
      </div>
    </div>
  );
}