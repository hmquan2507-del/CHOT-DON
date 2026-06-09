import { CheckCircle2, LayoutTemplate, type LucideIcon } from "lucide-react";
import Link from "next/link";

type ComingSoonPageProps = {
  title: string;
  badge: string;
  subtitle: string;
  checklist: string[];
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  phaseNote?: string;
  icon?: LucideIcon;
};

export default function ComingSoonPage({
  title,
  badge,
  subtitle,
  checklist,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  phaseNote = "Module này sẽ được xây dựng ở phase tiếp theo.",
  icon: Icon = LayoutTemplate,
}: ComingSoonPageProps) {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4">
        <div>
          <div className="mb-3 inline-flex items-center rounded-full bg-emerald-50 px-3.5 py-1 text-[13px] font-black text-emerald-600 ring-1 ring-emerald-500/20">
            {badge}
          </div>
          <h1 className="text-[30px] font-black leading-tight tracking-[-0.05em] text-[#07111F] sm:text-[34px]">
            {title}
          </h1>
          <p className="mt-2 text-[14px] font-medium text-slate-500 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_350px]">
        <article className="rounded-[24px] border border-[#DDEBE4] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:p-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Icon className="h-8 w-8" strokeWidth={2} />
          </div>

          <h2 className="mb-5 text-[20px] font-black tracking-[-0.03em] text-[#07111F]">
            Tính năng sắp ra mắt
          </h2>

          <ul className="mb-8 space-y-3.5">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-600">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span className="text-[14px] font-medium leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <button
              disabled
              className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-xl bg-[#07111F] px-6 text-[14px] font-bold text-white opacity-50 transition"
            >
              {primaryLabel}
            </button>
            <Link
              href={secondaryHref}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-[14px] font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {secondaryLabel}
            </Link>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[24px] border border-blue-100 bg-[#F0F6FF] p-6">
            <h3 className="mb-2 text-[14px] font-black text-[#1E3A8A]">
              Trạng thái hiện tại
            </h3>
            <p className="text-[13px] font-medium leading-relaxed text-[#1E3A8A]/80">
              {phaseNote}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
