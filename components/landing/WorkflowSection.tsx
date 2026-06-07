"use client";

import { ChevronRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { workflow } from "./landing-data";

export default function WorkflowSection() {
  return (
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
  );
}
