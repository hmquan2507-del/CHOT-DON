import { Camera, Eye, Upload } from "lucide-react";
import { createChannel, updateChannel } from "@/actions/channels";
import type { ChannelProfile } from "@/app/app/channel/page";
import ChannelSubmitButton from "./ChannelSubmitButton";

type ChannelProfileFormProps = {
  channel: ChannelProfile | null;
};

const inputClass =
  "h-11 w-full rounded-2xl border border-[#DDE6EC] bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

const textareaClass =
  "min-h-[74px] w-full resize-none rounded-2xl border border-[#DDE6EC] bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

function safeDefault(value?: string | null) {
  return value ?? "";
}

function getAvatarInitials(name?: string | null) {
  const source = name?.trim() || "CĐ";

  return source
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ChannelProfileForm({
  channel,
}: ChannelProfileFormProps) {
  const action = channel?.id
    ? updateChannel.bind(null, channel.id)
    : createChannel;

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <form action={action}>
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
              A
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Nhận diện & liên kết kênh
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                Liên kết các kênh của bạn để AI phân tích hiệu quả hơn.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[150px_minmax(0,1fr)]">
            <div>
              <p className="mb-2 text-sm font-extrabold text-slate-700">
                Ảnh đại diện
              </p>

              <div className="relative h-24 w-24 rounded-[24px] border border-slate-200 bg-emerald-50">
                {channel?.avatar_url ? (
                  <img
                    src={channel.avatar_url}
                    alt={channel.name || "Avatar"}
                    className="h-full w-full rounded-[24px] object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-black text-emerald-700">
                    {getAvatarInitials(channel?.name)}
                  </div>
                )}

                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white">
                  <Camera className="h-4 w-4" />
                </div>
              </div>

              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 transition hover:bg-slate-50">
                <Upload className="h-4 w-4" />
                Tải ảnh lên
                <input
                  type="file"
                  name="avatar"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                />
              </label>

              <p className="mt-2 text-xs font-medium leading-5 text-slate-400">
                JPG, PNG tối đa 5MB
              </p>
            </div>

            <div className="grid gap-4">
              <Field label="Link TikTok">
                <input
                  name="tiktok_url"
                  defaultValue={safeDefault(channel?.tiktok_url)}
                  placeholder="https://www.tiktok.com/@username"
                  className={inputClass}
                />
              </Field>

              <Field label="Link YouTube">
                <input
                  name="youtube_url"
                  defaultValue={safeDefault(channel?.youtube_url)}
                  placeholder="https://www.youtube.com/@username"
                  className={inputClass}
                />
              </Field>

              <Field label="Link Facebook / Reels">
                <input
                  name="facebook_url"
                  defaultValue={safeDefault(channel?.facebook_url)}
                  placeholder="https://www.facebook.com/username"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
            <Field label="Trạng thái kênh">
              <select
                name="channel_status"
                defaultValue={channel?.channel_status || "not_started"}
                className={inputClass}
              >
                <option value="not_started">Chưa có kênh</option>
                <option value="existing">Đã có kênh</option>
                <option value="rebuild">Có kênh nhưng muốn làm lại</option>
              </select>
            </Field>

            <Field label="Mong muốn xây kênh">
              <textarea
                name="desired_positioning"
                defaultValue={safeDefault(channel?.desired_positioning)}
                placeholder="Bạn muốn xây kênh theo hướng nào? Ví dụ: review sản phẩm, chia sẻ kinh nghiệm..."
                className={textareaClass}
                maxLength={500}
              />
            </Field>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
              B
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Thông tin cốt lõi
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                Cung cấp thông tin để AI hiểu rõ hơn về kênh và khán giả của
                bạn.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <Field label="Tên kênh" required>
              <input
                name="name"
                required
                defaultValue={safeDefault(channel?.name)}
                placeholder="Ví dụ: Linh's Skincare"
                className={inputClass}
              />
            </Field>

            <Field label="Nền tảng" required>
              <select
                name="platform"
                required
                defaultValue={safeDefault(channel?.platform) || "TikTok"}
                className={inputClass}
              >
                <option value="TikTok">TikTok</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Facebook Reels">Facebook Reels</option>
                <option value="Đa nền tảng">Đa nền tảng</option>
              </select>
            </Field>

            <Field label="Kinh nghiệm hiện tại" required>
              <select
                name="experience_level"
                required
                defaultValue={safeDefault(channel?.experience_level)}
                className={inputClass}
              >
                <option value="">Chọn kinh nghiệm</option>
                <option value="Người mới bắt đầu">Người mới bắt đầu</option>
                <option value="Đã có kinh nghiệm">Đã có kinh nghiệm</option>
                <option value="Đang bán hàng/affiliate">
                  Đang bán hàng/affiliate
                </option>
              </select>
            </Field>

            <Field label="Ngách (Niche)" required>
              <input
                name="niche"
                required
                defaultValue={safeDefault(channel?.niche)}
                placeholder="Ví dụ: Thời trang nam"
                className={inputClass}
              />
            </Field>

            <Field label="Mục tiêu kênh" required>
              <input
                name="goal"
                required
                defaultValue={safeDefault(channel?.goal)}
                placeholder="Ví dụ: Bán hàng Affiliate"
                className={inputClass}
              />
            </Field>

            <Field label="Tệp khách hàng" required>
              <input
                name="target_audience"
                required
                defaultValue={safeDefault(channel?.target_audience)}
                placeholder="Ví dụ: Nam 18–30 tuổi"
                className={inputClass}
              />
            </Field>

            <Field label="Phong cách nội dung" required>
              <input
                name="content_style"
                required
                defaultValue={safeDefault(channel?.content_style)}
                placeholder="Ví dụ: Review chân thực, dễ hiểu"
                className={inputClass}
              />
            </Field>

            <Field label="Hiện trạng kênh">
              <input
                name="current_situation"
                defaultValue={safeDefault(channel?.current_situation)}
                placeholder="Ví dụ: Đã đăng vài bài nhưng chưa đều"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <ChannelSubmitButton hasChannel={Boolean(channel?.id)} />

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
            >
              <Eye className="h-4 w-4" />
              Xem preview
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}
