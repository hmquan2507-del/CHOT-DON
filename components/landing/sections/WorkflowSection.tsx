import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Package,
  PenTool,
  UserRound,
} from "lucide-react";

const steps = [
  {
    icon: UserRound,
    number: "01",
    title: "Tạo hồ sơ kênh",
    desc: "Nhập ngách, mục tiêu, đối tượng và phong cách nội dung của bạn.",
    visual: "profile",
  },
  {
    icon: Package,
    number: "02",
    title: "Thêm sản phẩm",
    desc: "Thêm sản phẩm hoặc link affiliate bạn muốn đẩy bán.",
    visual: "bag",
  },
  {
    icon: CalendarDays,
    number: "03",
    title: "AI tạo kế hoạch 30 ngày",
    desc: "AI phân tích và tạo kế hoạch nội dung chi tiết cho 30 ngày đầu tiên.",
    visual: "calendar",
  },
  {
    icon: PenTool,
    number: "04",
    title: "Chọn ý tưởng & tạo script",
    desc: "Chọn ý tưởng video, AI viết script 15s/30s/60s, caption, hashtag.",
    visual: "video",
  },
  {
    icon: ClipboardList,
    number: "05",
    title: "Đăng nội dung & tối ưu",
    desc: "Đăng video, theo dõi hiệu quả và nhận gợi ý nội dung nên làm tiếp.",
    visual: "growth",
  },
];

function StepVisual({ type }: { type: string }) {
  if (type === "bag") {
    return (
      <div className="relative mx-auto mt-6 h-24 w-28">
        <div className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 rounded-[1.4rem] bg-gradient-to-b from-emerald-300 to-emerald-600 shadow-[0_18px_35px_rgba(5,150,105,0.2)]" />
        <div className="absolute left-1/2 top-2 h-8 w-12 -translate-x-1/2 rounded-t-full border-[6px] border-emerald-200 border-b-0" />
        <div className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-md">
          <CheckCircle2 className="size-5" />
        </div>
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className="relative mx-auto mt-6 h-24 w-28">
        <div className="absolute bottom-0 left-1/2 h-20 w-24 -translate-x-1/2 rounded-[1.35rem] border border-emerald-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="h-5 rounded-t-[1.35rem] bg-emerald-100" />
          <div className="grid grid-cols-3 gap-2 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="h-2.5 rounded-full bg-emerald-100"
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-1 right-0 flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
          <CheckCircle2 className="size-5" />
        </div>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="relative mx-auto mt-6 h-24 w-28">
        <div className="absolute bottom-3 left-2 h-16 w-20 rounded-[1.2rem] border border-emerald-100 bg-white shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
          <div className="m-3 h-3 w-10 rounded-full bg-emerald-100" />
          <div className="mx-3 h-3 w-14 rounded-full bg-slate-100" />
        </div>
        <div className="absolute bottom-0 right-2 flex size-12 items-center justify-center rounded-[1.1rem] bg-emerald-500 text-white shadow-[0_18px_35px_rgba(5,150,105,0.2)]">
          ▶
        </div>
      </div>
    );
  }

  if (type === "growth") {
    return (
      <div className="relative mx-auto mt-6 h-24 w-28">
        <div className="absolute bottom-0 left-3 flex h-20 items-end gap-2">
          {[32, 46, 62, 78].map((height, index) => (
            <span
              key={index}
              className="w-4 rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-200"
              style={{ height }}
            />
          ))}
        </div>
        <ArrowRight className="absolute right-1 top-2 size-10 -rotate-45 text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-6 h-24 w-28">
      <div className="absolute bottom-3 left-1/2 h-18 w-24 -translate-x-1/2 rounded-[1.35rem] border border-emerald-100 bg-white shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
        <div className="m-3 h-3 w-12 rounded-full bg-emerald-100" />
        <div className="mx-3 h-3 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="absolute bottom-0 right-1 flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
        <CheckCircle2 className="size-5" />
      </div>
    </div>
  );
}

export default function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.14]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-emerald-600 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
            <span className="text-amber-400">✦</span>
            Chỉ 5 bước đơn giản để có hệ thống nội dung chốt đơn
          </div>

          <h2 className="mt-5 text-[2.45rem] font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-[3.1rem]">
            Làm kênh{" "}
            <span className="text-emerald-600">rõ ràng hơn</span> từ ngày
            đầu tiên.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="relative rounded-[1.75rem] border border-emerald-100/90 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon className="size-6" />
                  </div>

                  <p className="text-base font-black text-emerald-600">
                    {step.number}
                  </p>
                </div>

                <h3 className="mt-6 text-[1.05rem] font-black leading-snug tracking-[-0.03em] text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
                  {step.desc}
                </p>

                <StepVisual type={step.visual} />

                {index < steps.length - 1 ? (
                  <div className="absolute -right-4 top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-500 shadow-md lg:flex">
                    <ArrowRight className="size-5" />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}