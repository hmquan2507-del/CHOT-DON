"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import {
  ExternalLink,
  Pencil,
  Star,
  Trash2,
  Package,
  X,
  BadgeDollarSign,
  Percent,
  Tag,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductForm from "./ProductForm";
import ProductDeleteDialog from "./ProductDeleteDialog";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

type ProductCardProps = {
  product: Product;
  channel: ChannelSummary | null;
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

export default function ProductCard({ product, channel }: ProductCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
    <article className="group flex flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-sm transition-all duration-200 ease-out hover:border-emerald-100 hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)]">
      <div className="relative flex h-32 w-full items-center justify-center border-b border-slate-100/70 bg-gradient-to-br from-emerald-100/80 via-[#F3FBF5] to-white">
        <div className="absolute left-3 top-3 flex gap-2">
          {product.priority === "high" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-950 shadow-sm">
              <Star className="h-3 w-3 fill-amber-950" />
              Ưu tiên
            </span>
          ) : null}
        </div>

        <div className="absolute right-3 top-3">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${statusStyle}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/70 bg-white text-2xl font-black text-emerald-600 shadow-sm transition-transform duration-200 ease-out group-hover:scale-[1.03]">
          {getInitials(product.name)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-[-0.03em] text-slate-950">
              {product.name}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600">
                <Tag className="h-3 w-3" />
                {product.category || "Chưa phân loại"}
              </span>

              {product.affiliate_url ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
                  <ExternalLink className="h-3 w-3" />
                  Có affiliate
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-500">
                  Chưa có link
                </span>
              )}
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Package className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-400">
              <BadgeDollarSign className="h-3.5 w-3.5 text-emerald-500" />
              Giá
            </div>
            <p className="mt-1 text-sm font-black text-slate-950">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-400">
              <Percent className="h-3.5 w-3.5 text-emerald-500" />
              Hoa hồng
            </div>
            <p className="mt-1 text-sm font-black text-slate-950">
              {commission > 0 ? `${commission.toFixed(1)}%` : "Chưa có"}
            </p>
          </div>
        </div>

        {strengths.length > 0 ? (
          <ul className="mt-4 space-y-1.5 text-[13px] font-medium leading-relaxed text-slate-600">
            {strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span className="line-clamp-1">{strength}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-[13px] font-medium italic text-slate-400">
            Chưa có điểm mạnh sản phẩm.
          </p>
        )}

        <div className="mt-4 rounded-2xl border border-amber-100/70 bg-amber-50/50 p-3">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-amber-800">
            <Users className="h-3.5 w-3.5" />
            Khách hàng mục tiêu
          </div>
          <p className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed text-amber-900/80">
            {product.target_customer || "Chưa có mô tả."}
          </p>
        </div>

        {product.notes ? (
          <p className="mt-3 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
            <span className="font-bold">Ghi chú:</span> {product.notes}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-end gap-2 border-t border-slate-100 pt-5">
          <Sheet open={editOpen} onOpenChange={setEditOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-200 ease-out hover:bg-emerald-50 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
                title="Chỉnh sửa sản phẩm"
                aria-label="Chỉnh sửa sản phẩm"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full border-slate-200/80 bg-white p-0 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:max-w-xl"
            >
              <SheetHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100/50 bg-emerald-50 text-emerald-600 shadow-sm">
                    <Pencil className="h-6 w-6" />
                  </div>

                  <div>
                    <SheetTitle className="text-[19px] font-black tracking-[-0.02em] text-slate-950">
                      Chỉnh sửa sản phẩm
                    </SheetTitle>
                    <p className="mt-0.5 text-[13px] font-medium text-slate-500">
                      Cập nhật thông tin sản phẩm
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-all duration-200 ease-out hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 active:scale-[0.98]"
                  aria-label="Đóng chỉnh sửa sản phẩm"
                >
                  <X className="h-5 w-5" />
                </button>
              </SheetHeader>

              <div className="overflow-y-auto px-6 py-6">
                <ProductForm channel={channel} product={product} />
              </div>
            </SheetContent>
          </Sheet>

          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-red-50/50 text-red-300 transition-all duration-200 ease-out hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 active:scale-[0.98]"
            title="Xóa sản phẩm"
            aria-label="Xóa sản phẩm"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ProductDeleteDialog
        product={product}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </article>
  );
}