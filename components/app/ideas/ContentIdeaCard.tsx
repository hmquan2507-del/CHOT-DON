import type { ReactNode } from "react";
import {
  Archive,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Flag,
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
      day: "2-digit",
      month: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Không rõ";
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
      label: "Đã lưu trữ",
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
      label: "Cao",
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
  const visibleHashtags = hashtags.slice(0, 3);
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
    <article className="rounded-[18px] border border-slate-200/80 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.025)] transition-all duration-200 ease-out hover:border-emerald-100 hover:shadow-[0_12px_26px_rgba(15,23,42,0.045)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <Badge>{safeValue(idea.platform, "Platform")}</Badge>
          <Badge tone="slate">{safeValue(idea.content_format, "Format")}</Badge>
          <Badge tone="violet">{idea.source_type === "ai" ? "AI" : "Thủ công"}</Badge>
        </div>

        {!isArchived ? (
          <form action={archiveContentIdeaAction.bind(null, idea.id)}>
            <button
              type="submit"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
              aria-label="Lưu trữ ý tưởng"
              title="Lưu trữ"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">
            <Archive className="h-4 w-4" />
          </div>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 text-[15px] font-black leading-6 tracking-[-0.02em] text-slate-950">
        {safeValue(idea.title, "Ý tưởng chưa đặt tên")}
      </h3>

      <p className="mt-1.5 line-clamp-1 text-sm font-medium leading-6 text-slate-500">
        {safeValue(idea.hook)}
      </p>

      <div className="mt-3 grid gap-1.5 text-xs font-bold text-slate-500 sm:grid-cols-3">
        <MetaItem icon={Tag} text={safeValue(productName, "Không gắn SP")} />
        <MetaItem icon={Flag} text={safeValue(idea.goal, "Chưa có mục tiêu")} />
        <MetaItem icon={Calendar} text={formatDate(idea.created_at)} />
      </div>

      <div className="mt-3 space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
        <SummaryRow label="Góc" value={safeValue(idea.angle)} />
        <SummaryRow label="CTA" value={safeValue(idea.cta)} compact />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
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

      <div className="mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3">
        {isDraft ? (
          <form action={markContentIdeaReadyAction.bind(null, idea.id)}>
            <button
              type="submit"
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-3 text-xs font-extrabold text-white shadow-[0_8px_18px_rgba(16,185,129,0.16)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_12px_24px_rgba(16,185,129,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Sẵn sàng
            </button>
          </form>
        ) : isReady ? (
          <button
            type="button"
            disabled
            className="inline-flex h-9 cursor-not-allowed items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-xs font-extrabold text-slate-400 opacity-60"
          >
            <Clock className="h-3.5 w-3.5" />
            Viết kịch bản — sắp có
          </button>
        ) : null}

        {!isArchived ? (
          <form action={archiveContentIdeaAction.bind(null, idea.id)}>
            <button
              type="submit"
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              <Archive className="h-3.5 w-3.5" />
              Lưu trữ
            </button>
          </form>
        ) : null}
      </div>
    </article>
  );
}

function SummaryRow({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-2">
      <span className="text-xs font-black text-emerald-700">{label}</span>
      <p
        className={[
          "text-xs font-semibold leading-5 text-slate-600",
          compact ? "line-clamp-1" : "line-clamp-2",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
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
      className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${className}`}
    >
      {children}
    </span>
  );
}

function MetaItem({
  icon: Icon,
  text,
}: {
  icon: typeof FileText;
  text: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
      <span className="truncate">{text}</span>
    </div>
  );

}

