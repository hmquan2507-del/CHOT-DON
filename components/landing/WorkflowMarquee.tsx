"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { marqueeItems } from "./landing-data";

export default function WorkflowMarquee() {
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
          {[
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
          ].map((item, index) => (
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
