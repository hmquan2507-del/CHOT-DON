export type ProductImportStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "needs_review"
  | "converted";

export type ProductMetadataResult = {
  sourceUrl: string;
  sourceDomain: string | null;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  rawMetadata: Record<string, string>;
};

export type ProductImportRecord = {
  id: string;
  user_id: string;
  channel_id: string | null;
  source_url: string;
  source_domain: string | null;
  status: ProductImportStatus;
  raw_title: string | null;
  raw_description: string | null;
  raw_image_url: string | null;
  raw_metadata: Record<string, string> | null;
  user_notes: string | null;
  error_message: string | null;
  created_product_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ExtractMetadataResult =
  | {
      success: true;
      metadata: ProductMetadataResult;
    }
  | {
      success: false;
      error: string;
    };
