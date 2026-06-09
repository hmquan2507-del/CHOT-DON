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
  "h-12 w-full rounded-2xl border border-[#DDE6EC] bg-white px-4 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 hover:border-slate-300";

const textareaClassName =
  "min-h-[100px] w-full resize-none rounded-2xl border border-[#DDE6EC] bg-white px-4 py-3 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 hover:border-slate-300";

const labelClassName = "mb-2 block text-[13px] font-extrabold text-slate-700";

export default function ProductForm({ channel }: ProductFormProps) {
  return (
    <section className="sticky top-6 rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50">
          <PackagePlus className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-[19px] font-black tracking-[-0.02em] text-slate-950">
            Thêm sản phẩm mới
          </h2>
          <p className="mt-0.5 text-[13px] font-medium text-slate-500">
            Cung cấp dữ liệu để AI tạo kịch bản
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-100/60 bg-emerald-50/50 p-4 shadow-sm">
        <div className="flex gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-[13px] font-semibold leading-relaxed text-emerald-800">
            AI sẽ phân tích sản phẩm này để lên ý tưởng và viết kịch bản bán hàng sát với tệp khách hàng của bạn nhất.
          </p>
        </div>
      </div>

      <form action={createProduct} className="mt-6 space-y-5">
        <div>
          <label className={labelClassName}>
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
          <label className={labelClassName}>
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            placeholder="Nhập tên sản phẩm..."
            className={inputClassName}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClassName}>
              Giá (VND)
            </label>
            <input
              name="price"
              type="number"
              min="0"
              placeholder="0"
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>
              Hoa hồng (%)
            </label>
            <input
              name="commission"
              type="number"
              min="0"
              step="0.1"
              placeholder="0.0"
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label className={labelClassName}>
            Link Affiliate
          </label>
          <input
            name="affiliate_url"
            type="url"
            placeholder="https://..."
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>
            Ngách / Phân loại
          </label>
          <input
            name="category"
            placeholder="Vd: Skincare, Gia dụng..."
            className={inputClassName}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClassName}>
              Mức độ ưu tiên
            </label>
            <select
              name="priority"
              defaultValue="normal"
              className={inputClassName}
            >
              <option value="normal">Bình thường</option>
              <option value="high">⭐️ Ưu tiên đẩy</option>
            </select>
          </div>

          <div>
            <label className={labelClassName}>
              Trạng thái
            </label>
            <select name="status" defaultValue="active" className={inputClassName}>
              <option value="active">🟢 Đang dùng</option>
              <option value="draft">⚪️ Bản nháp</option>
              <option value="archived">📦 Lưu trữ</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <label className={labelClassName}>
            Điểm mạnh nổi bật
          </label>
          <textarea
            name="strengths"
            placeholder="Vd: Thành phần tự nhiên, hiệu quả sau 7 ngày..."
            className={textareaClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>
            Chân dung khách hàng
          </label>
          <textarea
            name="target_customer"
            placeholder="Vd: Nữ 18-25 tuổi, da dầu mụn..."
            className={textareaClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>
            Ghi chú thêm
          </label>
          <textarea
            name="notes"
            placeholder="Thông tin nội bộ, không bắt buộc..."
            className="min-h-[80px] w-full resize-none rounded-2xl border border-[#DDE6EC] bg-white px-4 py-3 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 hover:border-slate-300"
          />
        </div>

        <div className="pt-2 space-y-3">
          <ProductSubmitButton />

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200/80 bg-white text-[15px] font-extrabold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
          >
            <Eye className="h-4 w-4" />
            Xem trước thẻ
          </button>
        </div>
      </form>
    </section>
  );
}
