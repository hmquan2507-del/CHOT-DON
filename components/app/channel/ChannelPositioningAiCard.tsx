import type { ComponentType } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Megaphone,
  Play,
  RefreshCw,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react";
import { generateChannelPositioningAction } from "@/actions/channels";
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
      text: "Định vị của bạn rất rõ ràng! AI đã hiểu kênh và sẵn sàng gợi ý nội dung phù hợp.",
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

function PillList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm font-medium leading-6 text-slate-400">
        Chưa có dữ liệu.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700"
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
  items: string[];
  tone?: "emerald" | "red" | "violet";
}) {
  if (items.length === 0) {
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
      {items.map((item) => (
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

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: IconComponent;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-extrabold text-slate-400">{label}</p>
          <p className="mt-1 line-clamp-3 text-sm font-semibold leading-6 text-slate-700">
            {value || "Chưa có dữ liệu."}
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
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Bot className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
              AI định vị kênh
            </h2>
            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Bản tóm tắt định vị giúp AI tạo ý tưởng, script và CTA bám đúng
              hướng kênh của bạn.
            </p>
          </div>
        </div>

        {result ? (
          <div className="flex shrink-0 items-center gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              {confidenceLabel(result.confidence)}
            </span>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700 ring-8 ring-emerald-100/70">
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
            Định vị của bạn rất rõ ràng! AI đã hiểu kênh và sẵn sàng gợi ý nội
            dung phù hợp.
          </span>
        </div>
      ) : null}

      {!hasResult ? (
        <div className="mt-5 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-5">
          <p className="text-sm font-semibold leading-6 text-slate-600">
            Chưa có định vị AI cho kênh này. Hãy tạo định vị sau khi hồ sơ kênh
            đã có ngách, mục tiêu, tệp khách hàng và phong cách nội dung.
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
        <div className="mt-5 space-y-4">
          <InfoRow
            label="Định vị kênh"
            value={result.positioning_statement}
            icon={Target}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow
              label="Tệp khán giả mục tiêu"
              value={result.target_audience_summary}
              icon={UserRoundCheck}
            />

            <InfoRow
              label="Góc tiếp cận"
              value={result.channel_angle}
              icon={Megaphone}
            />
          </div>

          <InfoRow
            label="Giọng điệu"
            value={result.tone_of_voice}
            icon={Sparkles}
          />

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-sm font-black text-slate-950">
              Trụ cột nội dung
            </p>
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
            <button
              type="submit"
             className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            >
              {hasResult ? (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Tạo lại định vị
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Tạo định vị bằng AI
                </>
              )}
            </button>
          </form>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-extrabold text-slate-400"
          >
            Tạo định vị bằng AI
          </button>
        )}
      </div>
    </section>
  );
}

export function ChannelStarterIdeasCard({
  result,
}: {
  result?: AIChannelPositioningResult | null;
}) {
  const ideas = result?.starter_video_ideas?.slice(0, 4) ?? [];

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
            Ý tưởng khởi đầu
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            Một vài hướng video đầu tiên dựa trên định vị kênh hiện tại.
          </p>

          <div className="mt-5 space-y-3">
            {ideas.length > 0 ? (
              ideas.map((idea) => (
                <div
                  key={idea}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <Play className="h-4 w-4 fill-current" />
                    </div>

                    <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-700">
                      {idea}
                    </p>
                  </div>

                  <button
                    type="button"
                   className="hidden h-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] sm:inline-flex"
                  >
                    Xem gợi ý
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm font-semibold leading-6 text-slate-500">
                Chưa có ý tưởng khởi đầu. Hãy tạo định vị bằng AI trước.
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 lg:w-[230px]">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-emerald-900">
              AI sẽ tạo thêm ý tưởng dựa trên định vị kênh của bạn.
            </p>
          </div>

          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-3 text-xs font-extrabold text-white transition hover:bg-emerald-700"
          >
            Tạo ý tưởng tiếp theo
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
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
    <div className="grid gap-6 lg:grid-cols-3">
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
          <BulletList items={result?.mistakes_to_avoid ?? []} tone="red" />
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
          {result?.cta_strategy || "Chưa có dữ liệu. Hãy tạo định vị bằng AI trước."}
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
          <BulletList items={result?.next_steps ?? []} />
        </div>
      </section>
    </div>
  );
}

export default ChannelPositioningAiCard;