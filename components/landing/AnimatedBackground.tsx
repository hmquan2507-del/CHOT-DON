"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 90, -40, 0],
          y: [0, -70, 45, 0],
          scale: [1, 1.15, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-14rem] top-[-14rem] size-[34rem] rounded-full bg-cyan-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -70, 80, 0],
          y: [0, 75, -40, 0],
          scale: [1, 0.92, 1.18, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-12rem] top-[16rem] size-[36rem] rounded-full bg-violet-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -45, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-14rem] left-[26%] size-[38rem] rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(5,7,18,0.2)_45%,rgba(5,7,18,0.96)_100%)]" />
    </div>
  );
}
