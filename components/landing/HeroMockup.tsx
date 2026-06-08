import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  Lightbulb,
  LineChart,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Tổng quan",
    icon: Target,
    active: true,
  },
  {
    label: "Hồ sơ kênh",
    icon: Target,
    active: false,
  },
  {
    label: "Sản phẩm",
    icon: Layers3,
    active: false,
  },
  {
    label: "Ý tưởng",
    icon: Lightbulb,
    active: false,
  },
  {
    label: "Kịch bản",
    icon: FileText,
    active: false,
  },
  {
    label: "Lịch nội dung",
    icon: CalendarDays,
    active: false,
  },
  {
    label: "Phân tích",
    icon: BarChart3,
    active: false,
  },
];

const stats = [
  {
    label: "Kế hoạch 30 ngày",
    value: "18/30",
    description: "Nội dung đã lên kế hoạch",
    icon: CalendarDays,
    progress: true,
  },
  {
    label: "Lịch đăng",
    value: "12",
    description: "Nội dung sắp đăng",
    icon: Clock3,
  },
  {
    label: "Hiệu suất nội dung",
    value: "342",
    description: "Tổng lượt hoạt động",
    icon: BarChart3,
    chart: true,
  },
  {
    label: "Sản phẩm affiliate",
    value: "23",
    description: "Đang theo dõi",
    icon: Layers3,
  },
];

const planItems = [
  {
    title: "Viết script video",
    status: "Ý tưởng",
    priority: "Ưu tiên: Cao",
  },
  {
    title: "Quay & dựng video",
    status: "Sản xuất",
    priority: "Ưu tiên: Cao",
  },
  {
    title: "Đăng video + SEO",
    status: "Xuất bản",
    priority: "Ưu tiên: Trung bình",
  },
];

const chartBars = [44, 58, 74, 56, 82, 68, 92];

export default function HeroMockup() {
  return (
    <div className="relative min-h-[590px] w-full overflow-visible lg:min-h-[650px] xl:min-h-[680px]">
      <div className="absolute bottom-[38px] left-[10%] right-[2%] z-0 h-28 rounded-full bg-emerald-500/18 blur-3xl" />
      <div className="absolute bottom-[24px] left-[14%] right-[6%] z-0 h-[76px] rounded-[999px] border border-emerald-200/60 bg-emerald-300/15 shadow-[0_28px_90px_rgba(5,150,105,0.16)]" />

      <div className="relative z-10 ml-auto w-full max-w-[860px] translate-x-2 rounded-[34px] border border-emerald-100/90 bg-white/95 shadow-[0_34px_110px_rgba(5,150,105,0.17)] backdrop-blur-xl lg:translate-x-4 xl:translate-x-6">
        <div className="flex h-14 items-center justify-between border-b border-slate-200/75 px-6">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-red-400" />
            <span className="h-3.5 w-3.5 rounded-full bg-amber-400" />
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500" />
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded border border-slate-300" />
            <span className="h-3 w-3 rounded border border-slate-300" />
          </div>
        </div>

        <div className="grid min-h-[520px] grid-cols-[165px_1fr] overflow-hidden rounded-b-[34px]">
          <aside className="border-r border-slate-200/75 bg-emerald-50/30 px-4 py-6">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-[13px] font-black leading-tight tracking-[-0.035em] text-[#07111f]">
                Content Chốt
                <br />
                Đơn
              </p>
            </div>

            <nav className="space-y-2.5">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={[
                      "flex h-10 items-center gap-2.5 rounded-2xl px-3 text-[12px] font-extrabold",
                      item.active
                        ? "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.22)]"
                        : "text-slate-500",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </div>
                );
              })}
            </nav>

            <div className="mt-24 space-y-3 text-[12px] font-bold text-slate-400">
              <p>Cài đặt</p>
              <p>Đăng xuất</p>
            </div>
          </aside>

          <main className="bg-white px-5 py-6">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <h3 className="text-[20px] font-black tracking-[-0.04em] text-[#07111f] lg:text-[22px]">
                  Chào buổi sáng, Creator 👋
                </h3>
                <p className="mt-1 text-[12px] font-semibold text-slate-400">
                  Hôm nay là ngày tuyệt vời để tạo ra nội dung chốt đơn.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="h-10 rounded-2xl border border-slate-200 bg-white px-4 text-[12px] font-extrabold text-slate-500 shadow-sm">
                  7 ngày qua
                </button>
                <button className="flex h-10 items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 text-[12px] font-extrabold text-white shadow-[0_14px_28px_rgba(5,150,105,0.22)]">
                  <Plus className="h-3.5 w-3.5" />
                  Tạo mới
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="min-h-[154px] rounded-[24px] border border-slate-200/85 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-slate-300">•••</span>
                    </div>

                    <p className="text-[12px] font-extrabold text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-[24px] font-black tracking-[-0.055em] text-[#07111f]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">
                      {stat.description}
                    </p>

                    {stat.progress ? (
                      <div className="mt-4 h-2 rounded-full bg-slate-100">
                        <div className="h-full w-[60%] rounded-full bg-emerald-600" />
                      </div>
                    ) : null}

                    {stat.chart ? (
                      <div className="mt-4 flex h-8 items-end gap-1">
                        {[30, 52, 45, 64, 42].map((height, index) => (
                          <span
                            key={index}
                            className="w-2.5 rounded-t-full bg-emerald-300"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    ) : null}

                    {!stat.progress && !stat.chart ? (
                      <p className="mt-5 text-[11px] font-black text-emerald-700">
                        Xem chi tiết →
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-[1.18fr_0.82fr] gap-4">
              <div className="rounded-[26px] border border-slate-200/85 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-[16px] font-black tracking-[-0.035em] text-[#07111f]">
                      Kế hoạch 30 ngày
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-slate-400">
                      18 nội dung đã hoàn thành
                    </p>
                  </div>
                  <span className="text-slate-300">•••</span>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
                    <span
                      key={day}
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-black",
                        day === 3
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-50 text-slate-400",
                      ].join(" ")}
                    >
                      {day}
                    </span>
                  ))}
                  <span className="text-xs font-bold text-slate-300">...</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-[12px] font-black text-slate-400">
                    30
                  </span>
                </div>

                <div className="space-y-3">
                  {planItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-2xl bg-slate-50/80 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                        <p className="text-[13px] font-extrabold text-slate-700">
                          {item.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                          {item.status}
                        </span>
                        <span className="text-[11px] font-black text-orange-500">
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[13px] font-black text-emerald-700">
                  Xem toàn bộ kế hoạch →
                </p>
              </div>

              <div className="rounded-[26px] border border-slate-200/85 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-[16px] font-black tracking-[-0.035em] text-[#07111f]">
                      Hiệu suất nội dung
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-slate-400">
                      7 ngày qua
                    </p>
                  </div>
                  <span className="rounded-2xl border border-slate-200 px-3 py-1 text-[11px] font-bold text-slate-400">
                    7 ngày qua
                  </span>
                </div>

                <div className="flex h-[158px] items-end gap-3 border-b border-l border-slate-100 px-3 pb-3">
                  {chartBars.map((height, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center">
                      <span
                        className="w-full max-w-[18px] rounded-t-full bg-gradient-to-b from-emerald-400 to-emerald-600"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-7 text-center text-[10px] font-bold text-slate-400">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <p className="mt-4 text-[13px] font-black text-emerald-700">
                  Xem báo cáo chi tiết →
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[26px] border border-emerald-100 bg-emerald-50/65 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-black tracking-[-0.035em] text-[#07111f]">
                    AI gợi ý hôm nay
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-slate-500">
                    Dựa trên kênh và hành vi của bạn, AI đề xuất:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Ý tưởng video về dưỡng da",
                      "So sánh 3 sản phẩm serum",
                      "Video review ngắn 30s",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-emerald-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="absolute right-[-18px] top-[182px] z-30 hidden w-[198px] rounded-[34px] border border-slate-200 bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,0.16)] lg:block xl:right-[-26px]">
        <div className="rounded-[28px] bg-white px-4 py-4">
          <div className="mb-4 flex items-center justify-between text-[10px] font-black text-slate-800">
            <span>9:31</span>
            <span>•••</span>
          </div>

          <p className="text-[15px] font-black tracking-[-0.035em] text-[#07111f]">
            Xin chào, Creator 👋
          </p>
          <p className="mt-1 text-[10px] font-semibold text-slate-400">
            Tổng quan hôm nay
          </p>

          <div className="mt-4 rounded-[22px] bg-emerald-600 p-4 text-white">
            <p className="text-[10px] font-bold text-emerald-50">
              Hoàn thành kế hoạch
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-[30px] font-black tracking-[-0.06em]">75%</p>
              <p className="text-[10px] font-black text-emerald-100">18/24</p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/20">
              <div className="h-full w-[75%] rounded-full bg-white" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-[13px] font-black text-[#07111f]">Việc cần làm</p>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">
              3 việc
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {["Viết script video mới", "Đăng video TikTok", "Phản hồi bình luận"].map(
              (item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-3 py-3">
                  <p className="text-[11px] font-black text-slate-700">{item}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    Ưu tiên cao
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-5 grid grid-cols-4 rounded-2xl bg-slate-50 px-2 py-2 text-center text-[9px] font-bold text-slate-400">
            <span>Tổng quan</span>
            <span>Lịch</span>
            <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
              +
            </span>
            <span>Cá nhân</span>
          </div>
        </div>
      </div>

      <div className="absolute right-[22px] top-[118px] z-40 hidden items-center gap-3 rounded-[24px] border border-emerald-100 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[15px] font-black tracking-[-0.035em] text-[#07111f]">
            AI đồng hành
          </p>
          <p className="text-[12px] font-bold text-slate-400">Gợi ý mỗi ngày</p>
        </div>
      </div>

      <div className="absolute bottom-[72px] left-[110px] z-40 hidden items-center gap-3 rounded-[24px] border border-emerald-100 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <LineChart className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400">Kênh chính</p>
          <p className="text-[15px] font-black tracking-[-0.035em] text-[#07111f]">
            Beauty Care
          </p>
          <p className="text-[11px] font-bold text-slate-400">158K followers</p>
        </div>
        <div className="ml-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}