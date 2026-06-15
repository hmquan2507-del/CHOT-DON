import type { ReactNode } from "react";
import {
  Archive,
  Calendar,
  CheckCircle2,
  FileText,
  Flag,
  Sparkles,
  Tag,
} from "lucide-react";
import {
  archiveContentIdeaAction,
  markContentIdeaReadyAction,
} from "@/actions/content-ideas";
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
  return value?.split(/\s+/).filter(Boolean) ?? [];
}

function getStatusMeta(status?: string | null) {
  if (status === "ready" || status === "ready_for_script") {
    return {
      label: "Sẵn sàng",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
  }

  if (status === "archived") {
    return {
      label: "Lưu trữ",
      className: "bg-slate-100 text-slate-500 border-slate-200",
    };
  }

  if (status === "scheduled") {
    return {
      label: "Đã lên lịch",
      className: "bg-amber-50 text-amber-700 border-amber-100",
    };
  }

  return {
    label: "Nháp",
    className: "bg-sky-50 text-sky-700 border-sky-100",
  };
}

function getPriorityMeta(priority?: string | null) {
  if (priority === "high") {
    return {
      label: "Ưu tiên cao",
      className: "bg-red-50 text-red-600 border-red-100",
    };
  }

  if (priority === "low") {
    return {
      label: "Thấp",
      className: "bg-slate-50 text-slate-500 border-slate-200",
    };
  }

  return {
    label: "Bình thường",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
}

export default function ContentIdeaCard({
  idea,
  channelName,
  productName,
}: ContentIdeaCardProps) {
  const hashtags = splitHashtags(idea.hashtags);
  const visibleHashtags = hashtags.slice(0, 4);
  const hiddenHashtagCount = Math.max(
    0,
    hashtags.length - visibleHashtags.length,
  );

  const statusMeta = getStatusMeta(idea.status);
  const priorityMeta = getPriorityMeta(idea.priority);

  const isDraft = !idea.status || idea.status === "draft";
  const isReady = idea.status === "ready" || idea.status === "ready_for_script";
  const isArchived = idea.status === "archived";

  return (
    <article className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge>{safeValue(idea.platform, "Platform")}</Badge>
            <Badge tone="slate">
              {safeValue(idea.content_format, "Format")}
            </Badge>
            <Badge tone="violet">
              {idea.source_type === "ai" ? "AI" : "Manual"}
            </Badge>
          </div>

          <h3 className="mt-3 line-clamp-2 text-base font-black leading-snug tracking-[-0.03em] text-slate-950">
            {safeValue(idea.title, "Ý tưởng chưa đặt tên")}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
        {safeValue(idea.hook)}
      </p>

      <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
        <p className="text-xs font-extrabold text-slate-400">Góc khai thác</p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-slate-700">
          {safeValue(idea.angle)}
        </p>
      </div>

      <div className="mt-3 grid gap-2 text-xs font-bold text-slate-500 sm:grid-cols-2">
        <MetaItem
          icon={Tag}
          text={safeValue(productName, "Không gắn sản phẩm")}
        />
        <MetaItem icon={Flag} text={safeValue(idea.goal, "Chưa có mục tiêu")} />
        <MetaItem icon={Calendar} text={formatDate(idea.created_at)} />
        <MetaItem icon={FileText} text={safeValue(channelName, "Kênh")} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${statusMeta.className}`}
        >
          {statusMeta.label}
        </span>

        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${priorityMeta.className}`}
        >
          {priorityMeta.label}
        </span>
      </div>

      <div className="mt-3 rounded-2xl border border-slate-100 bg-white p-3">
        <p className="text-xs font-extrabold text-slate-400">CTA</p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-slate-700">
          {safeValue(idea.cta)}
        </p>
      </div>

      {hashtags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleHashtags.map((hashtag) => (
            <span
              key={hashtag}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500"
            >
              {hashtag}
            </span>
          ))}

          {hiddenHashtagCount > 0 ? (
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
              +{hiddenHashtagCount}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {isDraft ? (
          <form
            action={markContentIdeaReadyAction.bind(null, idea.id)}
            className="flex-1"
          >
            <button
              type="submit"
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-3 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(16,185,129,0.18)] transition-all duration-200 ease-out hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Đánh dấu sẵn sàng
            </button>
          </form>
        ) : isReady ? (
          <button
            type="button"
            disabled
            className="inline-flex h-10 flex-1 cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-3 text-xs font-extrabold text-slate-400 opacity-70"
          >
            Dùng để viết kịch bản — sắp có
          </button>
        ) : null}

        {!isArchived ? (
          <form
            action={archiveContentIdeaAction.bind(null, idea.id)}
            className="sm:w-[110px]"
          >
            <button
              type="submit"
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <Archive className="h-4 w-4" />
              Lưu trữ
            </button>
          </form>
        ) : null}
      </div>
    </article>
  );
}

function Badge({
  children,
  tone = "emerald",
}: {
  children: ReactNode;
  tone?: "emerald" | "slate" | "violet";
}) {
  const className = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    slate: "bg-slate-50 text-slate-500 border-slate-200",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
  }[tone];

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${className}`}
    >
      {children}
    </span>
  );
}

function MetaItem({
  icon: Icon,
  text,
}: {
  icon: typeof Calendar;
  text: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
      <span className="truncate">{text}</span>
    </div>
  );
}
