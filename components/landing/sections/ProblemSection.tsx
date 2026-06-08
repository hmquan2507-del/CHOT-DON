import {
  BarChart3,
  HelpCircle,
  MessageCircleQuestion,
  PenLine,
} from "lucide-react";

const problems = [
  {
    icon: HelpCircle,
    number: "01",
    title: "Không biết chọn ngách nào",
    desc: "Quá nhiều lựa chọn, không biết ngách nào phù hợp để bắt đầu.",
  },
  {
    icon: MessageCircleQuestion,
    number: "02",
    title: "Không biết đăng gì mỗi ngày",
    desc: "Bị ý tưởng rời rạc, hôm nay đăng được nhưng mai lại bí nội dung.",
  },
  {
    icon: PenLine,
    number: "03",
    title: "Không biết viết hook/script",
    desc: "Có sản phẩm nhưng không biết biến thành video ngắn dễ xem, dễ bán.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Không biết xem số liệu để làm gì tiếp",
    desc: "Đăng video nhưng không biết tối ưu hướng nội dung nào để kéo đơn.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,rgba(16,185,129,0.09),transparent_30%),radial-gradient(circle_at_90%_35%,rgba(16,185,129,0.08),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.18]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
            <span className="text-amber-400">✦</span>
            Nỗi đau của người mới bắt đầu
          </div>

          <h2 className="mt-6 text-[2.65rem] font-black leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-[3.25rem] lg:text-[3.65rem]">
            Vì sao bạn mãi không
            <br />
            xây được{" "}
            <span className="text-emerald-600">kênh bán hàng?</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="relative rounded-[1.75rem] border border-emerald-100/90 bg-white/90 px-7 pb-7 pt-10 shadow-[0_24px_70px_rgba(15,23,42,0.055)] backdrop-blur-sm"
              >
                <div className="absolute -top-7 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-[0_14px_30px_rgba(5,150,105,0.12)]">
                  <Icon className="size-6" strokeWidth={2.3} />
                </div>

                <p className="text-sm font-black text-emerald-600">
                  {item.number}
                </p>

                <h3 className="mt-5 text-[1.18rem] font-black leading-snug tracking-[-0.035em] text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 text-[0.98rem] font-medium leading-8 text-slate-500">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}