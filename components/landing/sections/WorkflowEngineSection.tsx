import type { ReactNode } from "react";

const ideas = [
  "Hành trình phục hồi da sau mụn",
  "Cấp ẩm căng mướt chỉ sau 7 ngày",
  "So sánh da trước & sau khi dùng serum",
  "Routine 3 bước cho da nhạy cảm",
];

const scriptBlocks = [
  {
    title: "Hook (0–3s)",
    text: "Da mụn, đỏ rát, khô bong? Đây là giải pháp cho bạn!",
  },
  {
    title: "Body (4–24s)",
    text: "Serum Rau Má giúp làm dịu, phục hồi và cấp ẩm sâu cho da. Chiết xuất 99% thiên nhiên, phù hợp da nhạy cảm.",
  },
  {
    title: "CTA (25–30s)",
    text: "Nhấn mua ngay để trải nghiệm làn da khỏe mạnh mỗi ngày!",
  },
];

const captionBullets = [
  "Phục hồi da – Dịu kích ứng",
  "Cấp ẩm sâu – Căng mướt",
  "Chiết xuất rau má 99%",
  "Phù hợp mọi loại da",
];

const tags = [
  "#serumrauma",
  "#skincare",
  "#phuchoida",
  "#lamdieuda",
  "#copam",
  "#chamsocda",
];

const scheduleItems = [
  {
    name: "TikTok",
    time: "Th 2, 10:00",
    status: "Đã lên lịch",
    icon: "Tik",
    className: "bg-black text-white",
  },
  {
    name: "Facebook",
    time: "Th 2, 12:00",
    status: "Đã lên lịch",
    icon: "f",
    className: "bg-blue-600 text-white",
  },
  {
    name: "Instagram",
    time: "Th 2, 18:00",
    status: "Đã lên lịch",
    icon: "Ig",
    className:
      "bg-[linear-gradient(135deg,#facc15,#ec4899,#7c3aed)] text-white",
  },
  {
    name: "YouTube",
    time: "Th 3, 12:00",
    status: "Chờ đăng",
    icon: "▶",
    className: "bg-red-600 text-white",
  },
];

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

function FlowNumber({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[13px] font-black text-emerald-600 ring-1 ring-emerald-100">
      {children}
    </span>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center xl:flex">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 bg-white text-[22px] font-bold text-emerald-500 shadow-[0_14px_34px_rgba(5,150,105,0.12)]">
        →
      </div>
    </div>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[12px] leading-5 text-slate-600">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[9px] font-black text-emerald-600">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function ProductBottle() {
  return (
    <div className="relative flex h-[128px] items-end justify-center rounded-[20px] border border-emerald-100 bg-[#F8FCF8]">
      <div className="absolute bottom-5 left-8 h-16 w-10 rounded-full bg-emerald-100/70 blur-2xl" />
      <div className="absolute bottom-5 right-8 h-16 w-10 rounded-full bg-emerald-100/70 blur-2xl" />

      <div className="relative mb-4 flex flex-col items-center">
        <div className="h-7 w-5 rounded-t-md bg-slate-950" />
        <div className="h-4 w-3 rounded-b-md bg-slate-800" />

        <div className="-mt-1 flex h-[82px] w-[58px] flex-col items-center rounded-[14px] border border-emerald-100 bg-white px-2 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <div className="mt-3 h-8 w-8 rounded-full bg-emerald-100" />
          <div className="mt-2 h-1.5 w-9 rounded-full bg-slate-200" />
          <div className="mt-1.5 h-1.5 w-7 rounded-full bg-slate-100" />
          <div className="mt-auto mb-2 h-6 w-full rounded-lg bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function ProductCard() {
  return (
    <article className="h-[430px] overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-4 flex items-center gap-3">
        <FlowNumber>01</FlowNumber>
        <h3 className="text-[16px] font-black text-slate-950">Sản phẩm</h3>
      </div>

      <ProductBottle />

      <div className="mt-4 rounded-[18px] border border-emerald-100 bg-white p-3.5">
        <h4 className="text-[15px] font-black leading-6 text-slate-950">
          Serum Rau Má
          <br />
          Phục Hồi & Cấp Ẩm
        </h4>

        <p className="mt-3 text-[22px] font-black tracking-[-0.03em] text-slate-950">
          399.000đ
        </p>

        <ul className="mt-3 space-y-1.5">
          <CheckItem>Dung tích: 30ml</CheckItem>
          <CheckItem>Phục hồi hàng rào da</CheckItem>
          <CheckItem>Chiết xuất rau má 99%</CheckItem>
        </ul>
      </div>
    </article>
  );
}

function IdeaCard() {
  return (
    <article className="h-[430px] overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-4 flex items-center gap-3">
        <FlowNumber>02</FlowNumber>
        <h3 className="text-[16px] font-black leading-tight text-slate-950">
          Ý tưởng video
        </h3>
      </div>

      <div className="space-y-2.5">
        {ideas.map((idea) => (
          <div
            key={idea}
            className="flex items-start gap-2.5 rounded-[16px] border border-emerald-100 bg-[#FBFEFC] p-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[10px] text-emerald-600">
              ▶
            </span>

            <p className="text-[12px] font-semibold leading-5 text-slate-600">
              {idea}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ScriptCard() {
  return (
    <article className="h-[430px] overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-4 flex items-center gap-3">
        <FlowNumber>03</FlowNumber>
        <h3 className="text-[16px] font-black leading-tight text-slate-950">
          Script 30s
        </h3>
      </div>

      <div className="space-y-2.5">
        {scriptBlocks.map((block) => (
          <div
            key={block.title}
            className="rounded-[16px] border border-emerald-100 bg-[#FBFEFC] p-3"
          >
            <h4 className="text-[12.5px] font-black text-emerald-600">
              {block.title}
            </h4>

            <p className="mt-1.5 text-[12px] font-medium leading-5 text-slate-600">
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function CaptionCard() {
  return (
    <article className="h-[430px] overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-4 flex items-center gap-3">
        <FlowNumber>04</FlowNumber>
        <h3 className="text-[16px] font-black leading-tight text-slate-950">
          Caption / CTA
        </h3>
      </div>

      <ul className="space-y-2.5">
        {captionBullets.map((item) => (
          <CheckItem key={item}>{item}</CheckItem>
        ))}
      </ul>

      <div className="my-4 border-t border-dashed border-emerald-100" />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10.5px] font-black text-emerald-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-2 text-[13px] font-black text-emerald-600">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
          +
        </span>
        Mua ngay tại link bio!
      </p>
    </article>
  );
}

function ScheduleCard() {
  return (
    <article className="h-[430px] overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="mb-4 flex items-center gap-3">
        <FlowNumber>05</FlowNumber>
        <h3 className="text-[16px] font-black text-slate-950">Lịch đăng</h3>
      </div>

      <div className="space-y-2.5">
        {scheduleItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-[16px] border border-emerald-100 bg-[#FBFEFC] p-2.5"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[12px] font-black ${item.className}`}
            >
              {item.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-black leading-5 text-slate-950">
                {item.name}
              </p>
              <p className="text-[11.5px] font-medium text-slate-500">
                {item.time}
              </p>
            </div>

            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-black leading-tight text-emerald-600">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </article>
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

export default function WorkflowEngineSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_35%,rgba(16,185,129,0.10),transparent_26%),radial-gradient(circle_at_100%_72%,rgba(16,185,129,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute left-0 top-[160px] h-[260px] w-[120px] bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />
      <div className="pointer-events-none absolute right-0 top-[860px] h-[260px] w-[120px] bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="text-center">
          <SectionBadge>Từ sản phẩm đến nội dung chỉ với vài bước</SectionBadge>

          <h2 className="mx-auto mt-6 max-w-[900px] text-balance text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[48px] lg:text-[56px]">
            Biến sản phẩm thành nội dung
            <br />
            bán hàng chỉ trong{" "}
            <span className="text-emerald-500">một luồng làm việc.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[720px] text-[16px] leading-7 text-slate-500 sm:text-[18px]">
            AI giúp bạn tạo ý tưởng, viết script, caption và lên lịch đăng chỉ
            trong một nơi.
            <br className="hidden sm:block" />
            Nhanh hơn — chất lượng hơn — hiệu quả hơn.
          </p>

          <div className="mt-6">
            <SectionBadge>AI đồng hành cùng bạn</SectionBadge>
          </div>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-[220px_40px_220px_40px_220px_40px_220px_40px_220px] xl:items-center xl:justify-center">
          <ProductCard />
          <FlowArrow />
          <IdeaCard />
          <FlowArrow />
          <ScriptCard />
          <FlowArrow />
          <CaptionCard />
          <FlowArrow />
          <ScheduleCard />
        </div>

        <div className="mt-20 text-center">
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