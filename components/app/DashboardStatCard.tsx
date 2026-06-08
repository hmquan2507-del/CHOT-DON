import type { LucideIcon } from "lucide-react";
import { MoreVertical } from "lucide-react";

type DashboardStatCardProps = {
  title: string;
  value: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  accent?: "emerald" | "blue" | "amber" | "purple";
  progress?: number;
  chart?: number[];
};

const accentStyles = {
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    cta: "text-emerald-600",
    bar: "bg-emerald-500",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    cta: "text-emerald-600",
    bar: "bg-blue-500",
  },
  amber: {
    icon: "bg-amber-50 text-amber-500",
    cta: "text-emerald-600",
    bar: "bg-amber-500",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600",
    cta: "text-emerald-600",
    bar: "bg-purple-500",
  },
};

export default function DashboardStatCard({
  title,
  value,
  description,
  cta,
  icon: Icon,
  accent = "emerald",
  progress,
  chart,
}: DashboardStatCardProps) {
  const styles = accentStyles[accent];

  return (
    <article className="rounded-[24px] border border-[#DDEBE4] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${styles.icon}`}>
          <Icon className="h-5 w-5" strokeWidth={2.3} />
        </div>

        <button className="rounded-xl p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
          <MoreVertical className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-5">
        <h3 className="text-[14px] font-black text-slate-700">{title}</h3>

        <div className="mt-3 text-[32px] font-black leading-none tracking-[-0.05em] text-[#07111F]">
          {value}
        </div>

        <p className="mt-3 text-[13px] font-medium leading-5 text-slate-500">
          {description}
        </p>
      </div>

      {typeof progress === "number" ? (
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${styles.bar}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[13px] font-bold text-slate-500">
              {progress}%
            </span>
          </div>
        </div>
      ) : null}

      {chart ? (
        <div className="mt-5 flex h-12 items-end gap-2">
          {chart.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="w-3 rounded-t-full bg-gradient-to-t from-emerald-500 to-emerald-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      ) : null}

      <button className={`mt-5 text-[13px] font-black ${styles.cta}`}>
        {cta} →
      </button>
    </article>
  );
}