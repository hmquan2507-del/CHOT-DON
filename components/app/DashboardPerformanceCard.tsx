import { ChevronDown } from "lucide-react";

const bars = [
  { views: 38, engagement: 52 },
  { views: 72, engagement: 94 },
  { views: 46, engagement: 66 },
  { views: 58, engagement: 76 },
  { views: 88, engagement: 100 },
  { views: 42, engagement: 54 },
  { views: 70, engagement: 86 },
];

const metrics = [
  {
    label: "Lượt xem",
    value: "18.2K",
    growth: "18.6%",
  },
  {
    label: "Tương tác",
    value: "2.4K",
    growth: "24.8%",
  },
  {
    label: "Chuyển đổi",
    value: "342",
    growth: "32.1%",
  },
  {
    label: "Doanh thu ước tính",
    value: "12.5M đ",
    growth: "28.3%",
  },
];

export default function DashboardPerformanceCard() {
  return (
    <article className="rounded-[24px] border border-[#DDEBE4] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-black tracking-[-0.03em] text-[#07111F]">
            Hiệu suất nội dung
          </h2>
        </div>

        <button className="flex h-10 items-center gap-2 rounded-2xl border border-[#DDEBE4] bg-white px-4 text-[12px] font-bold text-slate-500">
          7 ngày qua
          <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-5 text-[12px] font-bold text-slate-500">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Lượt xem
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          Tương tác
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
          Chuyển đổi
        </span>
      </div>

      <div className="relative mt-6 h-[210px] overflow-hidden rounded-[20px] border border-[#DDEBE4] bg-[#FBFDF9] px-5 pb-5 pt-6">
        <div className="absolute inset-x-5 top-6 space-y-[34px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-px bg-slate-200/70" />
          ))}
        </div>

        <svg
          viewBox="0 0 520 180"
          className="absolute inset-x-5 top-6 h-[160px] w-[calc(100%-40px)]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 118 C55 70, 95 88, 145 76 C200 64, 215 122, 270 98 C330 72, 335 18, 390 44 C445 70, 460 118, 520 88"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 flex h-[150px] items-end justify-between gap-4">
          {bars.map((bar, index) => (
            <div key={index} className="flex flex-1 items-end justify-center gap-1.5">
              <div
                className="w-3 rounded-t-full bg-gradient-to-t from-emerald-500 to-emerald-300"
                style={{ height: `${bar.views}%` }}
              />
              <div
                className="w-3 rounded-t-full bg-gradient-to-t from-blue-500 to-blue-300"
                style={{ height: `${bar.engagement}%` }}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-4 grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">
          {["26/05", "27/05", "28/05", "29/05", "30/05", "31/05", "01/06"].map(
            (day) => (
              <span key={day}>{day}</span>
            ),
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[18px] border border-[#DDEBE4] bg-white p-4"
          >
            <div className="text-[12px] font-bold text-slate-500">
              {metric.label}
            </div>
            <div className="mt-2 text-[20px] font-black tracking-[-0.04em] text-[#07111F]">
              {metric.value}
            </div>
            <div className="mt-1 text-[12px] font-black text-emerald-600">
              ↑ {metric.growth}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-5 text-[14px] font-black text-emerald-600">
        Xem báo cáo chi tiết →
      </button>
    </article>
  );
}