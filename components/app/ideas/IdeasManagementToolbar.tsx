"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { ContentIdeaProductOption } from "@/types/content-idea";

export type IdeasToolbarFilters = {
  q: string;
  platform: string;
  status: string;
  source: string;
  productId: string;
  sort: string;
};

type IdeasManagementToolbarProps = {
  activeTab: string;
  filters: IdeasToolbarFilters;
  products: ContentIdeaProductOption[];
};

const controlClassName =
  "h-10 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30";

export default function IdeasManagementToolbar({
  activeTab,
  filters,
  products,
}: IdeasManagementToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [keyword, setKeyword] = useState(filters.q);

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.q ||
        filters.platform ||
        filters.status ||
        filters.source ||
        filters.productId ||
        (filters.sort && filters.sort !== "newest"),
    );
  }, [filters]);

  function updateParams(nextValues: Partial<IdeasToolbarFilters>) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", activeTab || "all");

    Object.entries(nextValues).forEach(([key, value]) => {
      if (!value || value === "all" || value === "newest") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`/app/ideas?${params.toString()}`);
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: keyword.trim() });
  }

  return (
    <section className="rounded-[22px] border border-slate-200/80 bg-white p-3 shadow-[0_10px_26px_rgba(15,23,42,0.03)]">
      <form
        onSubmit={handleSearchSubmit}
        className="grid gap-2 xl:grid-cols-[minmax(220px,1fr)_150px_180px_150px_150px_130px]"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm ý tưởng, hook, CTA..."
            className={`${controlClassName} w-full pl-10`}
          />
        </div>

        <select
          value={filters.platform || "all"}
          onChange={(event) => updateParams({ platform: event.target.value })}
          disabled={isPending}
          className={`${controlClassName} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <option value="all">Tất cả nền tảng</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube Shorts">YouTube Shorts</option>
          <option value="Facebook Reels">Facebook Reels</option>
        </select>

        <select
          value={filters.productId || "all"}
          onChange={(event) => updateParams({ productId: event.target.value })}
          disabled={isPending}
          className={`${controlClassName} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <option value="all">Tất cả sản phẩm</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <select
          value={filters.status || "all"}
          onChange={(event) => updateParams({ status: event.target.value })}
          disabled={isPending}
          className={`${controlClassName} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="draft">Nháp</option>
          <option value="ready">Sẵn sàng</option>
          <option value="scheduled">Đã lên lịch</option>
          <option value="published">Đã đăng</option>
          <option value="archived">Đã lưu trữ</option>
        </select>

        <select
          value={filters.source || "all"}
          onChange={(event) => updateParams({ source: event.target.value })}
          disabled={isPending}
          className={`${controlClassName} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <option value="all">Tất cả nguồn</option>
          <option value="ai">AI</option>
          <option value="manual">Thủ công</option>
        </select>

        <select
          value={filters.sort || "newest"}
          onChange={(event) => updateParams({ sort: event.target.value })}
          disabled={isPending}
          className={`${controlClassName} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="priority">Ưu tiên cao</option>
          <option value="ready">Sẵn sàng trước</option>
        </select>
      </form>

      {hasActiveFilters ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {filters.q ? <FilterChip label={`Từ khóa: ${filters.q}`} /> : null}
          {filters.platform ? (
            <FilterChip label={`Nền tảng: ${filters.platform}`} />
          ) : null}
          {filters.status ? (
            <FilterChip label={`Trạng thái: ${filters.status}`} />
          ) : null}
          {filters.source ? (
            <FilterChip label={`Nguồn: ${filters.source}`} />
          ) : null}

          <Link
            href={`/app/ideas?tab=${activeTab || "all"}`}
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-500 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <X className="h-3.5 w-3.5" />
            Xóa bộ lọc
          </Link>
        </div>
      ) : null}
    </section>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <span className="inline-flex h-8 items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 text-xs font-extrabold text-emerald-700">
      {label}
    </span>
  );
}