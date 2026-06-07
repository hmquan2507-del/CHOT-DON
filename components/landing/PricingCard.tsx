import { Check } from "lucide-react";

export default function PricingCard({
  name,
  price,
  desc,
  items,
  featured = false,
}: {
  name: string;
  price: string;
  desc: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl ${
        featured
          ? "border-white/20 bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.14)]"
          : "border-white/10 bg-white/[0.045] text-white"
      }`}
    >
      {featured && (
        <div className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-xs font-black text-white">
          Khuyên dùng
        </div>
      )}

      <p
        className={`text-sm font-black ${
          featured ? "text-black/55" : "text-white/45"
        }`}
      >
        {name}
      </p>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-5xl font-black tracking-[-0.06em]">{price}</span>
        {name !== "Free" && (
          <span
            className={`pb-2 text-sm ${
              featured ? "text-black/45" : "text-white/35"
            }`}
          >
            /tháng
          </span>
        )}
      </div>

      <p
        className={`mt-4 min-h-12 text-sm leading-7 ${
          featured ? "text-black/55" : "text-white/50"
        }`}
      >
        {desc}
      </p>

      <div className="mt-7 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <Check
              className={`mt-0.5 size-4 shrink-0 ${
                featured ? "text-emerald-600" : "text-emerald-300"
              }`}
            />
            <p
              className={`text-sm ${
                featured ? "text-black/70" : "text-white/60"
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>

      <a
        href="#"
        className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-1 ${
          featured
            ? "bg-black text-white"
            : "border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
        }`}
      >
        Chọn gói này
      </a>
    </div>
  );
}
