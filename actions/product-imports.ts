"use server";

import { createClient } from "@/lib/supabase/server";
import {
  normalizeUrl,
  validateUrl,
  extractDomain,
} from "@/lib/product-import/url";
import { extractMetadata } from "@/lib/product-import/extract-metadata";
import { enrichProductWithAI } from "@/lib/ai/product-enrichment";
import type { ProductFormDefaultValues } from "@/components/app/products/ProductForm";
import type {
  AIProductEnrichmentResult,
  AIProductEnrichmentStatus,
} from "@/types/ai-product-enrichment";

export type ExtractProductMetadataResult = {
  defaultValues: ProductFormDefaultValues;
  success: boolean;
  message: string;
  importId?: string;
};

export type EnrichProductImportResult = {
  defaultValues: ProductFormDefaultValues;
  success: boolean;
  status: AIProductEnrichmentStatus;
  message: string;
  enrichment?: AIProductEnrichmentResult;
};

type ChannelContext = {
  name: string | null;
  platform: string | null;
  niche: string | null;
  goal: string | null;
  target_audience: string | null;
  content_style: string | null;
};

function appendAIEnrichmentToNotes(
  baseNotes: string | undefined,
  enrichment: AIProductEnrichmentResult,
) {
  const sections = [
    enrichment.notes
      ? `Ghi chú AI:\n${enrichment.notes}`
      : null,
    enrichment.content_angles.length > 0
      ? `Góc nội dung gợi ý:\n${enrichment.content_angles
          .map((item) => `- ${item}`)
          .join("\n")}`
      : null,
    enrichment.hook_examples.length > 0
      ? `Hook gợi ý:\n${enrichment.hook_examples
          .map((item) => `- ${item}`)
          .join("\n")}`
      : null,
    enrichment.cta_examples.length > 0
      ? `CTA gợi ý:\n${enrichment.cta_examples
          .map((item) => `- ${item}`)
          .join("\n")}`
      : null,
    `Độ tin cậy AI: ${enrichment.confidence}`,
  ].filter(Boolean);

  return [baseNotes, sections.join("\n\n")].filter(Boolean).join("\n\n");
}

/**
 * Server action: extract metadata from a product/affiliate URL.
 *
 * 1. Authenticates the current user.
 * 2. Validates and normalizes the URL.
 * 3. Creates a product_imports record with status "pending".
 * 4. Attempts server-side metadata extraction (fetch + OG parse).
 * 5. Updates the record with results or error.
 * 6. Returns defaultValues for ProductForm.
 *
 * On success: name = metadata title, notes = description + user notes, affiliate_url = source URL.
 * On failure: affiliate_url + user notes only (Phase 4.4A fallback).
 */
export async function extractProductMetadata(
  rawUrl: string,
  userNotes: string,
): Promise<ExtractProductMetadataResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
      defaultValues: {
        affiliate_url: rawUrl?.trim() || undefined,
        notes: userNotes?.trim() || undefined,
      },
    };
  }

  const validationError = validateUrl(rawUrl);

  if (validationError) {
    return {
      success: false,
      message: validationError,
      defaultValues: {},
    };
  }

  const sourceUrl = normalizeUrl(rawUrl);
  const sourceDomain = extractDomain(sourceUrl);

  let importId: string | undefined;

  try {
    const { data: importRecord } = await supabase
      .from("product_imports")
      .insert({
        user_id: user.id,
        source_url: sourceUrl,
        source_domain: sourceDomain,
        status: "pending",
        user_notes: userNotes?.trim() || null,
      })
      .select("id")
      .single();

    if (importRecord?.id) {
      importId = importRecord.id;
    }
  } catch (error) {
    console.error("Failed to create product_import record:", error);
  }

  try {
    const metadata = await extractMetadata(sourceUrl);

    const notesParts = [metadata.description, userNotes?.trim()].filter(Boolean);

    const combinedNotes =
      notesParts.length > 0 ? notesParts.join("\n\n") : undefined;

    if (importId) {
      await supabase
        .from("product_imports")
        .update({
          status: metadata.title ? "succeeded" : "needs_review",
          raw_title: metadata.title,
          raw_description: metadata.description,
          raw_image_url: metadata.imageUrl,
          raw_metadata: metadata.rawMetadata,
        })
        .eq("id", importId);
    }

    return {
      success: true,
      message: "Đã lấy được thông tin cơ bản. Vui lòng kiểm tra trước khi lưu.",
      defaultValues: {
        name: metadata.title || undefined,
        affiliate_url: sourceUrl,
        notes: combinedNotes,
      },
      importId,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Không thể lấy thông tin từ link.";

    if (importId) {
      await supabase
        .from("product_imports")
        .update({
          status: "failed",
          error_message: errorMessage,
        })
        .eq("id", importId);
    }

    return {
      success: false,
      message:
        "Không lấy được thông tin tự động. Bạn vẫn có thể nhập thủ công và lưu sản phẩm.",
      defaultValues: {
        affiliate_url: sourceUrl,
        notes: userNotes?.trim() || undefined,
      },
      importId,
    };
  }
}

export async function enrichProductImport(
  rawUrl: string,
  userNotes: string,
  baseDefaultValues?: ProductFormDefaultValues,
): Promise<EnrichProductImportResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const fallbackDefaults: ProductFormDefaultValues = {
    ...baseDefaultValues,
    affiliate_url: baseDefaultValues?.affiliate_url || rawUrl?.trim() || undefined,
    notes: baseDefaultValues?.notes || userNotes?.trim() || undefined,
  };

  if (userError || !user) {
    return {
      success: false,
      status: "failed",
      message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
      defaultValues: fallbackDefaults,
    };
  }

  const validationError = validateUrl(rawUrl);

  if (validationError) {
    return {
      success: false,
      status: "failed",
      message: validationError,
      defaultValues: fallbackDefaults,
    };
  }

  const sourceUrl = normalizeUrl(rawUrl);
  const sourceDomain = extractDomain(sourceUrl);

  const { data: channelData } = await supabase
    .from("channels")
    .select("name, platform, niche, goal, target_audience, content_style")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const channel = (channelData ?? null) as ChannelContext | null;

  const aiResult = await enrichProductWithAI({
    sourceUrl,
    sourceDomain,
    metadataTitle: baseDefaultValues?.name || null,
    metadataDescription: baseDefaultValues?.notes || null,
    userNotes: userNotes?.trim() || null,
    channel,
  });

  if (aiResult.status !== "succeeded" || !aiResult.result) {
    return {
      success: false,
      status: aiResult.status,
      message: aiResult.message,
      defaultValues: {
        ...fallbackDefaults,
        affiliate_url: sourceUrl,
      },
    };
  }

  const enrichment = aiResult.result;

  return {
    success: true,
    status: "succeeded",
    message: aiResult.message,
    enrichment,
    defaultValues: {
      ...fallbackDefaults,
      affiliate_url: sourceUrl,
      name: enrichment.name || fallbackDefaults.name,
      category: enrichment.category || fallbackDefaults.category,
      strengths: enrichment.strengths || fallbackDefaults.strengths,
      target_customer:
        enrichment.target_customer || fallbackDefaults.target_customer,
      notes: appendAIEnrichmentToNotes(fallbackDefaults.notes, enrichment),
    },
  };
}