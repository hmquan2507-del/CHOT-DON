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
          <span className="text-xl font-bold text-emerald-600">92%</span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            Rất tốt
          </span>
        </div>
      </div>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[92%] rounded-full bg-emerald-500"></div>
      </div>

      <ul className="mb-6 space-y-3">
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm text-slate-700">
            Gợi ý nội dung đúng ngách
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm text-slate-700">
            Viết script sát mục tiêu bán hàng
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm text-slate-700">
            Lập kế hoạch 30 ngày phù hợp người mới
          </span>
        </li>
      </ul>

      <div className="rounded-2xl bg-[#F3FBF5] p-4 text-sm leading-relaxed text-[#047857]">
        Hồ sơ chi tiết giúp AI hiểu rõ kênh của bạn hơn, từ đó tạo nội dung sát tệp khách hàng và mục tiêu kinh doanh.
      </div>
    </div>
  );
}
