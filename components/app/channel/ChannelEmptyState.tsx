import { Sparkles, Target, CheckCircle2 } from "lucide-react";

export function ChannelEmptyState() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Target className="h-7 w-7" />
      </div>

      <h2 className="mb-2 text-xl font-bold text-slate-900">
        Tạo hồ sơ kênh đầu tiên
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-slate-600">
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
