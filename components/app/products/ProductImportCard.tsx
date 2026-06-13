"use client";

import { useState, useCallback } from "react";
import {
  ExternalLink,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductForm from "./ProductForm";
import type { ProductFormDefaultValues } from "./ProductForm";
import {
  extractProductMetadata,
  enrichProductImport,
} from "@/actions/product-imports";
import type {
  EnrichProductImportResult,
  ExtractProductMetadataResult,
} from "@/actions/product-imports";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

type ProductImportCardProps = {
  channel: ChannelSummary | null;
};

type FeedbackMessage = {
  text: string;
  type: "success" | "info" | "warning";
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
  const [isExtracting, setIsExtracting] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [extractionMessage, setExtractionMessage] =
    useState<FeedbackMessage | null>(null);
  const [enrichmentMessage, setEnrichmentMessage] =
    useState<FeedbackMessage | null>(null);
  const [extractedDefaults, setExtractedDefaults] =
    useState<ProductFormDefaultValues | null>(null);

  const handleExtract = useCallback(async () => {
    setError("");
    setExtractionMessage(null);
    setEnrichmentMessage(null);
    setExtractedDefaults(null);

    if (!url.trim()) {
      setError("Vui lòng nhập link sản phẩm.");
      return;
    }

    setIsExtracting(true);

    try {
      const result: ExtractProductMetadataResult = await extractProductMetadata(
        url.trim(),
        notes.trim(),
      );

      setExtractionMessage({
        text: result.message,
        type: result.success ? "success" : "info",
      });

      setExtractedDefaults(result.defaultValues);
      setSheetOpen(true);
    } catch {
      setExtractionMessage({
        text: "Đã có lỗi xảy ra. Vui lòng thử lại.",
        type: "info",
      });

      setExtractedDefaults({
        affiliate_url: url.trim(),
        notes: notes.trim() || undefined,
      });

      setSheetOpen(true);
    } finally {
      setIsExtracting(false);
    }
  }, [url, notes]);

  const handleAIEnrich = useCallback(async () => {
    setError("");
    setEnrichmentMessage(null);

    if (!url.trim()) {
      setError("Vui lòng nhập link sản phẩm.");
      return;
    }

    setIsEnriching(true);

    try {
      let baseDefaults = extractedDefaults;

      if (!baseDefaults) {
        const metadataResult = await extractProductMetadata(
          url.trim(),
          notes.trim(),
        );

        baseDefaults = metadataResult.defaultValues;

        setExtractionMessage({
          text: metadataResult.message,
          type: metadataResult.success ? "success" : "info",
        });
      }

      const result: EnrichProductImportResult = await enrichProductImport(
        url.trim(),
        notes.trim(),
        baseDefaults,
      );

      setExtractedDefaults(result.defaultValues);

      if (result.success) {
        setEnrichmentMessage({
          text: "AI đã gợi ý xong. Vui lòng kiểm tra trước khi lưu.",
          type: "success",
        });
      } else {
        setEnrichmentMessage({
          text: result.message,
          type: result.status === "missing_key" ? "warning" : "info",
        });
      }

      setSheetOpen(true);
    } catch {
      setEnrichmentMessage({
        text: "AI chưa thể gợi ý. Bạn vẫn có thể nhập thủ công.",
        type: "info",
      });

      setExtractedDefaults(
        extractedDefaults ?? {
          affiliate_url: url.trim(),
          notes: notes.trim() || undefined,
        },
      );

      setSheetOpen(true);
    } finally {
      setIsEnriching(false);
    }
  }, [url, notes, extractedDefaults]);

  function handleCloseSheet() {
    setSheetOpen(false);
  }

  const defaultValues: ProductFormDefaultValues = extractedDefaults ?? {
    affiliate_url: url.trim(),
    notes: notes.trim() || undefined,
  };

  const helperBullets = [
    "Tự động lấy tên, mô tả từ link sản phẩm",
    "AI có thể gợi ý ngách, điểm mạnh và khách hàng phù hợp",
    "Tạo bản nháp — bạn chỉnh sửa trước khi lưu",
  ];

  const isBusy = isExtracting || isEnriching;

  function renderFeedbackMessage(message: FeedbackMessage) {
    const className =
      message.type === "success"
        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
        : message.type === "warning"
          ? "bg-amber-50 text-amber-700 border border-amber-200/60"
          : "bg-slate-50 text-slate-600 border border-slate-200/70";

    return (
      <div
        className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-[13px] font-semibold ${className}`}
      >
        {message.type === "success" ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        ) : (
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        )}
        <span>{message.text}</span>
      </div>
    );
  }

  return (
    <>
      <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex shrink-0 flex-col lg:w-[340px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100/50 bg-emerald-50 text-emerald-600 shadow-sm">
              <ExternalLink className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
              Nhập sản phẩm bằng link
            </h2>

            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
              Dán link sản phẩm hoặc link affiliate để tạo nhanh bản nháp sản
              phẩm.
            </p>

            <ul className="mt-5 space-y-3">
              {helperBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 space-y-5">
            <div>
              <label className="mb-2 block text-[13px] font-extrabold text-slate-700">
                Link sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  if (error) setError("");
                }}
                disabled={isBusy}
                placeholder="https://shopee.vn/... hoặc link affiliate..."
                className={inputClassName}
              />
              {error ? (
                <p className="mt-1.5 text-[13px] font-semibold text-red-500">
                  {error}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-extrabold text-slate-700">
                Ghi chú nhanh
              </label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                disabled={isBusy}
                placeholder="Ghi chú nhanh về sản phẩm, ưu điểm hoặc tệp khách hàng nếu có..."
                className={textareaClassName}
              />
            </div>

            <div className="grid gap-3 pt-1 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleExtract}
                disabled={isBusy}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Đang lấy thông tin...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    Lấy thông tin sản phẩm
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleAIEnrich}
                disabled={isBusy}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 text-[15px] font-extrabold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isEnriching ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    AI đang gợi ý thông tin...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    AI gợi ý thông tin bán hàng
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3">
              {extractionMessage ? renderFeedbackMessage(extractionMessage) : null}
              {enrichmentMessage ? renderFeedbackMessage(enrichmentMessage) : null}
            </div>

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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100/50 bg-emerald-50 text-emerald-600 shadow-sm">
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
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetHeader>

          <div className="overflow-y-auto px-6 py-6">
            <ProductForm channel={channel} defaultValues={defaultValues} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}