import Link from "next/link";
import { Lightbulb, Plus } from "lucide-react";

type ContentIdeasEmptyStateProps = {
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ContentIdeasEmptyState({
  title = "Chưa có ý tưởng nào",
  description = "Chọn kênh, sản phẩm và mục tiêu để AI tạo ý tưởng video ngắn đầu tiên.",
  ctaHref = "/app/ideas?tab=generate",
  ctaLabel = "Tạo ý tưởng bằng AI",
}: ContentIdeasEmptyStateProps) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.045)]">
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[20px] border border-dashed border-emerald-200 bg-emerald-50/45 px-6 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
          <Lightbulb className="h-7 w-7" />
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-slate-950">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
          {description}
        </p>

        {ctaHref ? (
          <Link
            href={ctaHref}
            className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white transition-all duration-200 ease-out hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
