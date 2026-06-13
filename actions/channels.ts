"use server";

import { createClient } from "@/lib/supabase/server";
import { generateChannelPositioningWithAI } from "@/lib/ai/channel-positioning";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ChannelPlatform, ExperienceLevel } from "@/types/channel";
import type { AIChannelPositioningInput } from "@/types/ai-channel-positioning";

type ChannelUpdateData = {
  name: string;
  platform: ChannelPlatform;
  niche: string;
  goal: string;
  target_audience: string;
  content_style: string;
  experience_level: ExperienceLevel;
  tiktok_url: string | null;
  youtube_url: string | null;
  facebook_url: string | null;
  channel_status: string;
  current_situation: string | null;
  desired_positioning: string | null;
  updated_at: string;
  avatar_url?: string;
};

type ChannelPositioningRow = {
  id: string;
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
  experience_level: string | null;
  current_situation: string | null;
  desired_positioning: string | null;
  channel_status: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  facebook_url: string | null;
};

function redirectWithPositioningStatus(status: "succeeded" | "missing_key" | "failed"): never {
  redirect(`/app/channel?ai_positioning=${status}`);
}

export async function createChannel(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const platform = formData.get("platform") as ChannelPlatform;
  const niche = formData.get("niche") as string;
  const goal = formData.get("goal") as string;
  const target_audience = formData.get("target_audience") as string;
  const content_style = formData.get("content_style") as string;
  const experience_level = formData.get("experience_level") as ExperienceLevel;

  const tiktok_url = (formData.get("tiktok_url") as string) || null;
  const youtube_url = (formData.get("youtube_url") as string) || null;
  const facebook_url = (formData.get("facebook_url") as string) || null;
  const channel_status =
    (formData.get("channel_status") as string) || "not_started";
  const current_situation =
    (formData.get("current_situation") as string) || null;
  const desired_positioning =
    (formData.get("desired_positioning") as string) || null;

  if (!name || !platform || !niche || !goal) {
    throw new Error("Vui lòng điền đầy đủ các trường bắt buộc.");
  }

  let avatar_url = null;
  const avatarFile = formData.get("avatar") as File | null;

  if (avatarFile && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `channel-avatar-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("channel-assets")
      .upload(filePath, avatarFile);

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("channel-assets").getPublicUrl(filePath);
      avatar_url = publicUrl;
    }
  }

  const { error } = await supabase.from("channels").insert({
    user_id: user.id,
    name,
    platform,
    niche,
    goal,
    target_audience,
    content_style,
    experience_level,
    avatar_url,
    tiktok_url,
    youtube_url,
    facebook_url,
    channel_status,
    current_situation,
    desired_positioning,
  });

  if (error) {
    console.error("Error creating channel:", error);
    throw new Error("Đã có lỗi xảy ra khi tạo hồ sơ kênh.");
  }

  revalidatePath("/app/channel");
  revalidatePath("/app");
  redirect("/app/channel");
}

export async function updateChannel(channelId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const platform = formData.get("platform") as ChannelPlatform;
  const niche = formData.get("niche") as string;
  const goal = formData.get("goal") as string;
  const target_audience = formData.get("target_audience") as string;
  const content_style = formData.get("content_style") as string;
  const experience_level = formData.get("experience_level") as ExperienceLevel;

  const tiktok_url = (formData.get("tiktok_url") as string) || null;
  const youtube_url = (formData.get("youtube_url") as string) || null;
  const facebook_url = (formData.get("facebook_url") as string) || null;
  const channel_status =
    (formData.get("channel_status") as string) || "not_started";
  const current_situation =
    (formData.get("current_situation") as string) || null;
  const desired_positioning =
    (formData.get("desired_positioning") as string) || null;

  if (!name || !platform || !niche || !goal) {
    throw new Error("Vui lòng điền đầy đủ các trường bắt buộc.");
  }

  const updateData: ChannelUpdateData = {
    name,
    platform,
    niche,
    goal,
    target_audience,
    content_style,
    experience_level,
    tiktok_url,
    youtube_url,
    facebook_url,
    channel_status,
    current_situation,
    desired_positioning,
    updated_at: new Date().toISOString(),
  };

  const avatarFile = formData.get("avatar") as File | null;

  if (avatarFile && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `channel-avatar-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("channel-assets")
      .upload(filePath, avatarFile);

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("channel-assets").getPublicUrl(filePath);
      updateData.avatar_url = publicUrl;
    }
  }

  const { error } = await supabase
    .from("channels")
    .update(updateData)
    .eq("id", channelId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating channel:", error);
    throw new Error("Đã có lỗi xảy ra khi cập nhật hồ sơ kênh.");
  }

  revalidatePath("/app/channel");
  revalidatePath("/app");
  redirect("/app/channel");
}

export async function generateChannelPositioningAction(channelId: string) {
  if (!channelId) {
    redirectWithPositioningStatus("failed");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: channel, error: channelError } = await supabase
    .from("channels")
    .select(
      "id, name, platform, niche, goal, target_audience, content_style, experience_level, current_situation, desired_positioning, channel_status, tiktok_url, youtube_url, facebook_url",
    )
    .eq("id", channelId)
    .eq("user_id", user.id)
    .single();

  if (channelError || !channel) {
    console.error("Channel positioning query failed:", channelError);
    redirectWithPositioningStatus("failed");
  }

  const channelInput = channel as ChannelPositioningRow;

  const input: AIChannelPositioningInput = {
    name: channelInput.name,
    platform: channelInput.platform,
    niche: channelInput.niche,
    goal: channelInput.goal,
    target_audience: channelInput.target_audience,
    content_style: channelInput.content_style,
    experience_level: channelInput.experience_level,
    current_situation: channelInput.current_situation,
    desired_positioning: channelInput.desired_positioning,
    channel_status: channelInput.channel_status,
    tiktok_url: channelInput.tiktok_url,
    youtube_url: channelInput.youtube_url,
    facebook_url: channelInput.facebook_url,
  };

  const aiResult = await generateChannelPositioningWithAI(input);

  if (aiResult.status !== "succeeded" || !aiResult.result) {
    revalidatePath("/app/channel");
    redirectWithPositioningStatus(aiResult.status);
  }

  const { error: updateError } = await supabase
    .from("channels")
    .update({
      ai_positioning_result: aiResult.result,
      ai_positioning_generated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", channelId)
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Error saving AI channel positioning:", updateError);
    redirectWithPositioningStatus("failed");
  }

  revalidatePath("/app/channel");
  revalidatePath("/app");

  redirectWithPositioningStatus("succeeded");
}