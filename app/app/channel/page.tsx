import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight, Target } from "lucide-react";
import Link from "next/link";
import { ChannelEmptyState } from "@/components/app/channel/ChannelEmptyState";
import { ChannelProfileCard } from "@/components/app/channel/ChannelProfileCard";
import { ChannelAiReadinessCard } from "@/components/app/channel/ChannelAiReadinessCard";
import { ChannelProfileForm } from "@/components/app/channel/ChannelProfileForm";

export default async function ChannelPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: channel } = await supabase
    .from("channels")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-[1280px] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
          <Link href="/app" className="hover:text-slate-900">
            Content Chốt Đơn
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900">Hồ sơ kênh</span>
        </nav>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Hồ sơ kênh
          </h1>
        </div>
        <p className="mt-2 text-[15px] text-slate-600">
          Thiết lập định vị kênh để AI tạo nội dung chính xác hơn.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-[42%_1fr] xl:gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {!channel ? (
            <ChannelEmptyState />
          ) : (
            <>
              <ChannelProfileCard channel={channel} />
              <ChannelAiReadinessCard />
            </>
          )}
        </div>

        {/* Right Column */}
        <div>
          <ChannelProfileForm channel={channel} />
        </div>
      </div>
    </div>
  );
}
