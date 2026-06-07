import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
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
  );
}
