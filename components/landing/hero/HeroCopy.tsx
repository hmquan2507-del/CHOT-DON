import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import HeroRatingCard from "./HeroRatingCard";
import HeroTrustBar from "./HeroTrustBar";

export default function HeroCopy() {
  return (
    <div className="relative max-w-[590px]">
      <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Sparkles className="h-4 w-4" />
        </span>

        <span className="truncate text-[14px] font-bold tracking-[-0.02em] text-slate-800">
          Nền tảng AI giúp bạn xây hệ thống nội dung bán hàng
        </span>

        <Sparkles className="h-4 w-4 shrink-0 text-emerald-500" />
      </div>

<h1 className="mt-8 max-w-[600px] text-[48px] font-extrabold leading-[1.04] tracking-[-0.052em] text-slate-950 sm:text-[54px] lg:text-[58px] xl:text-[62px]">
  <span className="block">Từ ý tưởng rời rạc</span>
  <span className="block">đến hệ thống</span>
  <span className="block text-emerald-600">nội dung chốt đơn</span>
</h1>

      <p className="mt-6 max-w-[545px] text-[17px] leading-8 tracking-[-0.015em] text-slate-500">
        Tạo hồ sơ kênh, lưu sản phẩm affiliate, lên kế hoạch 30 ngày, viết
        script video ngắn và theo dõi nội dung cần làm tiếp trong một dashboard.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button className="inline-flex h-14 items-center justify-center gap-2 rounded-[18px] bg-emerald-600 px-7 text-[17px] font-extrabold tracking-[-0.02em] text-white shadow-[0_18px_34px_rgba(5,150,105,0.20)] transition hover:bg-emerald-700">
          Bắt đầu miễn phí
          <ArrowRight className="h-5 w-5" />
        </button>

        <button className="inline-flex h-14 items-center justify-center gap-3 rounded-[18px] border border-slate-200 bg-white px-7 text-[17px] font-extrabold tracking-[-0.02em] text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:bg-slate-50">
          <PlayCircle className="h-5 w-5 text-emerald-600" />
          Xem dashboard mẫu
        </button>
      </div>

      <div className="mt-8">
        <HeroTrustBar />
      </div>

      <div className="mt-9 max-w-[540px]">
        <HeroRatingCard />
      </div>
    </div>
  );
}