"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
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
      className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-extrabold text-white shadow-[0_16px_36px_rgba(16,185,129,0.24)] transition-all duration-200 ease-out hover:from-emerald-700 hover:to-emerald-600 hover:shadow-[0_18px_42px_rgba(16,185,129,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:from-emerald-600 disabled:hover:to-emerald-500 disabled:hover:shadow-[0_16px_36px_rgba(16,185,129,0.24)] disabled:active:scale-100"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang cập nhật...
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4" />
          {hasChannel ? "Cập nhật hồ sơ" : "Lưu hồ sơ kênh"}
        </>
      )}
    </button>
  );
}