import Link from "next/link";
import {
  ArrowDown,
  Camera,
  ExternalLink,
  Globe,
  Pencil,
  Target,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import type { ChannelProfile } from "@/app/app/channel/page";

type ChannelProfileCardProps = {
  channel: ChannelProfile | null;
};

function safeValue(value?: string | null, fallback = "Chưa cập nhật") {
  return value?.trim() || fallback;
}

function getInitials(name?: string | null) {
  const source = name?.trim() || "Content Chốt Đơn";

  return source
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatusLabel(status?: string | null) {
  if (status === "existing") return "Đã có kênh";
  if (status === "rebuild") return "Muốn làm lại";
  return "Chưa có kênh";
}

function getProfileScore(channel: ChannelProfile | null) {
  const fields = [
    channel?.name,
    channel?.platform,
    channel?.niche,
    channel?.goal,
    channel?.target_audience,
    channel?.content_style,
    channel?.experience_level,
    channel?.desired_positioning,
  ];

  const completed = fields.filter((item) => Boolean(item?.trim())).length;
  return Math.max(35, Math.round((completed / fields.length) * 100));
}

export default function ChannelProfileCard({ channel }: ChannelProfileCardProps) {
  const channelName = safeValue(channel?.name, "Kênh của bạn");
  const profileScore = getProfileScore(channel);

  const description =
    channel?.desired_positioning?.trim() ||
    channel?.goal?.trim() ||
    channel?.niche?.trim() ||
    "Cập nhật định vị để AI hiểu rõ kênh của bạn hơn.";

  const socialBadges = [
    { label: "TikTok", url: channel?.tiktok_url },
    { label: "YouTube", url: channel?.youtube_url },
    { label: "Facebook Reels", url: channel?.facebook_url },
  ];

  const summaryItems = [
    {
      label: "Ngách",
      value: safeValue(channel?.niche),
      icon: Globe,
    },
    {
      label: "Mục tiêu kênh",
      value: safeValue(channel?.goal),
      icon: Target,
    },
    {
      label: "Tệp khách hàng",
      value: safeValue(channel?.target_audience),
      icon: Users,
    },
    {
      label: "Phong cách nội dung",
      value: safeValue(channel?.content_style),
      icon: Video,
    },
    {
      label: "Kinh nghiệm hiện tại",
      value: safeValue(channel?.experience_level),
      icon: UserRound,
    },
  ];

  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="relative h-[112px] overflow-hidden bg-[linear-gradient(135deg,#10B981_0%,#35D0B3_48%,#BDF7E7_100%)]">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(135deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/35" />
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/25" />
      </div>

      <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-12 flex items-end justify-between gap-4">
          <div className="relative h-24 w-24 shrink-0 rounded-[28px] border-4 border-white bg-emerald-50 shadow-lg">
            {channel?.avatar_url ? (
              <img
                src={channel.avatar_url}
                alt={channelName}
                className="h-full w-full rounded-[24px] object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[24px] text-3xl font-black text-emerald-700">
                {getInitials(channelName)}
              </div>
            )}

            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-md">
              <Camera className="h-4 w-4" />
            </div>
          </div>

          <div className="mb-1 text-center">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white shadow-sm">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[7px] border-emerald-500 text-base font-black text-slate-950">
                {profileScore}%
              </div>
            </div>
            <p className="mt-1.5 text-[11px] font-bold text-slate-400">
              Hồ sơ
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            {channelName}
          </h2>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
            {getStatusLabel(channel?.channel_status)}
          </span>

          <Link
            href="/app/channel?tab=edit"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
            aria-label="Chỉnh sửa hồ sơ"
          >
            <Pencil className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {socialBadges.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600"
            >
              <ExternalLink className="h-3 w-3 text-emerald-600" />
              {item.label}
              {!item.url ? (
                <span className="text-slate-400">· chưa liên kết</span>
              ) : null}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/app/channel?tab=edit"
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <Pencil className="h-4 w-4" />
            Chỉnh sửa hồ sơ
          </Link>

          <Link
            href="/app/channel?tab=links"
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
          >
            <ArrowDown className="h-4 w-4" />
            Liên kết kênh
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="min-h-[82px] rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
              >
                <div className="flex h-full items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-black leading-snug text-slate-950">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}