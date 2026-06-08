const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "30"];

const tasks = [
  { name: "Viết script video", tag: "Ý tưởng", priority: "Ưu tiên: Cao" },
  { name: "Quay & dựng video", tag: "Sản xuất", priority: "Ưu tiên: Cao" },
  { name: "Đăng video + SEO", tag: "Xuất bản", priority: "Ưu tiên: Trung bình" },
];

export default function DashboardPlanCard() {
  return (
    <div className="rounded-[24px] border border-[#E6EFEA] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[15px] font-extrabold text-[#07111F]">
            Kế hoạch 30 ngày
          </h4>
          <p className="mt-1 text-[11px] text-slate-400">18 nội dung đã hoàn thành</p>
        </div>
        <span className="text-slate-300">⋯</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={
              index === 2
                ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#059669] text-[11px] font-bold text-white"
                : "flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F8F6] text-[11px] font-bold text-slate-500"
            }
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#EEF3EF] bg-[#FCFDFC] px-3 py-3"
          >
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-[#07111F]">{task.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#F3F6FF] px-2.5 py-1 text-[10px] font-bold text-[#8B93C8]">
                {task.tag}
              </span>
              <span className="text-[10px] font-bold text-[#F59E0B]">{task.priority}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-[12px] font-bold text-[#059669]">
        Xem toàn bộ kế hoạch →
      </button>
    </div>
  );
}