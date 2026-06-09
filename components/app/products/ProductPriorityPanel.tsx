import type { Product } from "@/types/product";
import { Sparkles, ChevronRight } from "lucide-react";

type ProductPriorityPanelProps = {
  products: Product[];
};

function toNumber(value: number | string | null | undefined) {
  const parsedValue = Number(value ?? 0);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function getReason(product: Product) {
  if (product.priority === "high") {
    return "Được đánh dấu ưu tiên";
  }

  if (product.affiliate_url) {
    return "Có link affiliate";
  }

  if (toNumber(product.commission) > 0) {
    return "Hoa hồng cao";
  }

  return "Có dữ liệu sản phẩm";
}

export default function ProductPriorityPanel({
  products,
}: ProductPriorityPanelProps) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-sm border border-amber-100/50">
          <Sparkles className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-[17px] font-black tracking-[-0.02em] text-slate-950">
            AI gợi ý ưu tiên
          </h2>
          <p className="mt-0.5 text-[13px] font-medium text-slate-500">
            Dựa trên dữ liệu đã nhập
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
          <span className="text-[13px] font-semibold leading-relaxed text-slate-500">
            Thêm sản phẩm để AI có dữ liệu phân tích và gợi ý nội dung phù hợp.
          </span>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group flex cursor-pointer items-center gap-3 rounded-[18px] border border-slate-100 bg-slate-50/80 p-3 transition hover:bg-white hover:shadow-md hover:border-emerald-100"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[13px] font-black text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[14px] font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {product.name}
                </p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-500">
                  {getReason(product)}
                </p>
              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 group-hover:border-emerald-100">
                 <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
