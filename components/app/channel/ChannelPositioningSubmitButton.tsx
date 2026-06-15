"use client";

import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useFormStatus } from "react-dom";

type ChannelPositioningSubmitButtonProps = {
  hasResult: boolean;
};

export default function ChannelPositioningSubmitButton({
  hasResult,
}: ChannelPositioningSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-emerald-600 disabled:hover:shadow-[0_14px_34px_rgba(16,185,129,0.22)] disabled:active:scale-100"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang tạo lại...
        </>
      ) : hasResult ? (
        <>
          <RefreshCw className="h-4 w-4" />
          Tạo lại định vị
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Tạo định vị bằng AI
        </>
      )}
    </button>
  );
}