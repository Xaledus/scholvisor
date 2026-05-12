"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, createSessionToken } from "@/lib/admin-auth";

export async function loginAction(formData: FormData): Promise<void> {
  const inputEmail = String(formData.get("email") ?? "").toLowerCase().trim();
  const inputPassword = String(formData.get("password") ?? "");

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase().trim();
  const adminPassword = (process.env.ADMIN_PASSWORD ?? "").trim();

  if (!inputEmail || !inputPassword || inputEmail !== adminEmail || inputPassword !== adminPassword) {
    redirect("/admin/login?error=1");
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/admin");
}
