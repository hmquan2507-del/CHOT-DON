const todoItems = [
  {
    title: "Viết script video mới",
    sub: "Ưu tiên cao",
  },
  {
    title: "Đăng video TikTok",
    sub: "Hôm nay",
  },
  {
    title: "Phản hồi bình luận",
    sub: "Ưu tiên thấp",
  },
];

export default function PhoneMockup() {
  return (
    <div className="w-[178px] rounded-[32px] border border-white/80 bg-white/96 p-3.5 shadow-[0_24px_58px_rgba(15,23,42,0.14),0_18px_38px_rgba(16,185,129,0.12)] backdrop-blur-xl">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-black tracking-[-0.03em] text-slate-950">
          9:31
        </span>
        <span className="text-[15px] font-black leading-none text-slate-950">
          •••
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-[12px] font-extrabold tracking-[-0.03em] text-slate-950">
          Xin chào, Creator 👋
        </h4>
        <p className="mt-1 text-[10px] font-medium text-slate-400">
          Tổng quan hôm nay
        </p>
      </div>

      <div className="mt-4 rounded-[20px] bg-emerald-600 px-3.5 py-3.5 text-white shadow-[0_16px_30px_rgba(5,150,105,0.22)]">
        <p className="text-[9px] font-bold text-emerald-50">
          Hoàn thành kế hoạch
        </p>

        <div className="mt-2.5 flex items-end justify-between">
          <span className="text-[21px] font-black leading-none tracking-[-0.04em]">
            75%
          </span>
          <span className="text-[10px] font-bold text-emerald-100">18/24</span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-white/20">
          <div className="h-2 w-[75%] rounded-full bg-white/90" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <h5 className="text-[12px] font-extrabold tracking-[-0.03em] text-slate-950">
          Việc cần làm
        </h5>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
          3 việc
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {todoItems.map((item) => (
          <div
            key={item.title}
            className="rounded-[16px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_7px_16px_rgba(15,23,42,0.025)]"
          >
            <p className="text-[11px] font-bold leading-4 tracking-[-0.02em] text-slate-900">
              {item.title}
            </p>
            <p className="mt-1 text-[9px] font-medium text-slate-400">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3.5 rounded-[18px] border border-slate-200 bg-[#FCFCFC] px-3 py-2.5">
        <div className="grid grid-cols-4 items-end gap-1.5 text-center">
          <span className="text-[8px] font-medium leading-3 text-slate-400">
            Tổng
            <br />
            quan
          </span>

          <span className="text-[8px] font-medium leading-3 text-slate-400">
            Lịch
          </span>

          <div className="flex flex-col items-center gap-1">
            <span className="flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[12px] font-black text-white shadow-[0_8px_16px_rgba(5,150,105,0.22)]">
              +
            </span>
            <span className="text-[8px] font-medium leading-3 text-slate-400">
              Ý tưởng
            </span>
          </div>

          <span className="text-[8px] font-medium leading-3 text-slate-400">
            Cá
            <br />
            nhân
          </span>
        </div>
      </div>
    </div>
  );
}