import { Eye, PackagePlus, Sparkles } from "lucide-react";
import { createProduct } from "@/actions/products";
import ProductSubmitButton from "./ProductSubmitButton";

type ChannelSummary = {
  id: string;
  name: string;
  platform: string | null;
  niche: string | null;
};

type ProductFormProps = {
  channel: ChannelSummary | null;
};

const inputClassName =
  "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

const textareaClassName =
  "min-h-20 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

export default function ProductForm({ channel }: ProductFormProps) {
  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <PackagePlus className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950">
            Thêm sản phẩm mới
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Lưu sản phẩm để tạo nội dung chính xác hơn.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <div className="flex gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm font-semibold leading-6 text-emerald-800">
            AI sẽ dùng sản phẩm này để tạo ý tưởng và kịch bản phù hợp hơn với
            kênh của bạn.
          </p>
        </div>
      </div>

      <form action={createProduct} className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Kênh liên kết
          </label>

          <select
            name="channel_id"
            defaultValue={channel?.id ?? ""}
            className={inputClassName}
          >
            {channel ? (
              <option value={channel.id}>
                {channel.name}
                {channel.platform ? ` (${channel.platform})` : ""}
              </option>
            ) : (
              <option value="">Chưa có hồ sơ kênh</option>
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            placeholder="Nhập tên sản phẩm"
            className={inputClassName}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              Giá VND
            </label>
            <input
              name="price"
              type="number"
              min="0"
              placeholder="Nhập giá"
              className={inputClassName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              Hoa hồng %
            </label>
            <input
              name="commission"
              type="number"
              min="0"
              step="0.1"
              placeholder="% hoa hồng"
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Link affiliate
          </label>
          <input
            name="affiliate_url"
            type="url"
            placeholder="Dán link affiliate của bạn"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Category / ngách
          </label>
          <input
            name="category"
            placeholder="Ví dụ: Skincare, Gia dụng..."
            className={inputClassName}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              Ưu tiên
            </label>
            <select
              name="priority"
              defaultValue="normal"
              className={inputClassName}
            >
              <option value="normal">Bình thường</option>
              <option value="high">Ưu tiên đẩy</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-700">
              Trạng thái
            </label>
            <select name="status" defaultValue="active" className={inputClassName}>
              <option value="active">Đang dùng</option>
              <option value="draft">Nháp</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Điểm mạnh
          </label>
          <textarea
            name="strengths"
            placeholder="Ví dụ: Thành phần tốt, hiệu quả nhanh..."
            className={textareaClassName}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Đối tượng phù hợp
          </label>
          <textarea
            name="target_customer"
            placeholder="Ví dụ: Nữ 18–30 tuổi, da nhạy cảm..."
            className={textareaClassName}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-extrabold text-slate-700">
            Ghi chú
          </label>
          <textarea
            name="notes"
            placeholder="Ghi chú thêm không bắt buộc"
            className={textareaClassName}
          />
        </div>

        <ProductSubmitButton />

        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
        >
          <Eye className="h-4 w-4" />
          Xem preview
        </button>
      </form>
    </section>
  );
}