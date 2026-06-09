import { CheckCircle2, Info, Sparkles } from "lucide-react";
import type { ChannelProfile } from "@/app/app/channel/page";

type ChannelAiReadinessCardProps = {
  channel: ChannelProfile | null;
};

export default function ChannelAiReadinessCard({
  channel,
}: ChannelAiReadinessCardProps) {
  const hasNiche = Boolean(channel?.niche?.trim());
  const hasGoal = Boolean(channel?.goal?.trim());

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Sparkles className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-950">
              AI hiểu kênh của bạn
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
              AI đã nắm bắt tốt định vị và mục tiêu kênh của bạn.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <p className="text-2xl font-black text-emerald-600">92%</p>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
              Rất tốt
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          {hasNiche ? "Ngách đã rõ ràng" : "Cần bổ sung ngách kênh"}
        </div>

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          {hasGoal ? "Mục tiêu bán hàng rõ" : "Cần bổ sung mục tiêu kênh"}
        </div>

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
          <Info className="h-5 w-5 text-orange-500" />
          Cần bổ sung dữ liệu hiệu suất để gợi ý sâu hơn
        </div>
      </div>
    </section>
  );
}
