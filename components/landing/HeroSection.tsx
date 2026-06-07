"use client";

import { ArrowRight, Play, Zap } from "lucide-react";
import { motion } from "framer-motion";
import HeroMockup from "./HeroMockup";
import { fadeUp } from "./landing-data";

export default function HeroSection() {
  return (
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
  );
}
