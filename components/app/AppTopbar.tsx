import {
  Bell,
  ChevronDown,
  HelpCircle,
  Mail,
  Menu,
  Search,
  Share2,
} from "lucide-react";

export default function AppTopbar() {
  return (
    <header className="border-b border-slate-200 bg-[#FCFCFA] px-5 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <button className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white lg:hidden">
            <Menu className="size-5 text-slate-700" />
          </button>

          <div className="hidden min-w-0 md:block">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <span>Content Chốt Đơn</span>
              <span>›</span>
              <span className="text-slate-500">Dashboard</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
              Overview
            </h1>
          </div>
        </div>

        <div className="hidden min-w-0 max-w-xl flex-1 xl:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Tìm ý tưởng, script, sản phẩm..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:flex">
            <HelpCircle className="size-4" />
          </button>

          <button className="hidden size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:flex">
            <Mail className="size-4" />
          </button>

          <button className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell className="size-4" />
          </button>

          <button className="hidden items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-flex">
            <Share2 className="size-4" />
            Share
          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-slate-50">
            <div className="flex size-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              Q
            </div>
            <ChevronDown className="size-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
