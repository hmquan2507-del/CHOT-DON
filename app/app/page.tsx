import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  Lightbulb,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const overviewCards = [
  {
    title: "Hồ sơ kênh",
    value: "01",
    subtitle: "Đã tạo hoàn chỉnh",
    icon: Target,
    featured: true,
  },
  {
    title: "Sản phẩm affiliate",
    value: "05",
    subtitle: "+3 sản phẩm tuần này",
    icon: Layers3,
  },
  {
    title: "Ý tưởng sẵn sàng",
    value: "30",
    subtitle: "12 ý tưởng tốt",
    icon: Lightbulb,
  },
];

const libraryItems = [
  {
    title: "Serum phục hồi da",
    meta: "Hoa hồng 12% • Beauty",
    status: "Active",
  },
  {
    title: "Son tint giá rẻ",
    meta: "Hoa hồng 10% • Review",
    status: "Ready",
  },
  {
    title: "Kem chống nắng",
    meta: "Hoa hồng 8% • Seasonal",
    status: "Draft",
  },
  {
    title: "Máy rửa mặt mini",
    meta: "Hoa hồng 15% • Gadget",
    status: "Idea",
  },
];

const todayTasks = [
  "Hoàn thiện hồ sơ kênh TikTok Affiliate",
  "Thêm 3 sản phẩm affiliate đầu tiên",
  "Tạo 10 ý tưởng video cho tuần này",
  "Viết script 30s cho video đầu tiên",
];

const recentActivities = [
  {
    activity: "Tạo 10 ý tưởng cho ngách Beauty",
    type: "AI Suggestion",
    date: "17 Apr, 2026",
    time: "03:45 PM",
    status: "Completed",
  },
  {
    activity: "Thêm sản phẩm Serum phục hồi da",
    type: "Product Added",
    date: "17 Apr, 2026",
    time: "11:20 AM",
    status: "Done",
  },
  {
    activity: "Viết script video review 30s",
    type: "Script",
    date: "16 Apr, 2026",
    time: "08:10 PM",
    status: "In progress",
  },
  {
    activity: "Lên lịch đăng video ngày mai",
    type: "Schedule",
    date: "16 Apr, 2026",
    time: "02:30 PM",
    status: "Scheduled",
  },
];

const performanceBars = [38, 26, 48, 30, 34, 22, 29];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Dashboard tổng quan
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Đây là workspace giúp bạn quản lý kênh, sản phẩm, ý tưởng, script và
            lịch nội dung một cách rõ ràng.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
            This month
          </button>
          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
            Reset Data
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-[28px] border p-5 shadow-sm ${
                card.featured
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-950"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex size-11 items-center justify-center rounded-2xl ${
                    card.featured
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Icon className="size-5" />
                </div>

                <button
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    card.featured
                      ? "bg-white/10 text-white/80"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  V1
                </button>
              </div>

              <p className="mt-8 text-sm font-semibold opacity-90">
                {card.title}
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                {card.value}
              </p>
              <p
                className={`mt-2 text-sm ${
                  card.featured ? "text-white/75" : "text-slate-500"
                }`}
              >
                {card.subtitle}
              </p>

              <div
                className={`mt-8 flex items-center justify-between border-t pt-4 ${
                  card.featured ? "border-white/15" : "border-slate-200"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    card.featured ? "text-white/85" : "text-slate-500"
                  }`}
                >
                  Xem chi tiết
                </span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-400">
                Content library
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                Thư viện sản phẩm
              </h3>
            </div>

            <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              + Add New
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {libraryItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.meta}
                    </p>
                  </div>
                  <MoreHorizontal className="size-4 text-slate-400" />
                </div>

                <p className="mt-5 text-sm font-semibold text-emerald-600">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-400">
                Content performance
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                Hiệu suất nội dung
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                Monthly
              </button>
              <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Weekly
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-400">
                  Tổng lượt hoạt động
                </p>
                <p className="mt-2 text-5xl font-bold tracking-tight text-slate-950">
                  342
                </p>
              </div>

              <div className="flex h-[260px] items-end gap-4 rounded-[24px] bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px] p-5">
                {performanceBars.map((value, index) => (
                  <div key={index} className="flex flex-1 items-end">
                    <div
                      className={`w-full rounded-t-[18px] ${
                        index === 2
                          ? "bg-gradient-to-t from-emerald-600 to-emerald-300"
                          : "bg-slate-200"
                      }`}
                      style={{ height: `${value * 3.5}px` }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-400">
                  Channel Score
                </p>
                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  82
                </p>
                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className="h-full w-[82%] rounded-full bg-emerald-600" />
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Hệ thống đánh giá kênh của bạn đã đủ nền tảng để đẩy nội dung
                  đều.
                </p>
              </div>

              <div className="rounded-[22px] bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-emerald-600" />
                  <p className="text-sm font-semibold text-slate-950">
                    AI gợi ý hôm nay
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Tạo 5 video dạng “lỗi người mới” cho sản phẩm chính vì nhóm
                  nội dung này dễ kéo comment và chốt đơn.
                </p>
                <button className="mt-4 inline-flex items-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
                  Tạo 5 ý tưởng
                  <ArrowRight className="ml-2 size-4" />
                </button>
              </div>

              <div className="rounded-[22px] bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-emerald-600" />
                  <p className="text-sm font-semibold text-slate-950">
                    Ưu tiên tuần này
                  </p>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-500">
                  <li>• Thêm 3 sản phẩm hoa hồng tốt</li>
                  <li>• Tạo lịch nội dung 7 ngày</li>
                  <li>• Viết 2 script review ngắn</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-400">Today plan</p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                Việc cần làm hôm nay
              </h3>
            </div>
            <CalendarDays className="size-5 text-slate-400" />
          </div>

          <div className="space-y-3">
            {todayTasks.map((task, index) => (
              <div
                key={task}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`mt-0.5 size-5 shrink-0 ${
                      index < 2 ? "text-emerald-500" : "text-slate-300"
                    }`}
                  />
                  <p className="text-sm font-semibold leading-6 text-slate-900">
                    {task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-400">
                Recent Activities
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                Hoạt động gần đây
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search"
                  className="h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-slate-200">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              <span>Activity</span>
              <span>Type</span>
              <span>Date</span>
              <span>Time</span>
              <span>Status</span>
            </div>

            <div className="divide-y divide-slate-200 bg-white">
              {recentActivities.map((item) => (
                <div
                  key={`${item.activity}-${item.time}`}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] items-center px-5 py-4 text-sm"
                >
                  <span className="font-semibold text-slate-900">
                    {item.activity}
                  </span>
                  <span className="text-slate-500">{item.type}</span>
                  <span className="text-slate-500">{item.date}</span>
                  <span className="text-slate-500">{item.time}</span>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Completed" || item.status === "Done"
                        ? "bg-emerald-100 text-emerald-700"
                        : item.status === "Scheduled"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
              <Plus className="size-4" />
              Thêm hoạt động mới
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
