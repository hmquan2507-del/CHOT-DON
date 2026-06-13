import { Lightbulb } from "lucide-react";

export default function ContentIdeasEmptyState() {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[20px] border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
          <Lightbulb className="h-8 w-8" />
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-slate-950">
          Chưa có ý tưởng nào
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
          Chọn kênh, sản phẩm và mục tiêu ở khung bên phải để AI tạo ý tưởng
          video ngắn đầu tiên.
        </p>
      </div>
    </section>
  );
}