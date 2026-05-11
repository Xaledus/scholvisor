"use server";

import { addPendingReview } from "@/data/reviews/pending-store";
import { requiredCriteriaKeys } from "@/features/reviews/schemas";
import type { PendingReview, ReviewFormData } from "@/features/reviews/types";

type SubmitResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function submitReview(data: ReviewFormData): Promise<SubmitResult> {
  if (!data.schoolSlug || !data.relationship || !data.childGrade || !data.attendancePeriod) {
    return { success: false, error: "Missing required fields in step 1." };
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: "Invalid email address." };
  }

  const missingCriteria = requiredCriteriaKeys.some(
    (key) => data.criteriaScores[key] === null
  );
  if (missingCriteria) {
    return { success: false, error: "All required criteria must be rated." };
  }

  if (!data.consentGiven) {
    return { success: false, error: "Consent is required to submit a review." };
  }

  const review: PendingReview = {
    ...data,
    id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    submittedAt: new Date().toISOString()
  };

  await addPendingReview(review);

  return { success: true, id: review.id };
}
