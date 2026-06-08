import { ShieldCheck, Zap, Sparkles } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Không cần thẻ tín dụng",
    description: "Dùng thử full tính năng",
  },
  {
    icon: Zap,
    title: "Thiết lập trong 2 phút",
    description: "Có dashboard cá nhân ngay",
  },
  {
    icon: Sparkles,
    title: "Tối ưu mỗi ngày",
    description: "AI đồng hành cùng bạn",
  },
];

export default function HeroTrustBar() {
  return (
    <div className="mt-9 grid max-w-[580px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
      {trustItems.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.title} className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50/90 text-emerald-600 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-6 tracking-[-0.02em] text-slate-900">
                {item.title}
              </p>
              <p className="mt-1 text-[14px] leading-6 tracking-[-0.015em] text-slate-500">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}