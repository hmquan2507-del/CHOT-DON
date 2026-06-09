import type { Product } from "@/types/product";
import { ExternalLink, Pencil, Star, Trash2, Package } from "lucide-react";

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

function getInitials(name: string) {
  return name.substring(0, 2).toUpperCase();
}

export default function ProductCard({ product }: ProductCardProps) {
  const strengths = splitTextToBullets(product.strengths);
  const commission = toNumber(product.commission);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-slate-100 text-slate-600 border-slate-200",
    archived: "bg-slate-100 text-slate-500 border-slate-200 opacity-80",
  };

  const statusLabels: Record<string, string> = {
    active: "Đang dùng",
    draft: "Bản nháp",
    archived: "Lưu trữ",
  };

  const statusStyle = statusColors[product.status] || statusColors.draft;
  const statusLabel = statusLabels[product.status] || product.status;

  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] group">
      {/* Thumbnail Area */}
      <div className="relative h-32 w-full bg-gradient-to-br from-emerald-100/80 to-[#F3FBF5] flex items-center justify-center border-b border-slate-100/50">
        <div className="absolute top-3 left-3 flex gap-2">
          {product.priority === "high" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-950 shadow-sm">
              <Star className="h-3 w-3 fill-amber-950" />
              Ưu tiên
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${statusStyle}`}>
            {statusLabel}
          </span>
        </div>
        
        {/* Placeholder Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white shadow-sm text-emerald-600 font-black text-2xl group-hover:scale-105 transition-transform duration-500 border border-white/50">
           {getInitials(product.name)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-[-0.03em] text-slate-950">
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[17px] font-black text-emerald-700">
            {formatCurrency(product.price)}
          </span>

          {commission > 0 && (
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700 border border-emerald-100/50">
              HH {commission.toFixed(1)}%
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.affiliate_url && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600">
              <ExternalLink className="h-3 w-3" />
              Affiliate
            </span>
          )}

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
            {product.category || "Chưa phân loại"}
          </span>
        </div>

        {strengths.length > 0 ? (
          <ul className="mt-4 space-y-1.5 text-[13px] font-medium leading-relaxed text-slate-600">
            {strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-[13px] font-medium text-slate-400 italic">
            Chưa có điểm mạnh sản phẩm.
          </p>
        )}

        <div className="mt-4 rounded-xl bg-amber-50/50 p-3 border border-amber-100/50">
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">
            Khách hàng mục tiêu
          </p>
          <p className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed text-amber-900/80">
            {product.target_customer || "Chưa có mô tả."}
          </p>
        </div>

        {product.notes && (
          <p className="mt-3 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
            <span className="font-bold">Ghi chú:</span> {product.notes}
          </p>
        )}

        <div className="mt-auto pt-5 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            disabled
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            title="Chỉnh sửa (Sắp ra mắt)"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50/50 text-red-300 hover:bg-red-50 hover:text-red-500 transition"
            title="Xóa (Sắp ra mắt)"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
