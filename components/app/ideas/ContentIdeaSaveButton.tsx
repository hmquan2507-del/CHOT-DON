"use client";

import { Loader2, Save } from "lucide-react";

type ContentIdeaSaveButtonProps = {
  selectedCount: number;
  pending: boolean;
  onClick: () => void;
};

export default function ContentIdeaSaveButton({
  selectedCount,
  pending,
  onClick,
}: ContentIdeaSaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending || selectedCount === 0}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Đang lưu...
        </>
      ) : (
        <>
          <Save className="h-5 w-5" />
          Lưu ý tưởng đã chọn ({selectedCount})
        </>
      )}
    </button>
  );
}