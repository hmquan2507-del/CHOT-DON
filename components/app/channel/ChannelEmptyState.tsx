import { Lightbulb, Target, Users, Video } from "lucide-react";
import type { ChannelProfile } from "@/app/app/channel/page";

type ChannelEmptyStateProps = {
  channel: ChannelProfile | null;
};

function safeValue(value?: string | null, fallback = "Chưa cập nhật") {
  return value?.trim() || fallback;
}

export default function ChannelEmptyState({ channel }: ChannelEmptyStateProps) {
  const items = [
    {
      label: "Ngách (Niche)",
      value: safeValue(channel?.niche),
      icon: Target,
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
  ];

  return (
    <>
      <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-black text-slate-950">Tóm tắt định vị</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-950">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
              <Lightbulb className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-base font-black text-slate-950">
                Chưa có kênh?
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                AI có thể tư vấn hướng đi phù hợp dựa trên mong muốn của bạn.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="h-11 rounded-2xl border border-emerald-200 bg-white px-4 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-50"
          >
            Nhận tư vấn ngay
          </button>
        </div>
      </section>
    </>
  );
}
