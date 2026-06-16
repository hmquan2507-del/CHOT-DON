"use client";

import { Loader2, Pencil, Plus } from "lucide-react";
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
      className="inline-flex h-12 min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-emerald-600 disabled:hover:shadow-[0_14px_34px_rgba(16,185,129,0.22)] disabled:active:scale-100"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Đang lưu...
        </>
      ) : (
        <>
          <Icon className="h-5 w-5" />
          {buttonLabel}
        </>
      )}
    </button>
  );
}