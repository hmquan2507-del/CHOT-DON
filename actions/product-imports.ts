"use server";

import { createClient } from "@/lib/supabase/server";
import {
  normalizeUrl,
  validateUrl,
  extractDomain,
} from "@/lib/product-import/url";
import { extractMetadata } from "@/lib/product-import/extract-metadata";
import type { ProductFormDefaultValues } from "@/components/app/products/ProductForm";

export type ExtractProductMetadataResult = {
  defaultValues: ProductFormDefaultValues;
  success: boolean;
  message: string;
  importId?: string;
};

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
  // 1. Auth — must be server-side, never trust client user_id
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

  // 2. Validate URL
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

  // 3. Create product_imports record with status "pending"
  //    Non-blocking: if insert fails, we still proceed with extraction
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
    // Non-blocking — continue with extraction
  }

  // 4. Attempt metadata extraction
  try {
    const metadata = await extractMetadata(sourceUrl);

    // Combine metadata description with user notes
    const notesParts = [metadata.description, userNotes?.trim()]
      .filter(Boolean);

    const combinedNotes =
      notesParts.length > 0 ? notesParts.join("\n\n") : undefined;

    // 5. Update record with success
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

    // 5. Update record with failure
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
