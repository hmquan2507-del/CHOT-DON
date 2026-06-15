import Link from "next/link";
import type { ComponentType } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Megaphone,
  Play,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react";
import { generateChannelPositioningAction } from "@/actions/channels";
import ChannelPositioningSubmitButton from "./ChannelPositioningSubmitButton";
import type {
  AIChannelPositioningResult,
  AIChannelPositioningStatus,
} from "@/types/ai-channel-positioning";

type ChannelPositioningAiCardProps = {
  channelId?: string | null;
  result?: AIChannelPositioningResult | null;
  generatedAt?: string | null;
  status?: AIChannelPositioningStatus | null;
  legacyAdvice?: string | null;
};

type IconComponent = ComponentType<{ className?: string }>;

function safeText(value?: string | null, fallback = "Chưa có dữ liệu.") {
  return value?.trim() || fallback;
}

function safeArray(items?: string[] | null) {
  return Array.isArray(items) ? items.filter(Boolean) : [];
}

function formatDate(value?: string | null) {
  if (!value) return null;

  try {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return null;
  }
}

function getStatusMessage(status?: AIChannelPositioningStatus | null) {
  if (status === "succeeded") {
    return {
      tone: "success" as const,
      text: "Định vị đã được cập nhật. AI đã hiểu kênh tốt hơn và sẵn sàng gợi ý nội dung phù hợp.",
    };
  }

  if (status === "missing_key") {
    return {
      tone: "warning" as const,
      text: "Chưa cấu hình AI API key. Bạn vẫn có thể hoàn thiện hồ sơ kênh thủ công.",
    };
  }

  if (status === "failed") {
    return {
      tone: "error" as const,
      text: "AI chưa thể tạo định vị lúc này. Vui lòng thử lại sau.",
    };
  }

  return null;
}

function confidenceLabel(confidence?: string) {
  if (confidence === "high") return "Tự tin cao";
  if (confidence === "medium") return "Tự tin vừa";
  return "Cần bổ sung dữ liệu";
}

function confidenceScore(confidence?: string) {
  if (confidence === "high") return 86;
  if (confidence === "medium") return 74;
  return 58;
}

function confidenceDescription(confidence?: string) {
  if (confidence === "high") {
    return "Hồ sơ và định vị đã khá rõ. Có thể dùng để tạo ý tưởng nội dung.";
  }

  if (confidence === "medium") {
    return "Định vị đã dùng được, nhưng vẫn nên bổ sung thêm sản phẩm, khách hàng hoặc phong cách nội dung.";
  }

  return "Cần bổ sung thêm thông tin kênh để AI gợi ý chính xác hơn.";
}

function PillList({ items }: { items?: string[] | null }) {
  const safeItems = safeArray(items);

  if (safeItems.length === 0) {
    return (
      <p className="text-sm font-medium leading-6 text-slate-400">
        Chưa có dữ liệu.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {safeItems.map((item) => (
        <span
          key={item}
          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({
  items,
  tone = "emerald",
}: {
  items?: string[] | null;
  tone?: "emerald" | "red" | "violet";
}) {
  const safeItems = safeArray(items);

  if (safeItems.length === 0) {
    return (
      <p className="text-sm font-medium leading-6 text-slate-400">
        Chưa có dữ liệu.
      </p>
    );
  }

  const iconClass =
    tone === "red"
      ? "text-red-500"
      : tone === "violet"
        ? "text-violet-500"
        : "text-emerald-600";

  return (
    <ul className="space-y-2.5">
      {safeItems.map((item) => (
        <li
          key={item}
          className="flex gap-2 text-sm font-semibold leading-6 text-slate-600"
        >
          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InsightCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | null;
  icon: IconComponent;
}) {
  return (
    <div className="h-full rounded-[22px] border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon className="h-[18px] w-[18px]" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>
          <p className="mt-2 line-clamp-5 text-sm font-semibold leading-6 text-slate-700">
            {safeText(value)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ChannelPositioningAiCard({
  channelId,
  result,
  generatedAt,
  status,
  legacyAdvice,
}: ChannelPositioningAiCardProps) {
  const statusMessage = getStatusMessage(status);
  const generatedDate = formatDate(generatedAt);
  const hasResult = Boolean(result);
  const score = confidenceScore(result?.confidence);

  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)]">
              <Bot className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">
                AI Strategy Report
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">
                Định vị kênh
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                Bản tóm tắt giúp AI hiểu kênh, tệp khách hàng, góc tiếp cận và
                cách tạo nội dung phù hợp hơn.
              </p>
            </div>
          </div>

          {result ? (
            <div className="flex shrink-0 items-center gap-3 rounded-[22px] border border-emerald-100 bg-white/80 p-3 shadow-sm">
              <div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  {confidenceLabel(result.confidence)}
                </span>
                <p className="mt-2 max-w-[260px] text-xs font-medium leading-5 text-slate-500">
                  {confidenceDescription(result.confidence)}
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700 ring-8 ring-emerald-100/70">
                {score}/100
              </div>
            </div>
          ) : null}
        </div>

        {statusMessage ? (
          <div
            className={`mt-5 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${
              statusMessage.tone === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : statusMessage.tone === "warning"
                  ? "border border-amber-200 bg-amber-50 text-amber-700"
                  : "border border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {statusMessage.tone === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        ) : hasResult ? (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Định vị của bạn đã sẵn sàng để tạo ý tưởng, script và CTA phù hợp
              với hướng kênh.
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-5 sm:p-6">
        {!hasResult ? (
          <div className="rounded-[22px] border border-dashed border-emerald-200 bg-emerald-50/50 p-5">
            <p className="text-sm font-semibold leading-6 text-slate-600">
              Chưa có định vị AI cho kênh này. Hãy tạo định vị sau khi hồ sơ
              kênh đã có ngách, mục tiêu, tệp khách hàng và phong cách nội dung.
            </p>

            {legacyAdvice ? (
              <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-medium leading-6 text-slate-500">
                <p className="font-extrabold text-slate-700">Gợi ý cũ</p>
                <p className="mt-1">{legacyAdvice}</p>
              </div>
            ) : null}
          </div>
        ) : null}

        {result ? (
          <div className="space-y-4">
            <div className="rounded-[22px] border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-white p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <Target className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                    Định vị chính
                  </p>
                  <p className="mt-2 text-[15px] font-black leading-7 tracking-[-0.01em] text-slate-950">
                    {safeText(result.positioning_statement)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-3">
              <InsightCard
                label="Tệp khán giả"
                value={result.target_audience_summary}
                icon={UserRoundCheck}
              />

              <InsightCard
                label="Góc tiếp cận"
                value={result.channel_angle}
                icon={Megaphone}
              />

              <InsightCard
                label="Giọng điệu"
                value={result.tone_of_voice}
                icon={Sparkles}
              />
            </div>

            <div className="rounded-[22px] border border-slate-100 bg-white p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    Trụ cột nội dung
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Các hướng nội dung chính nên bám theo khi tạo video.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                  {safeArray(result.content_pillars).length} trụ cột
                </span>
              </div>

              <div className="mt-3">
                <PillList items={result.content_pillars} />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Clock3 className="h-4 w-4" />
            <span>
              {generatedDate ? `Tạo lúc ${generatedDate}` : "Chưa tạo định vị"}
            </span>
          </div>

          {channelId ? (
            <form action={generateChannelPositioningAction.bind(null, channelId)}>
              <ChannelPositioningSubmitButton hasResult={hasResult} />
            </form>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-extrabold text-slate-400 opacity-60"
            >
              Tạo định vị bằng AI
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
export function ChannelStarterIdeasCard({
  result,
}: {
  result?: AIChannelPositioningResult | null;
}) {
  const ideas = safeArray(result?.starter_video_ideas).slice(0, 5);

  return (
    <section className="flex h-full max-h-[640px] min-h-[520px] flex-col rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)] sm:p-6">
      <div className="flex shrink-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Lightbulb className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
            Ý tưởng khởi đầu
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            Các hướng video đầu tiên dựa trên định vị kênh hiện tại.
          </p>
        </div>
      </div>

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="space-y-3">
          {ideas.length > 0 ? (
            ideas.map((idea, index) => (
              <article
                key={`${idea}-${index}`}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-all duration-200 ease-out hover:border-emerald-100 hover:bg-emerald-50/40"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-emerald-700 ring-1 ring-emerald-100">
                        Gợi ý #{index + 1}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-slate-400 ring-1 ring-slate-100">
                        Video ngắn
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm font-black leading-6 text-slate-900">
                      {idea}
                    </p>

                    <p className="mt-1.5 text-xs font-medium leading-5 text-slate-500">
                      Có thể chuyển thành ý tưởng nội dung ở bước tiếp theo.
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm font-semibold leading-6 text-slate-500">
              Chưa có ý tưởng khởi đầu. Hãy tạo định vị bằng AI trước.
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 shrink-0 rounded-[22px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
            <Sparkles className="h-4.5 w-4.5" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-black leading-6 text-emerald-950">
              Muốn biến định vị này thành ý tưởng nội dung?
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-emerald-700/80">
              Chuyển sang module Ý tưởng để AI tạo nội dung bám theo định vị.
            </p>
          </div>
        </div>

        <Link
          href="/app/ideas?tab=generate"
          className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-xs font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
        >
          Tạo ý tưởng tiếp theo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
export function ChannelStrategyCards({
  result,
}: {
  result?: AIChannelPositioningResult | null;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <section className="rounded-[24px] border border-red-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-red-400" />
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Lỗi nên tránh
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Những điểm dễ làm kênh bị loãng.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <BulletList items={result?.mistakes_to_avoid} tone="red" />
        </div>
      </section>

      <section className="rounded-[24px] border border-violet-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-violet-400" />
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Chiến lược CTA
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Cách dẫn người xem sang hành động.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
          {safeText(
            result?.cta_strategy,
            "Chưa có dữ liệu. Hãy tạo định vị bằng AI trước.",
          )}
        </p>
      </section>

      <section className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-emerald-400" />
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Bước tiếp theo
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Việc nên làm ngay sau khi định vị.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <BulletList items={result?.next_steps} />
        </div>
      </section>
    </div>
  );
}

export default ChannelPositioningAiCard;