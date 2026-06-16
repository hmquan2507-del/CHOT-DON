"use client";

import { deleteProduct } from "@/actions/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import type { Product } from "@/types/product";

type ProductDeleteDialogProps = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProductDeleteDialog({
  product,
  open,
  onOpenChange,
}: ProductDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-[24px] border-slate-200/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.1)]"
      >
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Trash2 className="h-6 w-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-black tracking-[-0.02em] text-slate-950">
                Xóa sản phẩm
              </DialogTitle>

              <DialogDescription className="mt-0.5 text-[13px] font-medium text-slate-500">
                Hành động này không thể hoàn tác
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold leading-relaxed text-slate-700">
            Bạn có chắc chắn muốn xóa{" "}
            <span className="font-black text-slate-900">
              &quot;{product.name}&quot;
            </span>
            ?
          </p>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-slate-500">
            Dữ liệu sản phẩm và các thông tin liên quan sẽ bị xóa vĩnh viễn.
          </p>
        </div>

        <form
          action={deleteProduct.bind(null, product.id)}
          className="flex items-center justify-end gap-3 pt-1"
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            Hủy
          </button>

          <DeleteSubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-sm font-extrabold text-white shadow-sm transition-all duration-200 ease-out hover:bg-red-700 hover:shadow-[0_14px_30px_rgba(220,38,38,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-red-600 disabled:hover:shadow-sm disabled:active:scale-100"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Đang xóa...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          Xóa sản phẩm
        </>
      )}
    </button>
  );
}