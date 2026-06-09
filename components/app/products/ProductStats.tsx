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

function MiniSparkline() {
  const heights = [12, 16, 15, 22, 18, 26, 20, 30];

  return (
    <div className="flex h-9 items-end gap-1">
      {heights.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="w-2 rounded-full bg-emerald-400/70"
          style={{ height }}
        />
      ))}
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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon className="h-6 w-6" />
              </div>

              <MiniSparkline />
            </div>

            <p className="mt-4 text-sm font-bold text-slate-500">
              {card.label}
            </p>

            <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-slate-950">
              {card.value}
            </p>

            <p className="mt-2 text-xs font-semibold text-emerald-600">
              {card.helper}
            </p>
          </div>
        );
      })}
    </div>
  );
}