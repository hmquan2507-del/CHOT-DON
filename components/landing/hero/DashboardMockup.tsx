import { ChevronDown } from "lucide-react";

const stats = [
  {
    label: "Kế hoạch 30 ngày",
    value: "18/30",
    desc: "Nội dung đã lên kế hoạch",
    progress: true,
  },
  {
    label: "Lịch đăng",
    value: "12",
    desc: "Nội dung sắp đăng",
  },
  {
    label: "Hiệu suất nội dung",
    value: "342",
    desc: "Tổng lượt hoạt động",
    chart: true,
  },
  {
    label: "Sản phẩm affiliate",
    value: "23",
    desc: "Đang theo dõi",
  },
];

const tasks = [
  ["Viết script video", "Ý tưởng", "Ưu tiên: Cao"],
  ["Quay & dựng video", "Sản xuất", "Ưu tiên: Cao"],
  ["Đăng video + SEO", "Xuất bản", "Ưu tiên: TB"],
];

export default function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-emerald-100/80 bg-white/96 shadow-[0_28px_80px_rgba(15,23,42,0.09),0_18px_50px_rgba(16,185,129,0.10)]">
      <div className="flex h-[46px] items-center justify-between border-b border-slate-100 bg-white/95 px-5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#FF6157]" />
          <span className="size-3 rounded-full bg-[#FDBB2D]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>

        <div className="flex items-center gap-2 opacity-70">
          <span className="size-3 rounded-full border border-slate-300" />
          <span className="size-3 rounded-full border border-slate-300" />
        </div>
      </div>

      <div className="grid h-[430px] grid-cols-[136px_minmax(0,1fr)] bg-white">
        <aside className="border-r border-slate-100 bg-[#F8FCF9] px-3.5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              ✨
            </div>
            <p className="text-[11px] font-black leading-tight text-slate-950">
              Content Chốt
              <br />
              Đơn
            </p>
          </div>

          <div className="mt-5 space-y-1.5">
            {[
              "Tổng quan",
              "Hồ sơ kênh",
              "Sản phẩm",
              "Ý tưởng",
              "Kịch bản",
              "Lịch nội dung",
              "Phân tích",
            ].map((item, index) => (
              <div
                key={item}
                className={
                  index === 0
                    ? "flex items-center gap-2 rounded-xl bg-emerald-600 px-2.5 py-2 text-[10px] font-bold text-white"
                    : "flex items-center gap-2 rounded-xl px-2.5 py-2 text-[10px] font-bold text-slate-500"
                }
              >
                <span
                  className={
                    index === 0
                      ? "flex size-4 items-center justify-center rounded-full border border-white/40 text-[8px]"
                      : "flex size-4 items-center justify-center rounded-full border border-slate-300 text-[8px]"
                  }
                >
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-2 text-[10px] font-bold text-slate-400">
            <p>Cài đặt</p>
            <p>Đăng xuất</p>
          </div>
        </aside>

        <main className="min-w-0 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[16px] font-black tracking-[-0.03em] text-slate-950">
                Chào buổi sáng, Creator 👋
              </h3>
              <p className="mt-1 text-[11px] text-slate-400">
                Hôm nay là ngày tuyệt vời để tạo nội dung chốt đơn.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex h-8 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 text-[10px] font-bold text-slate-500 shadow-sm">
                7 ngày qua
                <ChevronDown className="size-3" />
              </button>

              <button className="h-8 rounded-xl bg-emerald-600 px-2.5 text-[10px] font-bold text-white shadow-[0_10px_20px_rgba(5,150,105,0.18)]">
                + Tạo mới
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[18px] border border-slate-100 bg-white p-3 shadow-[0_8px_20px_rgba(15,23,42,0.035)]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex size-8 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    •
                  </div>
                  <span className="text-slate-300">...</span>
                </div>

                <p className="text-[10px] font-bold leading-4 text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[20px] font-black leading-none tracking-[-0.04em] text-slate-950">
                  {item.value}
                </p>
                <p className="mt-1.5 text-[9px] leading-4 text-slate-400">
                  {item.desc}
                </p>

                {item.progress ? (
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div className="h-1.5 w-[60%] rounded-full bg-emerald-600" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-400">
                      60%
                    </span>
                  </div>
                ) : null}

                {item.chart ? (
                  <div className="mt-2.5 flex h-8 items-end gap-1">
                    {[16, 28, 22, 34, 26].map((h, idx) => (
                      <span
                        key={idx}
                        className="w-2 rounded-full bg-gradient-to-t from-emerald-500 to-emerald-200"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                ) : null}

                <p className="mt-2.5 text-[9px] font-bold text-emerald-700">
                  Xem chi tiết →
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[20px] border border-slate-100 bg-white p-3.5 shadow-[0_8px_20px_rgba(15,23,42,0.035)]">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[13px] font-black text-slate-950">
                    Kế hoạch 30 ngày
                  </h4>
                  <p className="mt-1 text-[10px] text-slate-400">
                    18 nội dung đã hoàn thành
                  </p>
                </div>
                <span className="text-slate-300">...</span>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 30].map((day) => (
                  <span
                    key={day}
                    className={
                      day === 3
                        ? "flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white"
                        : "flex size-6 items-center justify-center rounded-full bg-slate-50 text-[10px] font-bold text-slate-500"
                    }
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="mt-3 space-y-2">
                {tasks.map(([name, tag, priority]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#FCFDFC] px-3 py-2"
                  >
                    <p className="text-[10px] font-bold text-slate-900">
                      {name}
                    </p>

                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[8px] font-bold text-violet-400">
                        {tag}
                      </span>
                      <span className="text-[8px] font-bold text-amber-500">
                        {priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-3 text-[10px] font-black text-emerald-700">
                Xem toàn bộ kế hoạch →
              </button>
            </div>

            <div className="rounded-[20px] border border-slate-100 bg-white p-3.5 shadow-[0_8px_20px_rgba(15,23,42,0.035)]">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[13px] font-black text-slate-950">
                    Hiệu suất nội dung
                  </h4>
                  <p className="mt-1 text-[10px] text-slate-400">7 ngày qua</p>
                </div>

                <button className="rounded-xl border border-slate-100 px-2 py-1 text-[9px] font-bold text-slate-400">
                  7 ngày qua
                </button>
              </div>

              <div className="mt-3 flex h-[112px] items-end gap-2 rounded-2xl bg-[#F8FCF9] px-3 pb-3">
                {[42, 64, 52, 82, 66, 92, 70].map((h, idx) => (
                  <div key={idx} className="flex flex-1 items-end justify-center">
                    <span
                      className="w-full max-w-[20px] rounded-t-xl bg-gradient-to-t from-emerald-500 to-emerald-200"
                      style={{ height: `${h}px` }}
                    />
                  </div>
                ))}
              </div>

              <button className="mt-3 text-[10px] font-black text-emerald-700">
                Xem báo cáo chi tiết →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}