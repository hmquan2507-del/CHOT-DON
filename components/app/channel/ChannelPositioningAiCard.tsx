import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Clock3,
  Megaphone,
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

function formatDate(value?: string | null) {
  if (!value) {
    return null;
  }

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
      text: "AI đã tạo định vị kênh mới. Hãy kiểm tra và dùng làm nền cho nội dung tiếp theo.",
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

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm font-medium leading-6 text-slate-400">
        Chưa có dữ liệu.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm font-medium leading-6 text-slate-600">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBlock({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Target;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-extrabold text-slate-400">{label}</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
            {value || "Chưa có dữ liệu."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChannelPositioningAiCard({
  channelId,
  result,
  generatedAt,
  status,
  legacyAdvice,
}: ChannelPositioningAiCardProps) {
  const statusMessage = getStatusMessage(status);
  const generatedDate = formatDate(generatedAt);
  const hasResult = Boolean(result);

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Bot className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-950">
              AI định vị kênh
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
              Tạo định vị rõ ràng để các bước ý tưởng, script và lịch nội dung
              sau này bám đúng hướng.
            </p>
          </div>
        </div>

        {result ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Confidence: {result.confidence}
          </span>
        ) : null}
      </div>

      {statusMessage ? (
        <div
          className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${
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
          <InfoBlock
            label="Định vị kênh"
            value={result.positioning_statement}
            icon={Target}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBlock
              label="Tệp khán giả mục tiêu"
              value={result.target_audience_summary}
              icon={UserRoundCheck}
            />

            <InfoBlock
              label="Góc tiếp cận kênh"
              value={result.channel_angle}
              icon={Megaphone}
            />
          </div>

          <InfoBlock
            label="Giọng điệu nên dùng"
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

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <p className="text-sm font-black text-slate-950">
                Ý tưởng video khởi đầu
              </p>
              <div className="mt-3">
                <BulletList items={result.starter_video_ideas} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <p className="text-sm font-black text-slate-950">
                Lỗi nên tránh
              </p>
              <div className="mt-3">
                <BulletList items={result.mistakes_to_avoid} />
              </div>
            </div>
          </div>

          <InfoBlock
            label="Chiến lược CTA"
            value={result.cta_strategy}
            icon={Megaphone}
          />

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-sm font-black text-slate-950">
              Bước tiếp theo
            </p>
            <div className="mt-3">
              <BulletList items={result.next_steps} />
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
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700"
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