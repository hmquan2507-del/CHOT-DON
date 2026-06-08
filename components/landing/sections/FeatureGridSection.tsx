import {
  BarChart3,
  CalendarDays,
  FileText,
  Lightbulb,
  Library,
  MessageSquareText,
  NotepadText,
  UserRound,
} from "lucide-react";

const features = [
  {
    icon: UserRound,
    title: "Channel Profile",
    desc: "Tạo hồ sơ kênh chi tiết, xác định định vị và chuẩn nội dung rõ ràng.",
  },
  {
    icon: Library,
    title: "Product Library",
    desc: "Lưu sản phẩm, link affiliate, ưu đãi và góc nội dung có thể khai thác.",
  },
  {
    icon: Lightbulb,
    title: "AI Content Ideas",
    desc: "AI gợi ý hàng trăm ý tưởng video theo ngách, sản phẩm và xu hướng mới.",
  },
  {
    icon: MessageSquareText,
    title: "AI Script Generator",
    desc: "Tạo script video ngắn 15s/30s/60s với hook, nội dung và CTA rõ ràng.",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    desc: "Lên lịch nội dung 30 ngày, biết hôm nay cần đăng gì và tối ưu ra sao.",
  },
  {
    icon: BarChart3,
    title: "Manual Metrics",
    desc: "Nhập số liệu video thủ công: view, like, comment, share, order, revenue.",
  },
  {
    icon: NotepadText,
    title: "AI Suggestions",
    desc: "AI phân tích số liệu và gợi ý nội dung nên làm tiếp để tăng chuyển đổi.",
  },
  {
    icon: FileText,
    title: "30-day Content Plan",
    desc: "Kế hoạch nội dung 30 ngày chi tiết cho TikTok, Reels, Shorts và Facebook.",
  },
];

export default function FeatureGridSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[520px] bg-[radial-gradient(circle_at_10%_80%,rgba(16,185,129,0.15),transparent_32%),radial-gradient(circle_at_90%_70%,rgba(16,185,129,0.12),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-[1160px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
            <span className="text-amber-400">⚡</span>
            Đầy đủ công cụ giúp bạn biến kênh dễ đăng thành hệ thống
          </div>

          <h2 className="mt-5 text-[2.35rem] font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[3rem]">
            Tất cả tính năng trong{" "}
            <span className="text-emerald-600">một nền tảng.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group flex gap-4 rounded-[1.35rem] border border-emerald-100/90 bg-white/92 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.045)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(5,150,105,0.1)]"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="size-6" />
                </div>

                <div>
                  <h3 className="text-base font-black tracking-[-0.03em] text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                    {feature.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}