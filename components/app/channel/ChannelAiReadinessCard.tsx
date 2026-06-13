import { CheckCircle2, Sparkles } from "lucide-react";
import type { ChannelProfile } from "@/app/app/channel/page";
import type { AIChannelPositioningResult } from "@/types/ai-channel-positioning";

type ChannelAiReadinessCardProps = {
  channel: ChannelProfile | null;
  result?: AIChannelPositioningResult | null;
};

function getReadinessScore(
  channel: ChannelProfile | null,
  result?: AIChannelPositioningResult | null,
) {
  const fields = [
    channel?.niche,
    channel?.goal,
    channel?.target_audience,
    channel?.content_style,
    channel?.desired_positioning,
  ];

  const base = Math.round(
    (fields.filter((item) => Boolean(item?.trim())).length / fields.length) * 76,
  );

  const aiBonus = result ? 10 : 0;
  return Math.min(92, Math.max(42, base + aiBonus + 10));
}

export default function ChannelAiReadinessCard({
  channel,
  result,
}: ChannelAiReadinessCardProps) {
  const score = getReadinessScore(channel, result);

  const checklist = [
    {
      label: "Định vị kênh rõ ràng và khác biệt",
      done: Boolean(result?.positioning_statement || channel?.desired_positioning),
    },
    {
      label: "Tệp khán giả mục tiêu cụ thể",
      done: Boolean(result?.target_audience_summary || channel?.target_audience),
    },
    {
      label: "Góc tiếp cận và giọng điệu nhất quán",
      done: Boolean(result?.channel_angle && result?.tone_of_voice),
    },
  ];

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.055)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-black text-slate-950">
              AI hiểu kênh của bạn
            </h2>
            <p className="mt-0.5 text-sm font-medium leading-6 text-slate-500">
              Mức độ sẵn sàng để AI gợi ý nội dung đúng hướng.
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-2xl font-black text-emerald-600">{score}%</p>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
            Rất tốt
          </span>
        </div>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="mt-4 space-y-2.5">
        {checklist.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 text-sm font-semibold text-slate-600"
          >
            <CheckCircle2
              className={`h-5 w-5 shrink-0 ${
                item.done ? "text-emerald-600" : "text-slate-300"
              }`}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}