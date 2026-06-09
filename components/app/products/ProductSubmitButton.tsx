"use client";

import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function ProductSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      {pending ? "Đang thêm..." : "Thêm sản phẩm"}
    </button>
  );
}