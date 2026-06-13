"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateContentIdeasWithAI } from "@/lib/ai/content-ideas";
import type { AIChannelPositioningResult } from "@/types/ai-channel-positioning";
import type {
  AIContentIdea,
  AIContentIdeaConfidence,
  AIContentIdeasProductContext,
  AIContentIdeasRunResult,
} from "@/types/ai-content-ideas";
import type {
  ContentIdeaGoal,
  ContentIdeaPlatform,
} from "@/types/content-idea";

type GenerateContentIdeasInput = {
  channelId: string;
  productId?: string | null;
  platform: ContentIdeaPlatform;
  goal: ContentIdeaGoal;
  count: number;
};

type SaveGeneratedIdeasInput = {
  channelId: string;
  productId?: string | null;
  ideas: AIContentIdea[];
  confidence: AIContentIdeaConfidence;
};

type ChannelContextRow = {
  id: string;
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
  desired_positioning: string | null;
  ai_positioning_result: AIChannelPositioningResult | null;
};

type ProductContextRow = {
  id: string;
  channel_id: string | null;
  name: string;
  category: string | null;
  strengths: string | null;
  target_customer: string | null;
  notes: string | null;
  priority: string | null;
};

export type GenerateContentIdeasActionResult = {
  success: boolean;
  message: string;
  result?: AIContentIdeasRunResult["result"];
};

export type SaveGeneratedIdeasActionResult = {
  success: boolean;
  message: string;
  savedCount: number;
};

function normalizeCount(count: number) {
  if (count === 3 || count === 5 || count === 10) {
    return count;
  }

  return 3;
}

function toAIProductContext(
  product: ProductContextRow,
): AIContentIdeasProductContext {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    strengths: product.strengths,
    target_customer: product.target_customer,
    notes: product.notes,
    priority: product.priority,
  };
}

async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { supabase, user, error };
}

export async function generateContentIdeasAction(
  input: GenerateContentIdeasInput,
): Promise<GenerateContentIdeasActionResult> {
  const { supabase, user, error } = await getAuthenticatedUser();

  if (error || !user) {
    return {
      success: false,
      message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
    };
  }

  if (!input.channelId) {
    return {
      success: false,
      message: "Vui lòng chọn kênh trước khi tạo ý tưởng.",
    };
  }

  const { data: channelData, error: channelError } = await supabase
    .from("channels")
    .select(
      "id, name, platform, niche, goal, target_audience, content_style, desired_positioning, ai_positioning_result",
    )
    .eq("id", input.channelId)
    .eq("user_id", user.id)
    .single();

  if (channelError || !channelData) {
    return {
      success: false,
      message: "Không tìm thấy hồ sơ kênh hợp lệ.",
    };
  }

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select(
      "id, channel_id, name, category, strengths, target_customer, notes, priority",
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(30);

  if (productsError) {
    return {
      success: false,
      message: "Không thể lấy dữ liệu sản phẩm để tạo ý tưởng.",
    };
  }

  const products = (productsData ?? []) as ProductContextRow[];
  const selectedProduct =
    input.productId
      ? products.find((product) => product.id === input.productId) ?? null
      : null;

  if (input.productId && !selectedProduct) {
    return {
      success: false,
      message: "Sản phẩm đã chọn không hợp lệ hoặc không thuộc tài khoản này.",
    };
  }

  const aiResult = await generateContentIdeasWithAI({
    channel: channelData as ChannelContextRow,
    selectedProduct: selectedProduct
      ? toAIProductContext(selectedProduct)
      : null,
    products: products.map(toAIProductContext),
    platform: input.platform,
    goal: input.goal,
    count: normalizeCount(input.count),
  });

  if (aiResult.status !== "succeeded" || !aiResult.result) {
    return {
      success: false,
      message: aiResult.message,
    };
  }

  return {
    success: true,
    message: aiResult.message,
    result: aiResult.result,
  };
}

function normalizeContentIdeaPriority(priority: string) {
  return priority === "high" ? "high" : "normal";
}
export async function saveGeneratedIdeasAction(
  input: SaveGeneratedIdeasInput,
): Promise<SaveGeneratedIdeasActionResult> {
  const { supabase, user, error } = await getAuthenticatedUser();

  if (error || !user) {
    return {
      success: false,
      message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
      savedCount: 0,
    };
  }

  if (!input.channelId) {
    return {
      success: false,
      message: "Vui lòng chọn kênh trước khi lưu ý tưởng.",
      savedCount: 0,
    };
  }

  if (input.ideas.length === 0) {
    return {
      success: false,
      message: "Vui lòng chọn ít nhất một ý tưởng để lưu.",
      savedCount: 0,
    };
  }

  const { data: channelData, error: channelError } = await supabase
    .from("channels")
    .select("id")
    .eq("id", input.channelId)
    .eq("user_id", user.id)
    .single();

  if (channelError || !channelData) {
    return {
      success: false,
      message: "Không tìm thấy hồ sơ kênh hợp lệ.",
      savedCount: 0,
    };
  }

  let productId: string | null = input.productId || null;

  if (productId) {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (productError || !productData) {
      productId = null;
    }
  }

  const now = new Date().toISOString();

  const rows = input.ideas.map((idea) => ({
    user_id: user.id,
    channel_id: input.channelId,
    product_id: productId,
    title: idea.title,
    hook: idea.hook,
    angle: idea.angle,
    platform: idea.platform,
    content_format: idea.content_format,
    goal: idea.goal,
    target_audience: idea.target_audience,
    cta: idea.cta,
    hashtags: idea.hashtags.join(" "),
    notes: idea.notes,
    source_type: "ai",
 status: "draft",
priority: normalizeContentIdeaPriority(idea.priority),
    ai_reason: idea.ai_reason,
    ai_raw_result: {
      idea,
      confidence: input.confidence,
    },
    created_at: now,
    updated_at: now,
  }));

  const { error: insertError } = await supabase
    .from("content_ideas")
    .insert(rows);

 if (insertError) {
  console.error("Error saving AI content ideas:", {
    code: insertError.code,
    message: insertError.message,
    details: insertError.details,
    hint: insertError.hint,
  });

  return {
    success: false,
    message:
      insertError.message ||
      "Không thể lưu ý tưởng. Vui lòng thử lại.",
    savedCount: 0,
  };
}

  revalidatePath("/app/ideas");
  revalidatePath("/app");

  return {
    success: true,
    message: `Đã lưu ${rows.length} ý tưởng vào thư viện.`,
    savedCount: rows.length,
  };
}