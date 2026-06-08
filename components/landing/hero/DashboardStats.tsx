const menuItems = [
  "Tổng quan",
  "Hồ sơ kênh",
  "Sản phẩm",
  "Ý tưởng",
  "Kịch bản",
  "Lịch nội dung",
  "Phân tích",
];

export default function DashboardSidebar() {
  return (
    <aside className="flex min-h-full flex-col bg-[#F8FCF9] px-4 py-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#059669] text-sm text-white shadow-[0_10px_24px_rgba(5,150,105,0.20)]">
          ✨
        </div>
        <div className="text-[13px] font-extrabold leading-tight tracking-[-0.02em] text-[#07111F]">
          Content Chốt
          <br />
          Đơn
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {menuItems.map((item, index) => (
          <div
            key={item}
            className={
              index === 0
                ? "flex items-center gap-2 rounded-2xl bg-[#059669] px-3 py-3 text-[12px] font-bold text-white shadow-[0_12px_24px_rgba(5,150,105,0.18)]"
                : "flex items-center gap-2 rounded-2xl px-3 py-3 text-[12px] font-semibold text-slate-500"
            }
          >
            <span
              className={
                index === 0
                  ? "inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/30 text-[10px]"
                  : "inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px]"
              }
            >
              {index + 1}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto space-y-3 pt-6 text-[12px] font-semibold text-slate-400">
        <div>Cài đặt</div>
        <div>Đăng xuất</div>
      </div>
    </aside>
  );
}