const bars = [72, 110, 82, 132, 96, 148, 118];

export default function DashboardChartCard() {
  return (
    <div className="rounded-[24px] border border-[#E6EFEA] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[15px] font-extrabold text-[#07111F]">
            Hiệu suất nội dung
          </h4>
          <p className="mt-1 text-[11px] text-slate-400">7 ngày qua</p>
        </div>

        <button className="rounded-xl border border-[#E6EFEA] px-3 py-1.5 text-[11px] font-semibold text-slate-400">
          7 ngày qua
        </button>
      </div>

      <div className="mt-5 flex h-[210px] items-end gap-4 rounded-[20px] bg-[linear-gradient(to_top,rgba(248,252,249,1),rgba(255,255,255,1))] px-4 pb-6 pt-4">
        {bars.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center justify-end gap-3">
            <div className="flex w-full items-end justify-center">
              <div
                className="w-full max-w-[34px] rounded-t-[14px] bg-gradient-to-t from-[#10B981] to-[#9BE7C4]"
                style={{ height: `${height}px` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"][index]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-[11px] font-medium text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
          Lượt xem
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#9BE7C4]" />
          Tương tác
        </div>
      </div>

      <button className="mt-4 text-[12px] font-bold text-[#059669]">
        Xem báo cáo chi tiết →
      </button>
    </div>
  );
}