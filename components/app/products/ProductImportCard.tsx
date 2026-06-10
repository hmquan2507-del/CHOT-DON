"use client";

import { useState } from "react";
import { ExternalLink, FileText, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductForm from "./ProductForm";
import type { ProductFormDefaultValues } from "./ProductForm";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

type ProductImportCardProps = {
  channel: ChannelSummary | null;
};

const inputClassName =
  "h-12 w-full rounded-2xl border border-[#DDE6EC] bg-white px-4 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 hover:border-slate-300";

const textareaClassName =
  "min-h-[100px] w-full resize-none rounded-2xl border border-[#DDE6EC] bg-white px-4 py-3 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 hover:border-slate-300";

export default function ProductImportCard({ channel }: ProductImportCardProps) {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [error, setError] = useState("");

  function handleOpenSheet() {
    if (!url.trim()) {
      setError("Vui lòng nhập link sản phẩm.");
      return;
    }

    setError("");
    setSheetOpen(true);
  }

  function handleCloseSheet() {
    setSheetOpen(false);
  }

  const defaultValues: ProductFormDefaultValues = {
    affiliate_url: url.trim(),
    notes: notes.trim() || undefined,
  };

  return (
    <>
      <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50">
            <ExternalLink className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-[17px] font-black tracking-[-0.02em] text-slate-950">
              Nhập sản phẩm bằng link
            </h2>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500">
              Dán link sản phẩm hoặc link affiliate để tạo nhanh bản nháp sản phẩm.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-[13px] font-extrabold text-slate-700">
              Link sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="https://..."
              className={inputClassName}
            />
            {error && (
              <p className="mt-1.5 text-[13px] font-semibold text-red-500">
                {error}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-extrabold text-slate-700">
              Ghi chú nhanh
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi chú nhanh về sản phẩm, ưu điểm hoặc tệp khách hàng nếu có..."
              className={textareaClassName}
            />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleOpenSheet}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700 hover:-translate-y-0.5"
            >
              <FileText className="h-5 w-5" />
              Tạo bản nháp sản phẩm
            </button>

            <p className="text-center text-[12px] font-medium text-slate-400">
              Bạn có thể chỉnh lại toàn bộ thông tin trước khi lưu.
            </p>
          </div>
        </div>
      </section>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full border-slate-200/80 bg-white p-0 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:max-w-xl"
        >
          <SheetHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <SheetTitle className="text-[19px] font-black tracking-[-0.02em] text-slate-950">
                  Tạo sản phẩm từ link
                </SheetTitle>
                <p className="mt-0.5 text-[13px] font-medium text-slate-500">
                  Kiểm tra và bổ sung thông tin trước khi lưu
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseSheet}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetHeader>

          <div className="overflow-y-auto px-6 py-6">
            <ProductForm
              channel={channel}
              defaultValues={defaultValues}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
