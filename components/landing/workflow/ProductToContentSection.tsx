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

export default function ProductToContentSection() {
  return (
    <section className="relative px-4 pt-20 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
}