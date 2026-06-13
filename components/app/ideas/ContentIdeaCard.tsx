import { Calendar, CheckCircle2, FileText, Sparkles } from "lucide-react";
import type { ContentIdea } from "@/types/content-idea";

type ContentIdeaCardProps = {
  idea: ContentIdea;
  channelName?: string;
  productName?: string;
};

function safeValue(value?: string | null, fallback = "Chưa cập nhật") {
  return value?.trim() || fallback;
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
    }).format(new Date(value));
  } catch {
    return "Không rõ ngày";
  }
}

function splitHashtags(value?: string | null) {
  return value?.split(/\s+/).filter(Boolean).slice(0, 8) ?? [];
}

export default function ContentIdeaCard({
  idea,
  channelName,
  productName,
}: ContentIdeaCardProps) {
  const hashtags = splitHashtags(idea.hashtags);

  return (
    <article className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
              {safeValue(idea.platform, "Platform")}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">
              {safeValue(idea.content_format, "Format")}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-black leading-snug tracking-[-0.03em] text-slate-950">
            {idea.title}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <LightbulbIcon />
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
        {safeValue(idea.hook)}
      </p>

      <div className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <div>
          <p className="text-xs font-extrabold text-slate-400">Góc khai thác</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            {safeValue(idea.angle)}
          </p>
        </div>

        <div>
          <p className="text-xs font-extrabold text-slate-400">CTA</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            {safeValue(idea.cta)}
          </p>
        </div>
      </div>

      {hashtags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {hashtags.map((hashtag) => (
            <span
              key={hashtag}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-500"
            >
              {hashtag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-400 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          {safeValue(channelName, "Kênh")}
        </div>

        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          {safeValue(productName, "Không gắn sản phẩm")}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(idea.created_at)}
        </div>

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {safeValue(idea.status, "ready_for_script")}
        </div>
      </div>

      <button
        type="button"
        disabled
        className="mt-5 inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-400"
      >
        Dùng để viết kịch bản — sắp có
      </button>
    </article>
  );
}

function LightbulbIcon() {
  return <Sparkles className="h-5 w-5" />;
}