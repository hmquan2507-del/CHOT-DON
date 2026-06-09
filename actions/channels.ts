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

  if (!name || !platform || !niche || !goal) {
    throw new Error("Vui lòng điền đầy đủ các trường bắt buộc.");
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
  });

  if (error) {
    console.error("Error creating channel:", error);
    throw new Error("Đã có lỗi xảy ra khi tạo hồ sơ kênh.");
  }

  revalidatePath("/app/channel");
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

  if (!name || !platform || !niche || !goal) {
    throw new Error("Vui lòng điền đầy đủ các trường bắt buộc.");
  }

  const { error } = await supabase
    .from("channels")
    .update({
      name,
      platform,
      niche,
      goal,
      target_audience,
      content_style,
      experience_level,
      updated_at: new Date().toISOString(),
    })
    .eq("id", channelId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating channel:", error);
    throw new Error("Đã có lỗi xảy ra khi cập nhật hồ sơ kênh.");
  }

  revalidatePath("/app/channel");
  redirect("/app/channel");
}
