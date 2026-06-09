import { BadgeDollarSign, BriefcaseBusiness, Link2, Percent } from "lucide-react";

type ProductStatsData = {
  totalProducts: number;
  affiliateProducts: number;
  averageCommission: number;
  potentialValue: number;
};

type ProductStatsProps = {
  stats: ProductStatsData;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }

  return formatCurrency(value);
}

function MiniSparkline({ index }: { index: number }) {
  const patterns = [
    "M0,20 Q10,5 20,15 T40,5 T60,18",
    "M0,15 Q15,25 30,10 T60,5",
    "M0,5 Q15,20 30,5 T60,15",
    "M0,25 Q15,5 30,20 T60,10",
  ];
  
  const path = patterns[index % patterns.length];

  return (
    <div className="flex h-10 w-20 items-end justify-end opacity-60">
      <svg viewBox="0 0 60 30" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          className="text-emerald-400"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function ProductStats({ stats }: ProductStatsProps) {
  const cards = [
    {
      label: "Tổng sản phẩm",
      value: stats.totalProducts.toString(),
      helper: "Sản phẩm đã lưu",
      icon: BriefcaseBusiness,
    },
    {
      label: "Có link affiliate",
      value: stats.affiliateProducts.toString(),
      helper: "Có thể gắn nội dung",
      icon: Link2,
    },
    {
      label: "Hoa hồng trung bình",
      value: `${stats.averageCommission.toFixed(1)}%`,
      helper: "Tính từ sản phẩm có %",
      icon: Percent,
    },
    {
      label: "Giá trị tiềm năng",
      value: formatCompactCurrency(stats.potentialValue),
      helper: "Ước tính theo hoa hồng",
      icon: BadgeDollarSign,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="flex flex-col rounded-[24px] border border-slate-200/60 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon className="h-7 w-7" />
              </div>

              <MiniSparkline index={index} />
            </div>

            <p className="mt-5 text-sm font-bold text-slate-500">
              {card.label}
            </p>

            <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {card.value}
            </p>

            <div className="mt-auto pt-3">
              <p className="text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-full">
                {card.helper}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
