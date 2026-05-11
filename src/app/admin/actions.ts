"use server";

import { revalidatePath } from "next/cache";
import { approveReview, rejectReview } from "@/data/reviews/pending-store";

function verifySecret(secret: string): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  return Boolean(adminSecret && secret === adminSecret);
}

export async function approveReviewAction(
  reviewId: string,
  schoolSlug: string,
  secret: string
): Promise<void> {
  if (!verifySecret(secret)) return;
  await approveReview(reviewId);
  revalidatePath("/admin");
  revalidatePath(`/schools/${schoolSlug}`);
}

export async function rejectReviewAction(
  reviewId: string,
  reason: string,
  secret: string
): Promise<void> {
  if (!verifySecret(secret)) return;
  await rejectReview(reviewId, reason || undefined);
  revalidatePath("/admin");
}
