import { PackagePlus } from "lucide-react";

export default function ProductEmptyState() {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[20px] border border-dashed border-emerald-200 bg-[linear-gradient(180deg,rgba(16,185,129,0.05)_0%,rgba(255,255,255,0.9)_100%)] px-6 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
          <PackagePlus className="h-8 w-8" />
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-slate-950">
          Chưa có sản phẩm nào
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
          Thêm sản phẩm đầu tiên để hệ thống bắt đầu phân tích, gợi ý ưu tiên
          và chuẩn bị dữ liệu cho ý tưởng nội dung sau này.
        </p>
      </div>
    </section>
  );
}