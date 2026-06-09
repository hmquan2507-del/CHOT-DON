import type { Product } from "@/types/product";
import { ExternalLink, Pencil, Star, Trash2 } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

function toNumber(value: number | string | null | undefined) {
  const parsedValue = Number(value ?? 0);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function formatCurrency(value: number | string | null | undefined) {
  const amount = toNumber(value);

  if (amount <= 0) {
    return "Chưa có giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

function splitTextToBullets(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/\n|,|•|-/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function ProductCard({ product }: ProductCardProps) {
  const strengths = splitTextToBullets(product.strengths);
  const commission = toNumber(product.commission);

  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.priority === "high" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-extrabold text-amber-700">
                <Star className="h-3.5 w-3.5 fill-current" />
                Ưu tiên đẩy
              </span>
            ) : null}

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
              {product.status}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-black tracking-[-0.03em] text-slate-950">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-base font-black text-emerald-700">
          {formatCurrency(product.price)}
        </span>

        {commission > 0 ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
            Hoa hồng {commission.toFixed(1)}%
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.affiliate_url ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
            <ExternalLink className="h-3.5 w-3.5" />
            Affiliate
          </span>
        ) : null}

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
          {product.category || "Chưa phân loại"}
        </span>
      </div>

      {strengths.length > 0 ? (
        <ul className="mt-4 space-y-1.5 text-sm font-medium leading-6 text-slate-600">
          {strengths.map((strength) => (
            <li key={strength}>• {strength}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm font-medium text-slate-400">
          Chưa có điểm mạnh sản phẩm.
        </p>
      )}

      <div className="mt-4 rounded-2xl bg-slate-50 p-3">
        <p className="text-xs font-extrabold text-slate-500">
          Đối tượng phù hợp
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-medium leading-6 text-slate-600">
          {product.target_customer || "Chưa có mô tả khách hàng phù hợp."}
        </p>
      </div>

      {product.notes ? (
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-500">
          {product.notes}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled
          className="flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 text-sm font-extrabold text-emerald-700 opacity-70"
        >
          <Pencil className="h-4 w-4" />
          Sửa
        </button>

        <button
          type="button"
          disabled
          className="flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 text-sm font-extrabold text-red-600 opacity-70"
        >
          <Trash2 className="h-4 w-4" />
          Xóa
        </button>
      </div>
    </article>
  );
}