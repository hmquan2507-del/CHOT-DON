"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { features } from "./landing-data";

export default function FeaturesSection() {
  return (
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
  );
}
