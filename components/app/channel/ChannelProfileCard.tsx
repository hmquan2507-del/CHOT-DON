import { Channel } from "@/types/channel";
import { CheckCircle2, Edit2, Play, Target, Users, Sparkles, TrendingUp } from "lucide-react";

interface ChannelProfileCardProps {
  channel: Channel;
}

export function ChannelProfileCard({ channel }: ChannelProfileCardProps) {
  const getInitials = (name: string) => {
    if (!name) return "C";
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="h-28 bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-600"></div>
      
      <div className="relative px-6 pb-6">
        <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-white bg-emerald-600 text-3xl font-black text-white shadow-sm">
          {getInitials(channel.name)}
        </div>
        
        <div className="ml-28 flex items-start justify-between pt-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{channel.name}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-lg border border-emerald-100 bg-[#F3FBF5] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                {channel.platform}
              </span>
              <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Đã thiết lập
              </span>
            </div>
          </div>
          
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-5 divide-y divide-slate-100">
          <div className="flex gap-4 pt-0">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Target className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-slate-500">Ngách (Niche)</p>
              <p className="mt-0.5 text-[15px] font-medium text-slate-900">{channel.niche}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-slate-500">Mục tiêu kênh</p>
              <p className="mt-0.5 text-[15px] font-medium text-slate-900">{channel.goal}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Users className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-slate-500">Tệp khách hàng</p>
              <p className="mt-0.5 text-[15px] font-medium leading-relaxed text-slate-900">
                {channel.target_audience || "Chưa cập nhật"}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 pt-5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-slate-500">Phong cách nội dung</p>
              <p className="mt-0.5 text-[15px] font-medium leading-relaxed text-slate-900">
                {channel.content_style || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Play className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-slate-500">Kinh nghiệm hiện tại</p>
              <p className="mt-0.5 text-[15px] font-medium text-slate-900">
                {channel.experience_level || "Chưa cập nhật"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
