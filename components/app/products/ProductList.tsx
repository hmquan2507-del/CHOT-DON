import type { Product } from "@/types/product";
import { Grid2X2, ListFilter, Search } from "lucide-react";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["Tất cả", "Affiliate", "Ưu tiên đẩy"].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-2xl px-4 py-2 text-sm font-extrabold transition ${
                index === 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Tìm sản phẩm..."
              className="h-10 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 sm:w-64"
            />
          </div>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-extrabold text-slate-600 transition hover:bg-slate-50"
          >
            <ListFilter className="h-4 w-4" />
            Mới nhất
          </button>

          <button
            type="button"
            className="flex h-10 items-center justify-center rounded-2xl border border-slate-200 px-3 text-emerald-600 transition hover:bg-emerald-50"
          >
            <Grid2X2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}