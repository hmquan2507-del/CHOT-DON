import { ArrowRight, ChevronDown, Menu, Sparkles } from "lucide-react";

const navItems = [
  { label: "Tính năng", dropdown: true },
  { label: "Giải pháp", dropdown: true },
  { label: "Tài nguyên", dropdown: true },
  { label: "Bảng giá", dropdown: false },
  { label: "Changelog", dropdown: false },
];

export default function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between rounded-[1.65rem] border border-emerald-100/70 bg-white/74 px-5 backdrop-blur-2xl lg:px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-[1rem] bg-emerald-600 text-white">
            <Sparkles className="size-5" />
          </span>

          <span className="text-[1.1rem] font-black tracking-[-0.04em] text-[#07111F]">
            Content Chốt Đơn
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="group inline-flex items-center gap-1.5 text-[0.93rem] font-bold tracking-[-0.02em] text-[#172033] transition hover:text-emerald-700"
            >
              {item.label}
              {item.dropdown ? (
                <ChevronDown className="size-3.5 text-slate-500 transition group-hover:text-emerald-600" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/app"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/72 px-6 text-[0.92rem] font-bold tracking-[-0.02em] text-[#172033] backdrop-blur-xl transition hover:border-emerald-200 hover:bg-white hover:text-emerald-700"
          >
            Đăng nhập
          </a>

          <a
            href="#pricing"
            className="group inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-6 text-[0.92rem] font-extrabold tracking-[-0.02em] text-white transition hover:bg-emerald-700"
          >
            Bắt đầu miễn phí
            <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        <button className="flex size-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/72 text-[#07111F] md:hidden">
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  );
}