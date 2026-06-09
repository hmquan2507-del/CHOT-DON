"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface ChannelSubmitButtonProps {
  mode: "create" | "update";
}

export function ChannelSubmitButton({ mode }: ChannelSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(16,185,129,0.25)] transition hover:bg-emerald-700 disabled:opacity-70"
    >
      {pending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {mode === "create" ? "Lưu hồ sơ kênh" : "Cập nhật hồ sơ"}
    </button>
  );
}
