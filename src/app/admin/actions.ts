"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { approveReview, rejectReview } from "@/data/reviews/pending-store";
import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";

async function assertAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || !(await verifySessionToken(token))) {
    throw new Error("Unauthorized");
  }
}

export async function approveReviewAction(reviewId: string, schoolSlug: string): Promise<void> {
  await assertAdminSession();
  await approveReview(reviewId);
  revalidatePath("/admin");
  revalidatePath(`/schools/${schoolSlug}`);
}

export async function rejectReviewAction(reviewId: string, reason: string): Promise<void> {
  await assertAdminSession();
  await rejectReview(reviewId, reason || undefined);
  revalidatePath("/admin");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
