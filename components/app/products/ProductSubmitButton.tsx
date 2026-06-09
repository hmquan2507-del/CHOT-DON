"use client";

import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function ProductSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      <Plus className="h-5 w-5" />
      {pending ? "Đang xử lý..." : "Lưu sản phẩm"}
    </button>
  );
}