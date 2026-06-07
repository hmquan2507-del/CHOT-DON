"use client";

import { BarChart3, Flame, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import FloatingCard from "./FloatingCard";

export default function HeroMockup() {
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
