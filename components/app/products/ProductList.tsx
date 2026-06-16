import type { Product } from "@/types/product";
import { Grid2X2, ListFilter, PackagePlus, Search } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

type ProductListProps = {
  products: Product[];
  channel: ChannelSummary | null;
};

export default function ProductList({ products, channel }: ProductListProps) {
  return (
    <section className="rounded-[24px] border border-slate-200/60 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["Tất cả", "Affiliate", "Ưu tiên đẩy"].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={[
                "inline-flex h-10 cursor-pointer items-center justify-center rounded-2xl px-4 text-sm font-extrabold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]",
                index === 0
                  ? "bg-emerald-600 text-white shadow-[0_10px_24px_rgba(16,185,129,0.18)] hover:bg-emerald-700"
                  : "border border-transparent text-slate-500 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Tìm sản phẩm..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-semibold outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 sm:w-64"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <ListFilter className="h-4 w-4" />
            Mới nhất
          </button>

          <button
            type="button"
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-3.5 text-emerald-600 shadow-sm transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            aria-label="Đổi kiểu hiển thị sản phẩm"
          >
            <Grid2X2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} channel={channel} />
        ))}

        {products.length === 1 ? (
          <Link
            href="/app/products?tab=create"
            className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-8 text-center transition-all duration-200 ease-out hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm">
              <PackagePlus className="h-6 w-6" />
            </div>
            <p className="text-sm font-extrabold text-slate-800">
              Thêm sản phẩm tiếp theo
            </p>
            <p className="mt-2 max-w-[220px] text-xs font-semibold leading-5 text-slate-500">
              Càng nhiều sản phẩm, AI gợi ý kịch bản càng chuẩn xác.
            </p>
          </Link>
        ) : null}
      </div>
    </section>
  );
}