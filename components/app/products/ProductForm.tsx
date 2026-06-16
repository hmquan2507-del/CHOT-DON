"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  PackagePlus,
  Pencil,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { createProduct, updateProduct } from "@/actions/products";
import ProductSubmitButton from "./ProductSubmitButton";
import type { Product } from "@/types/product";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

export type ProductFormDefaultValues = {
  affiliate_url?: string;
  notes?: string;
  name?: string;
  price?: string | number;
  commission?: string | number;
  category?: string;
  strengths?: string;
  target_customer?: string;
};

type ProductFormProps = {
  channel: ChannelSummary | null;
  product?: Product;
  defaultValues?: ProductFormDefaultValues;
};

const inputClassName =
  "h-11 w-full rounded-2xl border border-[#DDE6EC] bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30";

const textareaClassName =
  "min-h-[88px] w-full resize-none rounded-2xl border border-[#DDE6EC] bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-900 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30";

const labelClassName = "mb-2 block text-[13px] font-extrabold text-slate-700";

export default function ProductForm({
  channel,
  product,
  defaultValues,
}: ProductFormProps) {
  const isEditing = Boolean(product);

  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.055)]">
      <div className="border-b border-slate-100 bg-white px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
              {isEditing ? (
                <Pencil className="h-6 w-6" />
              ) : (
                <PackagePlus className="h-6 w-6" />
              )}
            </div>

            <div>
              <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                {isEditing ? "Chỉnh sửa sản phẩm" : "Thông tin sản phẩm"}
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                {isEditing
                  ? "Cập nhật dữ liệu sản phẩm đang dùng cho AI."
                  : "Một form gọn để lưu sản phẩm vào Supabase và dùng cho Ideas/Script."}
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Dữ liệu cho AI
          </div>
        </div>
      </div>

      <form
        action={
          isEditing && product ? updateProduct.bind(null, product.id) : createProduct
        }
      >
        <div className="space-y-5 p-5 sm:p-6">
          <FormGroup
            number="1"
            title="Thông tin chính"
            description="Tên, kênh liên kết, giá và phân loại sản phẩm."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Kênh liên kết">
                <select
                  name="channel_id"
                  defaultValue={product?.channel_id ?? channel?.id ?? ""}
                  className={`${inputClassName} cursor-pointer`}
                >
                  {channel ? (
                    <option value={channel.id}>
                      {channel.name}
                      {channel.platform ? ` (${channel.platform})` : ""}
                    </option>
                  ) : (
                    <option value="">Chưa có hồ sơ kênh</option>
                  )}
                </select>
              </Field>

              <Field label="Tên sản phẩm" required>
                <input
                  name="name"
                  required
                  defaultValue={product?.name ?? defaultValues?.name ?? ""}
                  placeholder="Nhập tên sản phẩm..."
                  className={inputClassName}
                />
              </Field>

              <Field label="Giá (VND)">
                <input
                  name="price"
                  type="number"
                  min="0"
                  defaultValue={product?.price ?? defaultValues?.price ?? ""}
                  placeholder="0"
                  className={inputClassName}
                />
              </Field>

              <Field label="Ngách / Phân loại">
                <input
                  name="category"
                  defaultValue={product?.category ?? defaultValues?.category ?? ""}
                  placeholder="Vd: Skincare, Gia dụng..."
                  className={inputClassName}
                />
              </Field>
            </div>
          </FormGroup>

          <FormGroup
            number="2"
            title="Bán hàng / Affiliate"
            description="Thông tin giúp AI biết sản phẩm nào đáng ưu tiên để chốt đơn."
          >
            <div className="grid gap-4 lg:grid-cols-4">
              <Field label="Hoa hồng (%)">
                <input
                  name="commission"
                  type="number"
                  min="0"
                  step="0.1"
                  defaultValue={
                    product?.commission ?? defaultValues?.commission ?? ""
                  }
                  placeholder="0.0"
                  className={inputClassName}
                />
              </Field>

              <div className="lg:col-span-2">
                <Field label="Link Affiliate">
                  <input
                    name="affiliate_url"
                    type="url"
                    defaultValue={
                      product?.affiliate_url ??
                      defaultValues?.affiliate_url ??
                      ""
                    }
                    placeholder="https://..."
                    className={inputClassName}
                  />
                </Field>
              </div>

              <Field label="Mức độ ưu tiên">
                <select
                  name="priority"
                  defaultValue={product?.priority ?? "normal"}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="normal">Bình thường</option>
                  <option value="high">⭐️ Ưu tiên đẩy</option>
                </select>
              </Field>

              <Field label="Trạng thái">
                <select
                  name="status"
                  defaultValue={product?.status ?? "active"}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="active">🟢 Đang dùng</option>
                  <option value="draft">⚪️ Bản nháp</option>
                  <option value="archived">📦 Lưu trữ</option>
                </select>
              </Field>
            </div>
          </FormGroup>

          <FormGroup
            number="3"
            title="Dữ liệu cho AI"
            description="Càng rõ điểm mạnh và khách hàng phù hợp, AI càng tạo nội dung chính xác."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Điểm mạnh nổi bật">
                <textarea
                  name="strengths"
                  defaultValue={
                    product?.strengths ?? defaultValues?.strengths ?? ""
                  }
                  placeholder="Vd: Thành phần tự nhiên, hiệu quả sau 7 ngày..."
                  className={textareaClassName}
                />
              </Field>

              <Field label="Khách hàng phù hợp">
                <textarea
                  name="target_customer"
                  defaultValue={
                    product?.target_customer ??
                    defaultValues?.target_customer ??
                    ""
                  }
                  placeholder="Vd: Nữ 18-25 tuổi, da dầu mụn..."
                  className={textareaClassName}
                />
              </Field>

              <div className="lg:col-span-2">
                <Field label="Ghi chú thêm">
                  <textarea
                    name="notes"
                    defaultValue={product?.notes ?? defaultValues?.notes ?? ""}
                    placeholder="Thông tin nội bộ, không bắt buộc..."
                    className="min-h-[72px] w-full resize-none rounded-2xl border border-[#DDE6EC] bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-900 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                  />
                </Field>
              </div>
            </div>
          </FormGroup>
        </div>

        <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-slate-800">
                  Thay đổi sẽ được lưu vào Supabase
                </p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">
                  Dữ liệu của bạn luôn được bảo mật.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {!isEditing ? (
                <Link
                  href="/app/products?tab=all"
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
                >
                  Quay lại tất cả sản phẩm
                </Link>
              ) : null}

              <ProductSubmitButton isEditing={isEditing} />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

function FormGroup({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[22px] border border-slate-100 bg-slate-50/55 p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white shadow-sm shadow-emerald-600/20">
          {number}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black tracking-[-0.02em] text-slate-950">
              {title}
            </h3>
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClassName}>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}