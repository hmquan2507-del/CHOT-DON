import { ArrowRight, Menu, Sparkles } from "lucide-react";

export default function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050712]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.18)]">
            <Sparkles className="size-5" />
            <span className="absolute -right-1 -top-1 size-3 rounded-full bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.95)]" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">Content Chốt Đơn</p>
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
  );
}
