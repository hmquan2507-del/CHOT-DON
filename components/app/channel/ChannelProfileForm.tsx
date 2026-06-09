"use client";

import { Channel } from "@/types/channel";
import { createChannel, updateChannel } from "@/actions/channels";
import { ChannelSubmitButton } from "./ChannelSubmitButton";

interface ChannelProfileFormProps {
  channel?: Channel | null;
}

export function ChannelProfileForm({ channel }: ChannelProfileFormProps) {
  const mode = channel ? "update" : "create";
  
  const action = channel
    ? updateChannel.bind(null, channel.id)
    : createChannel;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-slate-900">Thông tin kênh</h2>

      <form action={action} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-900">
            Tên kênh <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={channel?.name || ""}
            required
            placeholder="Ví dụ: Review Đồ Công Nghệ"
            className="flex h-[48px] w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="platform" className="text-sm font-semibold text-slate-900">
              Nền tảng <span className="text-red-500">*</span>
            </label>
            <select
              id="platform"
              name="platform"
              defaultValue={channel?.platform || ""}
              required
              className="flex h-[48px] w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="" disabled>Chọn nền tảng</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube Shorts">YouTube Shorts</option>
              <option value="Facebook Reels">Facebook Reels</option>
              <option value="Đa nền tảng">Đa nền tảng</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="experience_level" className="text-sm font-semibold text-slate-900">
              Kinh nghiệm hiện tại
            </label>
            <select
              id="experience_level"
              name="experience_level"
              defaultValue={channel?.experience_level || ""}
              className="flex h-[48px] w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="" disabled>Chọn mức độ</option>
              <option value="Người mới bắt đầu">Người mới bắt đầu</option>
              <option value="Đã từng đăng video">Đã từng đăng video</option>
              <option value="Đã có kênh nhưng chưa đều">Đã có kênh nhưng chưa đều</option>
              <option value="Đã có doanh thu">Đã có doanh thu</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="niche" className="text-sm font-semibold text-slate-900">
            Ngách (Niche) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="niche"
            name="niche"
            defaultValue={channel?.niche || ""}
            required
            placeholder="Ví dụ: Đồ gia dụng thông minh, Thời trang công sở..."
            className="flex h-[48px] w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="goal" className="text-sm font-semibold text-slate-900">
            Mục tiêu kênh <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="goal"
            name="goal"
            defaultValue={channel?.goal || ""}
            required
            placeholder="Ví dụ: Tăng nhận diện thương hiệu, Bán hàng affiliate..."
            className="flex h-[48px] w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="target_audience" className="text-sm font-semibold text-slate-900">
            Tệp khách hàng
          </label>
          <textarea
            id="target_audience"
            name="target_audience"
            defaultValue={channel?.target_audience || ""}
            rows={3}
            placeholder="Mô tả chi tiết về độ tuổi, sở thích, nỗi đau của khách hàng..."
            className="flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content_style" className="text-sm font-semibold text-slate-900">
            Phong cách nội dung
          </label>
          <textarea
            id="content_style"
            name="content_style"
            defaultValue={channel?.content_style || ""}
            rows={3}
            placeholder="Ví dụ: Chân thực, hài hước, review chi tiết, biến hình..."
            className="flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[15px] outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="flex gap-4 pt-2">
          <ChannelSubmitButton mode={mode} />
          <button
            type="button"
            className="flex h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-[15px] font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Xem preview
          </button>
        </div>
      </form>
    </div>
  );
}
