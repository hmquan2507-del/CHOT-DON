function MiniCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[190px] rotate-[-5deg] rounded-2xl border border-emerald-100 bg-white p-4 shadow-[0_22px_50px_rgba(15,23,42,0.08)]">
      <div className="text-sm font-black text-slate-700">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CheckText({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
        ✓
      </span>
      {children}
    </span>
  );
}

export default function FinalCTASection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-8 shadow-[0_28px_80px_rgba(16,185,129,0.12)] lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[260px]">
            <div className="absolute left-4 top-6">
              <MiniCard title="Nội dung gợi ý">
                <div className="space-y-2">
                  {["So sánh khi dùng serum", "Review Serum Rau Má", "Cách layer serum cho da dầu mụn"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-slate-600"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>

                <button className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-600">
                  + Tạo thêm ý tưởng
                </button>
              </MiniCard>
            </div>

            <div className="absolute left-[210px] top-12 hidden sm:block">
              <MiniCard title="Hiệu suất hôm nay">
                <div className="text-xs text-slate-500">Views</div>
                <div className="mt-1 text-2xl font-black text-slate-950">
                  128.4K
                </div>
                <div className="mt-1 text-xs font-black text-emerald-500">
                  +32.5%
                </div>
                <svg viewBox="0 0 160 70" className="mt-3 h-[70px] w-full">
                  <path
                    d="M8 60 C28 52, 35 48, 48 50 C70 53, 76 35, 95 32 C116 29, 124 22, 150 10"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </MiniCard>
            </div>

            <div className="absolute bottom-3 left-24 flex items-center gap-4 rounded-full border border-emerald-100 bg-white px-5 py-4 shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl text-white">
                ✣
              </span>
              <span className="text-[18px] font-black text-slate-800">
                AI đang gợi ý...
              </span>
              <span className="text-xl text-emerald-400">✦</span>
            </div>
          </div>

          <div>
            <h2 className="max-w-[620px] text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[48px] lg:text-[58px]">
              Bắt đầu xây hệ thống nội dung chốt đơn{" "}
              <span className="text-emerald-500">ngay hôm nay.</span>
            </h2>

            <p className="mt-5 max-w-[620px] text-[18px] leading-8 text-slate-600">
              Để AI đồng hành cùng bạn – từ ý tưởng đến hiệu suất. Tiết kiệm
              thời gian, tăng doanh thu mỗi ngày.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="h-14 rounded-2xl bg-emerald-500 px-8 text-[16px] font-black text-white shadow-[0_20px_40px_rgba(16,185,129,0.25)] hover:bg-emerald-600">
                Bắt đầu miễn phí ✦
              </button>

              <button className="h-14 rounded-2xl border border-emerald-100 bg-white px-8 text-[16px] font-black text-emerald-600 hover:bg-emerald-50">
                Xem dashboard mẫu 👁
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-5">
              <CheckText>7 ngày dùng thử</CheckText>
              <CheckText>Không cần thẻ</CheckText>
              <CheckText>Hủy bất cứ lúc nào</CheckText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}