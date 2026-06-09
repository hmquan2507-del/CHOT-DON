"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ChannelPlatform, ExperienceLevel } from "@/types/channel";

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
  const channel_status = (formData.get("channel_status") as string) || "not_started";
  const current_situation = (formData.get("current_situation") as string) || null;
  const desired_positioning = (formData.get("desired_positioning") as string) || null;

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
  const channel_status = (formData.get("channel_status") as string) || "not_started";
  const current_situation = (formData.get("current_situation") as string) || null;
  const desired_positioning = (formData.get("desired_positioning") as string) || null;

  if (!name || !platform || !niche || !goal) {
    throw new Error("Vui lòng điền đầy đủ các trường bắt buộc.");
  }

  const updateData: any = {
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
