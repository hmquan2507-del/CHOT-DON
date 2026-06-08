export default function FloatingChannelCard() {
  return (
    <div className="flex min-w-[250px] items-center justify-between gap-4 rounded-[24px] border border-[#DDEBE4] bg-white/96 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E7EBC8] bg-[#FBFBEF] text-[#059669]">
          🧴
        </div>

        <div>
          <p className="text-[11px] font-semibold text-slate-400">Kênh chính</p>
          <p className="text-[15px] font-extrabold text-[#07111F]">Beauty Care</p>
          <p className="mt-0.5 text-[12px] font-medium text-slate-400">158K followers</p>
        </div>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#059669] text-white shadow-[0_12px_24px_rgba(5,150,105,0.20)]">
        ↗
      </div>
    </div>
  );
}