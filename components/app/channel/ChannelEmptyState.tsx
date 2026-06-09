import { Sparkles, Target, CheckCircle2 } from "lucide-react";

export function ChannelEmptyState() {
  return (
    <div className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100/50 text-emerald-600 shadow-sm">
        <Target className="h-8 w-8" />
      </div>

      <h2 className="mb-2 text-xl font-bold text-slate-900">
        Tạo hồ sơ kênh đầu tiên
      </h2>
      <p className="mb-6 text-[15px] leading-relaxed text-slate-600">
        AI cần hồ sơ kênh để tạo ý tưởng, script và lịch nội dung chính xác hơn.
      </p>

      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-sm text-slate-700">
            Gợi ý nội dung sát với ngách và mục tiêu của bạn.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-sm text-slate-700">
            Kịch bản bán hàng phù hợp với tệp khách hàng.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-sm text-slate-700">
            Lịch đăng bài tối ưu cho kinh nghiệm hiện tại.
          </span>
        </li>
      </ul>
    </div>
  );
}
