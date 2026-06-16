"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type ContentIdeaActionButtonProps = {
  children: ReactNode;
  pendingLabel: string;
  variant?: "primary" | "secondary";
};

export default function ContentIdeaActionButton({
  children,
  pendingLabel,
  variant = "secondary",
}: ContentIdeaActionButtonProps) {
  const { pending } = useFormStatus();

  const className =
    variant === "primary"
      ? "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-3 text-xs font-extrabold text-white shadow-[0_8px_18px_rgba(16,185,129,0.16)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_12px_24px_rgba(16,185,129,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-600 disabled:hover:shadow-[0_8px_18px_rgba(16,185,129,0.16)] disabled:active:scale-100"
      : "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:active:scale-100";

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}