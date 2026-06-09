import { Channel } from "@/types/channel";
import { CheckCircle2, Edit2, Play, Target, Users, Sparkles, TrendingUp } from "lucide-react";

interface ChannelProfileCardProps {
  channel: Channel;
}

export function ChannelProfileCard({ channel }: ChannelProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100"></div>
      
      <div className="relative px-6 pb-6">
        <div className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-2xl font-bold text-white shadow-md">
          {getInitials(channel.name)}
        </div>
        
        <div className="ml-24 flex items-start justify-between pt-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{channel.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {channel.platform}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Đã thiết lập
              </span>
            </div>
          </div>
          
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Ngách</p>
              <p className="text-sm font-medium text-slate-900">{channel.niche}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Mục tiêu</p>
              <p className="text-sm font-medium text-slate-900">{channel.goal}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Tệp khách hàng</p>
              <p className="text-sm font-medium text-slate-900 line-clamp-2">
                {channel.target_audience || "Chưa cập nhật"}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Phong cách nội dung</p>
              <p className="text-sm font-medium text-slate-900 line-clamp-2">
                {channel.content_style || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
              <Play className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Kinh nghiệm hiện tại</p>
              <p className="text-sm font-medium text-slate-900">
                {channel.experience_level || "Chưa cập nhật"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
