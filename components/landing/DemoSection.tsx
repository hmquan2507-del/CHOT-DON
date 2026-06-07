import { Check, Flame, Sparkles } from "lucide-react";
import { ideas } from "./landing-data";

export default function DemoSection() {
  return (
    <section
      id="demo"
      className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-5">
            <div>
              <p className="text-sm font-medium text-white/45">
                AI Output Preview
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight">
                Một sản phẩm → nhiều góc video
              </h3>
            </div>
            <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
              Idea engine
            </div>
          </div>

          <div className="space-y-3">
            {ideas.map((idea) => (
              <div
                key={idea}
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/30 p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-violet-400/15">
                  <Sparkles className="size-4 text-violet-200" />
                </div>
                <p className="text-sm font-medium leading-6 text-white/72">
                  {idea}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-500/18 via-cyan-500/10 to-emerald-500/10 p-5 backdrop-blur-2xl sm:p-8">
          <div className="flex size-14 items-center justify-center rounded-3xl bg-white text-black">
            <Flame className="size-7" />
          </div>
          <h3 className="mt-8 text-3xl font-black tracking-[-0.04em]">
            AI gợi ý hôm nay
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/62">
            Sản phẩm “serum phục hồi” đang có nhiều góc nội dung tốt. Nên làm
            thêm video dạng lỗi người mới, review sau 7 ngày và so sánh
            trước/sau.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/35 p-5">
            <p className="text-sm font-bold text-white/85">Next best action</p>
            <div className="mt-4 space-y-3">
              {[
                "Tạo script 30s cho video review",
                "Lên lịch đăng 20:30",
                "Theo dõi view sau 24 giờ",
              ].map((task) => (
                <div key={task} className="flex items-center gap-3">
                  <Check className="size-4 text-emerald-300" />
                  <p className="text-sm text-white/58">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
