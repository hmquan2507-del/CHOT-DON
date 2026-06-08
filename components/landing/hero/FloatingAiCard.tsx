export default function FloatingAiCard() {
  return (
    <div className="flex min-w-[220px] items-center gap-3 rounded-[24px] border border-[#DDEBE4] bg-white/96 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-xl text-[#059669]">
        ✨
      </div>

      <div>
        <p className="text-[15px] font-extrabold text-[#07111F]">AI đồng hành</p>
        <p className="mt-1 text-[12px] font-medium text-slate-400">Gợi ý mỗi ngày</p>
      </div>
    </div>
  );
}