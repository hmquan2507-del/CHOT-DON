import type { ReactNode } from "react";

const calendarRows = [
  {
    week: "Tuần 1",
    range: "(1–7)",
    dots: ["green", "green", "green", "green", "green", "green", "green"],
    video: "Hành trình phục hồi da sau mụn",
    channel: "TikTok",
  },
  {
    week: "Tuần 2",
    range: "(8–14)",
    dots: ["green", "green", "green", "green", "yellow", "green", "mint"],
    video: "Cấp ẩm căng mướt sau 7 ngày",
    channel: "Facebook",
  },
  {
    week: "Tuần 3",
    range: "(15–21)",
    dots: ["green", "green", "green", "green", "green", "green", "green"],
    video: "So sánh trước & sau khi dùng serum",
    channel: "Instagram",
  },
  {
    week: "Tuần 4",
    range: "(22–28)",
    dots: ["gray", "gray", "yellow", "gray", "gray", "gray", "gray"],
    video: "Routine 3 bước cho da nhạy cảm",
    channel: "YouTube",
  },
  {
    week: "Tuần 5",
    range: "(29–30)",
    dots: ["gray", "gray", "gray", "gray", "gray", "gray", "gray"],
    video: "Chưa có kế hoạch",
    channel: "",
  },
];

const metrics = [
  { label: "Views", value: "128.4K", growth: "32.5%" },
  { label: "Likes", value: "9.876", growth: "24.1%" },
  { label: "Comments", value: "1.245", growth: "18.7%" },
  { label: "Clicks", value: "3.652", growth: "28.9%" },
  { label: "Orders", value: "356", growth: "31.6%" },
  { label: "Revenue", value: "27.8M", growth: "35.4%" },
];

const insights = [
  {
    title: "Tăng tương tác với hook mạnh hơn",
    text: "Các video có hook đặt câu hỏi đạt tương tác cao hơn 41%.",
    cta: "Xem gợi ý hook",
  },
  {
    title: "Đăng vào khung giờ vàng",
    text: "Khung giờ 11:00 – 13:00 mang lại lượt xem cao nhất.",
    cta: "Xem lịch giờ vàng",
  },
  {
    title: "Tối ưu chủ đề hiệu quả",
    text: "Chủ đề “phục hồi da” đang có hiệu suất tốt hơn 58% so với trung bình.",
    cta: "Xem chủ đề gợi ý",
  },
];

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[11px] text-amber-500">
        ✦
      </span>
      {children}
    </div>
  );
}

function Dot({ type }: { type: string }) {
  const color =
    type === "green"
      ? "bg-emerald-500"
      : type === "mint"
        ? "bg-emerald-300"
        : type === "yellow"
          ? "bg-amber-400"
          : "bg-slate-300";

  return <span className={`mx-auto block h-3.5 w-3.5 rounded-full ${color}`} />;
}

function CalendarPanel() {
  return (
    <div className="rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          ▣
        </span>
        <h3 className="text-[20px] font-black text-slate-950">
          Lịch nội dung 30 ngày
        </h3>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-emerald-100">
        <div className="grid grid-cols-[1.1fr_repeat(7,0.45fr)_1.3fr] bg-[#FBFEFC] px-4 py-3 text-[12px] font-black text-slate-500">
          <span>Tuần</span>
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
            <span key={day} className="text-center">
              {day}
            </span>
          ))}
          <span>Video sắp tới</span>
        </div>

        {calendarRows.map((row) => (
          <div
            key={row.week}
            className="grid grid-cols-[1.1fr_repeat(7,0.45fr)_1.3fr] items-center border-t border-emerald-100 px-4 py-4"
          >
            <div>
              <p className="text-[13px] font-black text-slate-950">
                {row.week}
              </p>
              <p className="text-[12px] text-slate-500">{row.range}</p>
            </div>

            {row.dots.map((dot, index) => (
              <Dot key={index} type={dot} />
            ))}

            <div className="pl-3">
              <p className="text-[12px] font-black leading-5 text-slate-950">
                {row.video}
              </p>
              {row.channel ? (
                <p className="mt-1 text-[11px] text-slate-500">
                  {row.channel}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-[12px] font-medium text-slate-500">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          Đã đăng
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
          Đã lên lịch
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          Cần tối ưu
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          Chưa có kế hoạch
        </span>
      </div>
    </div>
  );
}

function PerformancePanel() {
  return (
    <div className="rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <h3 className="text-[20px] font-black leading-tight text-slate-950">
          Hiệu suất tổng quan
        </h3>

        <span className="rounded-full border border-emerald-100 px-3 py-1.5 text-[12px] font-bold text-slate-500">
          7 ngày qua
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="rounded-[16px] border border-emerald-100 bg-[#FBFEFC] p-3.5"
          >
            <p className="text-[12px] font-medium text-slate-500">
              {item.label}
            </p>

            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-[21px] font-black text-slate-950">
                {item.value}
              </p>

              <p className="text-[11px] font-black text-emerald-600">
                ▲ {item.growth}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[20px] border border-emerald-100 bg-gradient-to-b from-white to-emerald-50 p-4">
        <div className="mb-3 flex justify-end">
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black text-white">
            +35.4%
          </span>
        </div>

        <svg viewBox="0 0 320 150" className="h-[135px] w-full">
          <path
            d="M8 126 C34 118, 48 112, 72 106 C96 100, 105 87, 128 92 C151 96, 170 78, 190 74 C210 70, 226 61, 248 52 C268 44, 290 52, 314 25"
            fill="none"
            stroke="#10b981"
            strokeLinecap="round"
            strokeWidth="5"
          />
        </svg>
      </div>
    </div>
  );
}

function AiInsightPanel() {
  return (
    <div className="rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
          ✦
        </span>

        <h3 className="text-[20px] font-black text-slate-950">AI Insight</h3>
      </div>

      <div className="space-y-3">
        {insights.map((item) => (
          <div
            key={item.title}
            className="rounded-[18px] border border-emerald-100 bg-[#FBFEFC] p-4"
          >
            <h4 className="text-[14px] font-black leading-6 text-slate-950">
              {item.title}
            </h4>

            <p className="mt-2 text-[13px] leading-6 text-slate-500">
              {item.text}
            </p>

            <button className="mt-3 text-[13px] font-black text-emerald-600">
              {item.cta} →
            </button>
          </div>
        ))}
      </div>

      <button className="mt-4 h-12 w-full rounded-[16px] bg-emerald-500 text-[15px] font-black text-white shadow-[0_16px_30px_rgba(16,185,129,0.22)]">
        Tạo nội dung mới ✦
      </button>
    </div>
  );
}

function BenefitPill({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-full border border-emerald-100 bg-white px-5 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        ◔
      </span>

      <span className="text-[14px] font-bold text-slate-600">{children}</span>
    </div>
  );
}

export default function TrackingSection() {
  return (
    <section className="relative px-4 pb-20 pt-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="text-center">
          <SectionBadge>Quản lý – Phân tích – Tối ưu mỗi ngày</SectionBadge>

          <h2 className="mx-auto mt-6 max-w-[980px] text-balance text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[48px] lg:text-[56px]">
            Theo dõi tiến độ, lịch đăng
            <br />
            và hiệu suất nội dung{" "}
            <span className="text-emerald-500">rõ ràng mỗi ngày.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-7 text-slate-500 sm:text-[18px]">
            Lịch nội dung 30 ngày trực quan, số liệu hiệu suất real-time và gợi ý
            tối ưu từ AI để bạn luôn đi đúng hướng và đạt kết quả tốt hơn.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.9fr_0.85fr]">
          <CalendarPanel />
          <PerformancePanel />
          <AiInsightPanel />
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <BenefitPill>Tiết kiệm 70% thời gian lên kế hoạch</BenefitPill>
          <BenefitPill>Hiểu rõ hiệu quả nội dung mỗi ngày</BenefitPill>
          <BenefitPill>Tối ưu liên tục với gợi ý từ AI</BenefitPill>
        </div>
      </div>
    </section>
  );
}