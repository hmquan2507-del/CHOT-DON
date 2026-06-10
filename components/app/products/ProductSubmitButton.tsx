"use client";

import { Plus, Pencil } from "lucide-react";
import { useFormStatus } from "react-dom";

type ProductSubmitButtonProps = {
  label?: string;
  isEditing?: boolean;
};

export default function ProductSubmitButton({
  label,
  isEditing = false,
}: ProductSubmitButtonProps) {
  const { pending } = useFormStatus();

  const defaultLabel = isEditing ? "Cập nhật sản phẩm" : "Lưu sản phẩm";
  const buttonLabel = label ?? defaultLabel;
  const Icon = isEditing ? Pencil : Plus;

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      <Icon className="h-5 w-5" />
      {pending ? "Đang xử lý..." : buttonLabel}
    </button>
  );
}