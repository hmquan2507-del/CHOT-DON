import type { ReactNode } from "react";

const plans = [
  {
    name: "Free",
    desc: "Bắt đầu miễn phí",
    price: "0đ",
    suffix: "/ tháng",
    icon: "🌱",
    popular: false,
    cta: "Bắt đầu miễn phí",
    features: [
      "1 hồ sơ kênh & 1 nền tảng",
      "5 sản phẩm affiliate",
      "10 ý tưởng nội dung AI / tháng",
      "3 script AI / tháng",
      "Lịch nội dung 30 ngày cơ bản",
      "Thống kê cơ bản",
    ],
  },
  {
    name: "Pro",
    desc: "Tối ưu & tăng tốc",
    price: "199.000đ",
    suffix: "/ tháng",
    icon: "⚡",
    popular: true,
    cta: "Dùng thử 7 ngày miễn phí",
    features: [
      "3 hồ sơ kênh & đa nền tảng",
      "50 sản phẩm affiliate",
      "Không giới hạn ý tưởng AI",
      "Không giới hạn script AI",
      "Lịch nội dung 30 ngày nâng cao",
      "Thống kê chi tiết & báo cáo",
      "Gợi ý tối ưu nội dung từ AI",
    ],
  },
  {
    name: "Founder",
    desc: "Dành cho người xây hệ thống",
    price: "399.000đ",
    suffix: "/ tháng",
    icon: "♛",
    popular: false,
    cta: "Dùng thử 7 ngày miễn phí",
    features: [
      "Không giới hạn hồ sơ kênh",
      "Không giới hạn sản phẩm",
      "Không giới hạn ý tưởng & script AI",
      "Lịch nội dung không giới hạn",
      "Thống kê nâng cao & xuất báo cáo",
      "AI Insight & gợi ý chiến lược",
      "Ưu tiên hỗ trợ 1:1",
    ],
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

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-black text-white">
      ✓
    </span>
  );
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <article
      className={`relative rounded-[28px] border bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)] ${
        plan.popular
          ? "border-emerald-300 ring-1 ring-emerald-200"
          : "border-emerald-100"
      }`}
    >
      {plan.popular ? (
        <div className="absolute right-6 top-6 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-black text-white">
          Phổ biến
        </div>
      ) : null}

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-2xl shadow-sm">
          {plan.icon}
        </div>

        <div>
          <h3 className="text-[26px] font-black tracking-[-0.04em] text-slate-950">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{plan.desc}</p>
        </div>
      </div>

      <div className="mt-8 flex items-end gap-2">
        <div className="text-[44px] font-black tracking-[-0.06em] text-slate-950">
          {plan.price}
        </div>
        <div className="pb-2 text-sm font-semibold text-slate-500">
          {plan.suffix}
        </div>
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[15px] font-medium text-slate-600">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 h-14 w-full rounded-2xl text-[15px] font-black transition ${
          plan.popular
            ? "bg-emerald-500 text-white shadow-[0_18px_35px_rgba(16,185,129,0.25)] hover:bg-emerald-600"
            : "border border-emerald-100 bg-white text-emerald-600 hover:bg-emerald-50"
        }`}
      >
        {plan.cta}
      </button>

      {plan.popular ? (
        <p className="mt-4 text-center text-xs font-medium text-slate-500">
          Không cần thẻ tín dụng • Hủy bất cứ lúc nào
        </p>
      ) : null}
    </article>
  );
}

function TrustItem({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600 ring-1 ring-emerald-100">
        {icon}
      </div>
      <div>
        <div className="text-[15px] font-black text-slate-950">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{desc}</div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[320px] max-w-[900px] rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="text-center">
          <SectionBadge>Chọn gói phù hợp để bắt đầu</SectionBadge>

          <h2 className="mx-auto mt-6 max-w-[900px] text-balance text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[48px] lg:text-[56px]">
            Bảng giá đơn giản,{" "}
            <span className="text-emerald-500">minh bạch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[640px] text-[17px] leading-8 text-slate-500">
            Chọn gói phù hợp với nhu cầu hiện tại của bạn.
            <br className="hidden sm:block" />
            Nâng cấp hoặc hạ gói bất cứ lúc nào.
          </p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-[1080px] gap-4 rounded-3xl border border-emerald-100 bg-white px-6 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:grid-cols-3">
          <TrustItem
            icon="🛡"
            title="7 ngày dùng thử miễn phí"
            desc="Trải nghiệm đầy đủ tính năng Pro"
          />
          <TrustItem
            icon="💳"
            title="Không cần thẻ tín dụng"
            desc="Đăng ký nhanh chóng, không rủi ro"
          />
          <TrustItem
            icon="🔒"
            title="Hủy bất cứ lúc nào"
            desc="Không ràng buộc, không phí ẩn"
          />
        </div>
      </div>
    </section>
  );
}