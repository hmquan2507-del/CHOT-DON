import { Brain, CheckCircle2 } from "lucide-react";

export function ChannelAiReadinessCard() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            AI hiểu kênh của bạn
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-emerald-600">92%</span>
          <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Rất tốt
          </span>
        </div>
      </div>

      <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]"></div>
      </div>

      <ul className="mb-6 space-y-3.5">
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-[14px] font-medium text-slate-700">
            Gợi ý nội dung đúng ngách
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-[14px] font-medium text-slate-700">
            Viết script sát mục tiêu bán hàng
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-[14px] font-medium text-slate-700">
            Lập kế hoạch 30 ngày phù hợp người mới
          </span>
        </li>
      </ul>

      <div className="rounded-2xl border border-emerald-100 bg-[#F3FBF5] p-5 text-[13px] leading-relaxed text-[#047857]">
        Hồ sơ chi tiết giúp AI hiểu rõ kênh của bạn hơn, từ đó tạo nội dung sát tệp khách hàng và mục tiêu kinh doanh.
      </div>
    </div>
  );
}
