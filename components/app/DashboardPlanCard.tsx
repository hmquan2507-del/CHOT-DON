import { CalendarDays, Check, MoreHorizontal, Square } from "lucide-react";

const days = [
  { day: "26", label: "", active: false },
  { day: "27", label: "T3", active: true },
  { day: "28", label: "T4", active: false },
  { day: "29", label: "T5", active: false },
  { day: "30", label: "T6", active: false },
  { day: "31", label: "T7", active: false },
  { day: "01", label: "CN", active: false },
  { day: "02", label: "T2", active: false },
  { day: "03", label: "T3", active: false },
  { day: "04", label: "T4", active: false },
];

const tasks = [
  {
    title: "Viết script video",
    desc: "Serum Vitamin C có thật sự hiệu quả?",
    status: "Ý tưởng",
    statusClass: "bg-purple-50 text-purple-600",
    date: "26/05",
    checked: false,
  },
  {
    title: "Quay & dựng video",
    desc: "Review chi tiết + before/after",
    status: "Đang làm",
    statusClass: "bg-amber-50 text-amber-600",
    date: "27/05",
    checked: true,
  },
  {
    title: "Đăng video + SEO",
    desc: "Tối ưu tiêu đề, mô tả, hashtag",
    status: "Đã lên lịch",
    statusClass: "bg-emerald-50 text-emerald-600",
    date: "28/05",
    checked: false,
  },
];

export default function DashboardPlanCard() {
  return (
    <article className="rounded-[24px] border border-[#DDEBE4] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-black tracking-[-0.03em] text-[#07111F]">
            Kế hoạch 30 ngày
          </h2>
        </div>

        <button className="rounded-xl p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
          <MoreHorizontal className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
        {days.map((item) => (
          <button
            key={`${item.label}-${item.day}`}
            className={`flex h-[58px] w-[58px] shrink-0 flex-col items-center justify-center rounded-full border text-center transition ${
              item.active
                ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_12px_26px_rgba(5,150,105,0.22)]"
                : "border-[#DDEBE4] bg-[#FBFDF9] text-slate-500 hover:border-emerald-200"
            }`}
          >
            {item.label ? (
              <span className="text-[11px] font-black">{item.label}</span>
            ) : null}
            <span className="text-[13px] font-black">{item.day}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center gap-4 rounded-[18px] border border-[#DDEBE4] bg-white p-4 transition hover:border-emerald-100 hover:bg-[#FBFDF9]"
          >
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                task.checked
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-300 bg-white text-transparent"
              }`}
            >
              {task.checked ? <Check className="h-4 w-4" strokeWidth={3} /> : <Square className="h-0 w-0" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-black text-[#07111F]">
                {task.title}
              </div>
              <div className="mt-1 text-[12px] font-medium text-slate-500">
                {task.desc}
              </div>
            </div>

            <span className={`hidden rounded-full px-3 py-1 text-[11px] font-black sm:inline-flex ${task.statusClass}`}>
              {task.status}
            </span>

            <div className="hidden items-center gap-2 text-[12px] font-bold text-slate-500 md:flex">
              <CalendarDays className="h-4 w-4" strokeWidth={2.1} />
              {task.date}
            </div>

            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        ))}
      </div>

      <button className="mt-5 text-[14px] font-black text-emerald-600">
        Xem toàn bộ kế hoạch →
      </button>
    </article>
  );
}