import type { Product } from "@/types/product";
import { Bot, ChevronRight } from "lucide-react";

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
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Bot className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950">
            AI gợi ý ưu tiên
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Dựa trên dữ liệu sản phẩm hiện có.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm font-medium leading-6 text-slate-500">
          Thêm sản phẩm để AI có dữ liệu gợi ý.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-black text-slate-950">
                  {product.name}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">
                  {getReason(product)}
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}