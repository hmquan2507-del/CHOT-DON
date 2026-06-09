export default function MiniStatsCard() {
  const bars = [24, 38, 30, 52, 42, 58];

  return (
    <div className="h-[220px] w-[136px] rounded-3xl border border-[rgba(15,169,104,0.10)] bg-white/90 p-4 shadow-[0_24px_60px_rgba(16,54,40,0.10)] backdrop-blur-md">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-black leading-4 text-[#1E293B]">
          Hiệu suất nội dung
        </p>

        <p className="whitespace-nowrap text-[9px] font-bold text-[#8A9AB0]">
          7 ngày qua
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#EAF2ED] bg-white p-3">
        <p className="text-[10px] font-medium leading-4 text-[#8A9AB0]">
          Tổng lượt hoạt động
        </p>

        <p className="mt-1 text-[28px] font-black leading-none tracking-[-0.04em] text-[#081226]">
          342
        </p>

        <p className="mt-2 text-[10px] font-black leading-4 text-[#0EA968]">
          +24.5% so với tuần trước
        </p>

        <div className="mt-5 flex h-[56px] items-end justify-between gap-1.5">
          {bars.map((height, index) => (
            <div
              key={`${height}-${index}`}
              className={`w-2.5 rounded-full ${
                index % 2 === 0 ? "bg-[#8EE7BC]" : "bg-[#18B46D]"
              }`}
              style={{ height }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}