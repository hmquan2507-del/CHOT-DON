"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type {
  ProductInput,
  ProductPriority,
  ProductStatus,
} from "@/types/product";

const PRODUCT_STATUSES: ProductStatus[] = ["active", "draft", "archived"];
const PRODUCT_PRIORITIES: ProductPriority[] = ["normal", "high"];

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const normalizedValue = trimmedValue.replace(",", ".");
  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    throw new Error(`${key} không hợp lệ.`);
  }

  return parsedValue;
}

function getProductStatus(value: FormDataEntryValue | null): ProductStatus {
  if (typeof value !== "string") {
    return "active";
  }

  const status = value.trim();

  if (PRODUCT_STATUSES.includes(status as ProductStatus)) {
    return status as ProductStatus;
  }

  return "active";
}

function getProductPriority(value: FormDataEntryValue | null): ProductPriority {
  if (typeof value !== "string") {
    return "normal";
  }

  const priority = value.trim();

  if (PRODUCT_PRIORITIES.includes(priority as ProductPriority)) {
    return priority as ProductPriority;
  }

  return "normal";
}

function getProductInput(formData: FormData): ProductInput {
  const name = getRequiredString(formData, "name");

  if (!name) {
    throw new Error("Tên sản phẩm là bắt buộc.");
  }

  return {
    name,
    price: getOptionalNumber(formData, "price"),
    commission: getOptionalNumber(formData, "commission"),
    affiliate_url: getOptionalString(formData, "affiliate_url"),
    strengths: getOptionalString(formData, "strengths"),
    target_customer: getOptionalString(formData, "target_customer"),
    notes: getOptionalString(formData, "notes"),
    category: getOptionalString(formData, "category"),
    status: getProductStatus(formData.get("status")),
    priority: getProductPriority(formData.get("priority")),
    channel_id: getOptionalString(formData, "channel_id"),
  };
}

function redirectWithProductError(message: string): never {
  redirect(`/app/products?error=${encodeURIComponent(message)}`);
}

async function getCurrentUserOrRedirect() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return {
    supabase,
    user,
  };
}

function refreshProductRoutes() {
  revalidatePath("/app/products");
  revalidatePath("/app");
}

export async function createProduct(formData: FormData) {
  const { supabase, user } = await getCurrentUserOrRedirect();

  let input: ProductInput;

  try {
    input = getProductInput(formData);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Dữ liệu sản phẩm không hợp lệ.";

    redirectWithProductError(message);
  }

  const { error } = await supabase.from("products").insert({
    user_id: user.id,
    channel_id: input.channel_id,
    name: input.name,
    price: input.price,
    commission: input.commission,
    affiliate_url: input.affiliate_url,
    strengths: input.strengths,
    target_customer: input.target_customer,
    notes: input.notes,
    category: input.category,
    status: input.status,
    priority: input.priority,
  });

  if (error) {
    redirectWithProductError(error.message);
  }

  refreshProductRoutes();

  redirect("/app/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  if (!productId) {
    redirectWithProductError("Thiếu ID sản phẩm.");
  }

  const { supabase, user } = await getCurrentUserOrRedirect();

  let input: ProductInput;

  try {
    input = getProductInput(formData);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Dữ liệu sản phẩm không hợp lệ.";

    redirectWithProductError(message);
  }

  const { error } = await supabase
    .from("products")
    .update({
      channel_id: input.channel_id,
      name: input.name,
      price: input.price,
      commission: input.commission,
      affiliate_url: input.affiliate_url,
      strengths: input.strengths,
      target_customer: input.target_customer,
      notes: input.notes,
      category: input.category,
      status: input.status,
      priority: input.priority,
    })
    .eq("id", productId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithProductError(error.message);
  }

  refreshProductRoutes();

  redirect("/app/products");
}

export async function deleteProduct(productId: string) {
  if (!productId) {
    redirectWithProductError("Thiếu ID sản phẩm.");
  }

  const { supabase, user } = await getCurrentUserOrRedirect();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithProductError(error.message);
  }

  refreshProductRoutes();

  redirect("/app/products");
}