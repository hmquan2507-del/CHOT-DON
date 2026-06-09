"use client";

import { CheckCircle2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type ChannelSubmitButtonProps = {
  hasChannel: boolean;
};

export default function ChannelSubmitButton({
  hasChannel,
}: ChannelSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-extrabold text-white shadow-[0_16px_36px_rgba(16,185,129,0.24)] transition hover:from-emerald-700 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <CheckCircle2 className="h-4 w-4" />
      {pending
        ? "Đang lưu..."
        : hasChannel
          ? "Cập nhật hồ sơ"
          : "Lưu hồ sơ kênh"}
    </button>
  );
}
