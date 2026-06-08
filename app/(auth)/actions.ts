"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function loginAction(formData: FormData) {
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");
  const redirectedFrom = getStringValue(formData, "redirectedFrom");

  const redirectParams = new URLSearchParams();
  if (redirectedFrom) {
    redirectParams.set("redirectedFrom", redirectedFrom);
  }

  if (!email || !password) {
    redirectParams.set("error", "missing-fields");
    redirect(`/login?${redirectParams.toString()}`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectParams.set("error", "invalid-credentials");
    redirect(`/login?${redirectParams.toString()}`);
  }

  if (redirectedFrom && redirectedFrom.startsWith("/")) {
    redirect(redirectedFrom);
  }

  redirect("/app");
}

export async function registerAction(formData: FormData) {
  const fullName = getStringValue(formData, "fullName");
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");

  if (!fullName || !email || !password) {
    redirect("/register?error=missing-fields");
  }

  if (password.length < 6) {
    redirect("/register?error=weak-password");
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?message=check-email");
}

export async function logoutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login?message=logged-out");
}