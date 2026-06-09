export type ProductStatus = "active" | "draft" | "archived";

export type ProductPriority = "normal" | "high";

export type Product = {
  id: string;
  user_id: string;
  channel_id: string | null;
  name: string;
  price: number | null;
  commission: number | null;
  affiliate_url: string | null;
  strengths: string | null;
  target_customer: string | null;
  notes: string | null;
  category: string | null;
  status: ProductStatus;
  priority: ProductPriority;
  created_at: string;
  updated_at: string;
};

export type ProductFormState = {
  success?: boolean;
  error?: string;
};

export type ProductInput = {
  name: string;
  price: number | null;
  commission: number | null;
  affiliate_url: string | null;
  strengths: string | null;
  target_customer: string | null;
  notes: string | null;
  category: string | null;
  status: ProductStatus;
  priority: ProductPriority;
  channel_id: string | null;
};