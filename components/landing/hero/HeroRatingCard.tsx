const avatars = [
  ["Q", "#0F172A"],
  ["A", "#047857"],
  ["H", "#0F766E"],
  ["M", "#334155"],
  ["T", "#065F46"],
];

export default function HeroRatingCard() {
  return (
    <div className="mt-14 inline-flex max-w-full items-center gap-4 rounded-[1.65rem] border border-emerald-100 bg-white/78 px-5 py-4 shadow-[0_20px_55px_rgba(15,118,110,0.09)] backdrop-blur-xl">
      <div className="flex -space-x-3">
        {avatars.map(([label, color]) => (
          <div
            key={label}
            className="flex size-10 items-center justify-center rounded-full border-2 border-white text-xs font-black text-white"
            style={{ backgroundColor: color }}
          >
            {label}
          </div>
        ))}

        <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-xs font-black text-white">
          +2K
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm tracking-[0.08em] text-amber-400">
            ★★★★★
          </span>
          <span className="text-sm font-black text-[#07111F]">4.9/5</span>
        </div>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Hơn 2.000 creators tin dùng mỗi ngày
        </p>
      </div>
    </div>
  );
}