"use client";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  Clapperboard,
  FileText,
  Flame,
  Layers3,
  LineChart,
  Menu,
  Play,
  Rocket,
  Sparkles,
  Target,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Target,
    title: "Channel DNA",
    desc: "Tạo định vị kênh, tệp người xem, giọng nội dung và hướng kiếm tiền rõ ràng.",
  },
  {
    icon: Layers3,
    title: "Affiliate Library",
    desc: "Lưu sản phẩm, hoa hồng, link affiliate và các góc nội dung có thể khai thác.",
  },
  {
    icon: Wand2,
    title: "AI Idea Engine",
    desc: "Tạo ý tưởng video theo ngách, sản phẩm, mục tiêu tăng view hoặc chốt đơn.",
  },
  {
    icon: Clapperboard,
    title: "Script Studio",
    desc: "Viết hook, cảnh quay, voice over, text on screen và CTA cho video ngắn.",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    desc: "Theo dõi nội dung từ ý tưởng, quay, edit, đăng bài đến tối ưu lại.",
  },
  {
    icon: LineChart,
    title: "Manual Metrics",
    desc: "Nhập view, like, comment, đơn hàng để AI gợi ý hướng nội dung tiếp theo.",
  },
];

const workflow = [
  "Tạo hồ sơ kênh",
  "Thêm sản phẩm",
  "Tạo ý tưởng",
  "Viết script",
  "Lên lịch",
  "Đo hiệu quả",
];

const ideas = [
  "3 lỗi khiến video affiliate có view nhưng không ra đơn",
  "Cách biến một sản phẩm thành 10 video ngắn",
  "Review sản phẩm dưới 200k cho người mới",
  "Video đầu tiên cho người mới làm TikTok Shop Affiliate",
];

export default function ModernLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050712] font-sans text-white antialiased">
      <AnimatedBackground />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050712]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.18)]">
              <Sparkles className="size-5" />
              <span className="absolute -right-1 -top-1 size-3 rounded-full bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.95)]" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight">
                Content Chốt Đơn
              </p>
              <p className="hidden text-xs text-white/45 sm:block">
                AI Creator Operating System
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-white/55 md:flex">
            <a href="#features" className="transition hover:text-white">
              Tính năng
            </a>
            <a href="#workflow" className="transition hover:text-white">
              Quy trình
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Bảng giá
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="hidden rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(255,255,255,0.22)] sm:inline-flex"
            >
              Dùng thử
              <ArrowRight className="ml-2 size-4" />
            </a>
            <button className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] md:hidden">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-10 pt-28 sm:px-6 lg:min-h-[820px] lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="relative z-10"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-white/70 shadow-2xl backdrop-blur-xl"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-cyan-400/15">
              <Zap className="size-3.5 text-cyan-300" />
            </span>
            Built for TikTok Affiliate · Shorts · Reels
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl"
          >
            Xây kênh bán hàng{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              có hệ thống
            </span>{" "}
            từ con số 0.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg"
          >
            AI giúp người mới chọn hướng kênh, thêm sản phẩm affiliate, tạo lịch
            nội dung 30 ngày, viết script video ngắn và biết hôm nay nên làm gì.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#pricing"
              className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(255,255,255,0.25)]"
            >
              Bắt đầu xây kênh
              <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.045] px-6 py-3 text-sm font-bold text-white/85 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <Play className="mr-2 size-4" />
              Xem demo sản phẩm
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid max-w-xl grid-cols-3 gap-3"
          >
            {[
              ["30 ngày", "Lịch nội dung"],
              ["100+", "Ý tưởng video"],
              ["AI", "Script bán hàng"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-black tracking-tight">{value}</p>
                <p className="mt-1 text-xs leading-5 text-white/45">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroMockup />
      </section>

      <Marquee />

      <section
        id="features"
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl">
            <Sparkles className="size-7 text-cyan-200" />
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-[-0.055em] sm:text-5xl">
            Một hệ điều hành nhỏ cho creator bán hàng.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/55">
            Không phải app viết caption. Đây là flow giúp người mới đi từ ngách,
            sản phẩm, ý tưởng, script, lịch đăng đến số liệu.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.075]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-white text-black">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-black tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/52">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section
        id="workflow"
        className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-medium text-white/60">
                <Rocket className="size-4 text-emerald-300" />
                MVP flow
              </div>
              <h2 className="text-4xl font-black leading-tight tracking-[-0.055em] sm:text-5xl">
                Làm từng bước. Không bị rối.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/55">
                V1 chưa cần tạo video tự động. V1 phải giải quyết đúng nỗi đau:
                người mới không biết bắt đầu từ đâu và hôm nay đăng gì.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {workflow.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group flex items-center justify-between rounded-3xl border border-white/10 bg-black/30 p-5 transition hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-black">
                      {index + 1}
                    </div>
                    <p className="font-bold text-white/85">{item}</p>
                  </div>
                  <ChevronRight className="size-5 text-white/25 transition group-hover:translate-x-1 group-hover:text-white" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              <p className="text-sm font-bold text-white/85">
                Next best action
              </p>
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

      <section
        id="pricing"
        className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black leading-tight tracking-[-0.055em] sm:text-5xl">
            Bắt đầu nhỏ. Bán được rồi mới mở rộng.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/55">
            V1 có thể bán thủ công trước. Khi có người dùng thật, mới tích hợp
            thanh toán, giới hạn AI usage và subscription.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <PricingCard
            name="Free"
            price="0đ"
            desc="Dành cho người mới test flow xây kênh."
            items={[
              "1 hồ sơ kênh",
              "5 sản phẩm affiliate",
              "10 ý tưởng mẫu",
              "3 script ngắn",
            ]}
          />
          <PricingCard
            featured
            name="Starter"
            price="99k"
            desc="Dành cho người mới muốn có lịch đăng đều."
            items={[
              "1 hồ sơ kênh",
              "20 sản phẩm",
              "100 ý tưởng/tháng",
              "50 script/tháng",
              "Lịch nội dung 30 ngày",
            ]}
          />
          <PricingCard
            name="Pro"
            price="199k"
            desc="Dành cho creator nhỏ muốn tối ưu nội dung."
            items={[
              "3 hồ sơ kênh",
              "Không giới hạn sản phẩm",
              "300 script/tháng",
              "Theo dõi hiệu quả video",
              "AI gợi ý nội dung tiếp theo",
            ]}
          />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-8 text-black sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-cyan-300 blur-3xl" />
          <div className="absolute -bottom-24 left-16 size-72 rounded-full bg-violet-300 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black leading-tight tracking-[-0.06em] sm:text-5xl">
              Tạo sản phẩm nhỏ, đẹp, rõ giá trị — rồi bán thử ngay.
            </h2>
            <p className="mt-5 text-base leading-8 text-black/60">
              Content Chốt Đơn V1 chỉ cần giúp người mới từ “không biết đăng gì”
              thành “có lịch, có script, có việc cần làm hôm nay”.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1"
              >
                Bắt đầu V1
                <ArrowRight className="ml-2 size-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-black text-black transition hover:-translate-y-1"
              >
                Xem tính năng
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Content Chốt Đơn.</p>
          <p>AI Content Planner for creators, sellers & affiliates.</p>
        </div>
      </footer>
    </main>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 90, -40, 0],
          y: [0, -70, 45, 0],
          scale: [1, 1.15, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-14rem] top-[-14rem] size-[34rem] rounded-full bg-cyan-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -70, 80, 0],
          y: [0, 75, -40, 0],
          scale: [1, 0.92, 1.18, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-12rem] top-[16rem] size-[36rem] rounded-full bg-violet-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -45, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-14rem] left-[26%] size-[38rem] rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(5,7,18,0.2)_45%,rgba(5,7,18,0.96)_100%)]" />
    </div>
  );
}

function Marquee() {
  const items = [
    "Tạo hồ sơ kênh",
    "Thêm sản phẩm affiliate",
    "AI tạo 30 ý tưởng",
    "Viết script ngắn",
    "Lên lịch đăng",
    "Theo dõi hiệu quả",
  ];

  return (
    <section className="relative z-10 border-y border-white/10 bg-[#070A16]/85 py-4 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#050712] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#050712] to-transparent" />

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="flex min-w-max gap-3 pr-3"
        >
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white/70 shadow-sm backdrop-blur-xl"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-cyan-400/15">
                <Sparkles className="size-3.5 text-cyan-300" />
              </span>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.15 }}
      className="relative z-10"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#090B12]/95">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-yellow-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/45">
                app.contentchotdon.ai
              </div>
            </div>

            <div className="grid min-h-[500px] lg:grid-cols-[190px_1fr]">
              <aside className="hidden border-r border-white/10 p-4 lg:block">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-white text-black">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black">Creator OS</p>
                    <p className="text-xs text-white/35">Workspace</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    "Dashboard",
                    "Channel DNA",
                    "Products",
                    "Ideas",
                    "Scripts",
                    "Calendar",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-2xl px-3 py-2 text-sm font-bold ${
                        index === 0 ? "bg-white text-black" : "text-white/42"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-white/40">Xin chào, Quân</p>
                    <h3 className="mt-1 text-2xl font-black tracking-tight">
                      Hôm nay nên đăng gì?
                    </h3>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-black text-black">
                    <Wand2 className="mr-2 size-4" />
                    Generate
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Channel score", "82%"],
                    ["Ideas ready", "30"],
                    ["Best niche", "Beauty"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-3xl border border-white/10 bg-white/[0.045] p-4"
                    >
                      <p className="text-xs text-white/35">{label}</p>
                      <p className="mt-2 text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-black">Content pipeline</p>
                      <BarChart3 className="size-5 text-white/35" />
                    </div>

                    <div className="space-y-3">
                      {[
                        ["3 lỗi khiến video affiliate không ra đơn", "Script"],
                        ["Review sản phẩm dưới 200k", "Scheduled"],
                        ["Một sản phẩm tạo 10 video", "Draft"],
                      ].map(([title, status]) => (
                        <div
                          key={title}
                          className="rounded-2xl border border-white/10 bg-black/30 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-bold leading-6 text-white/80">
                              {title}
                            </p>
                            <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-bold text-cyan-200">
                              {status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-violet-300/20 bg-violet-400/10 p-4">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-violet-300/20">
                      <Sparkles className="size-5 text-violet-100" />
                    </div>
                    <p className="font-black">AI Suggestion</p>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      Tập trung video dạng “lỗi người mới” vì nhóm này giữ chân
                      tốt hơn video review thông thường.
                    </p>

                    <div className="mt-5 h-24 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="mb-3 h-2 w-2/3 rounded-full bg-white/20" />
                      <div className="mb-3 h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FloatingCard
            className="-left-6 top-16 hidden lg:block"
            icon={FileText}
            title="Script 30s"
            desc="Hook + scenes ready"
          />
          <FloatingCard
            className="-right-8 bottom-16 hidden lg:block"
            icon={Flame}
            title="Viral angle"
            desc="Educational review"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingCard({
  className,
  icon: Icon,
  title,
  desc,
}: {
  className: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-3xl border border-white/10 bg-black/65 p-4 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-black">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-sm font-black">{title}</p>
          <p className="text-xs text-white/42">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PricingCard({
  name,
  price,
  desc,
  items,
  featured = false,
}: {
  name: string;
  price: string;
  desc: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl ${
        featured
          ? "border-white/20 bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.14)]"
          : "border-white/10 bg-white/[0.045] text-white"
      }`}
    >
      {featured && (
        <div className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-xs font-black text-white">
          Khuyên dùng
        </div>
      )}

      <p
        className={`text-sm font-black ${
          featured ? "text-black/55" : "text-white/45"
        }`}
      >
        {name}
      </p>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-5xl font-black tracking-[-0.06em]">{price}</span>
        {name !== "Free" && (
          <span
            className={`pb-2 text-sm ${
              featured ? "text-black/45" : "text-white/35"
            }`}
          >
            /tháng
          </span>
        )}
      </div>
      <p
        className={`mt-4 min-h-12 text-sm leading-7 ${
          featured ? "text-black/55" : "text-white/50"
        }`}
      >
        {desc}
      </p>

      <div className="mt-7 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <Check
              className={`mt-0.5 size-4 shrink-0 ${
                featured ? "text-emerald-600" : "text-emerald-300"
              }`}
            />
            <p
              className={`text-sm ${
                featured ? "text-black/70" : "text-white/60"
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>

      <a
        href="#"
        className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-1 ${
          featured
            ? "bg-black text-white"
            : "border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
        }`}
      >
        Chọn gói này
      </a>
    </div>
  );
}
