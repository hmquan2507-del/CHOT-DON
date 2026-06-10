import type { Product } from "@/types/product";
import { Grid2X2, ListFilter, Search, PackagePlus } from "lucide-react";
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
    <section className="rounded-[24px] border border-slate-200/60 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["Tất cả", "Affiliate", "Ưu tiên đẩy"].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-2xl px-4 py-2.5 text-sm font-extrabold transition ${
                index === 0
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
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
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 sm:w-64"
            />
          </div>

          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ListFilter className="h-4 w-4" />
            Mới nhất
          </button>

          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3.5 text-emerald-600 shadow-sm transition hover:bg-emerald-50"
          >
            <Grid2X2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} channel={channel} />
        ))}
        
        {products.length === 1 && (
          <div className="flex flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center min-h-[300px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-slate-400 mb-4 border border-slate-100">
              <PackagePlus className="h-6 w-6" />
            </div>
            <p className="text-sm font-extrabold text-slate-700">Thêm sản phẩm tiếp theo</p>
            <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 max-w-[200px]">
              Càng nhiều sản phẩm, AI gợi ý kịch bản càng chuẩn xác.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
