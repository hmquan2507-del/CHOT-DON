"use client";

import { FileText, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingCard({
  className,
  icon: Icon = FileText,
  title,
  desc,
}: {
  className: string;
  icon?: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-3xl border border-white/10 bg-black/65 p-4 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-black">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-sm font-black">{title}</p>
          <p className="text-xs text-white/42">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
