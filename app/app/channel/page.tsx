import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ChannelAiReadinessCard from "@/components/app/channel/ChannelAiReadinessCard";
import ChannelEmptyState from "@/components/app/channel/ChannelEmptyState";
import ChannelProfileCard from "@/components/app/channel/ChannelProfileCard";
import ChannelProfileForm from "@/components/app/channel/ChannelProfileForm";

export type ChannelProfile = {
  id: string;
  user_id: string;
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
  experience_level: string | null;
  avatar_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  facebook_url: string | null;
  channel_status: string | null;
  current_situation: string | null;
  desired_positioning: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export default async function ChannelPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: channelData } = await supabase
    .from("channels")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const channel = channelData as ChannelProfile | null;

  return (
    <div className="mx-auto w-full max-w-[1360px] space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
          <span>Content Chốt Đơn</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-900">Hồ sơ kênh</span>
        </div>

        <div>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Hồ sơ kênh
          </h1>
          <p className="mt-2 max-w-3xl text-base font-medium leading-7 text-slate-500">
            Thiết lập thông tin kênh để AI hiểu rõ hơn và đưa ra gợi ý nội dung
            phù hợp.
          </p>
        </div>
      </header>

      <div className="grid items-start gap-6 xl:grid-cols-[0.42fr_0.58fr]">
        <section className="space-y-6">
          <ChannelProfileCard channel={channel} />
          <ChannelAiReadinessCard channel={channel} />
          <ChannelEmptyState channel={channel} />
        </section>

        <section>
          <ChannelProfileForm channel={channel} />
        </section>
      </div>
    </div>
  );
}
