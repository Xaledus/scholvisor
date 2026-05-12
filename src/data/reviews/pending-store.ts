import { createServerClient } from "@/lib/supabase/server";
import type { CriteriaScores, StoredReview } from "@/features/reviews/types";

function rowToStoredReview(row: Record<string, unknown>): StoredReview {
  const criteriaScores: CriteriaScores = {
    academicQuality: (row.academic_quality as number | null) ?? null,
    communicationAdmin: (row.communication_admin as number | null) ?? null,
    integrationWellbeing: (row.integration_wellbeing as number | null) ?? null,
    facilitiesActivities: (row.facilities_activities as number | null) ?? null,
    valueForMoney: (row.value_for_money as number | null) ?? null,
    marketingVsReality: (row.marketing_vs_reality as number | null) ?? null,
    islamicEnvironment: (row.islamic_environment as number | null) ?? null,
  };

  return {
    id: row.id as string,
    schoolSlug: row.school_slug as string,
    relationship: row.relationship as StoredReview["relationship"],
    childGrade: row.child_grade as string,
    attendancePeriod: row.attendance_period as string,
    nationality: (row.nationality as string) ?? "",
    displayName: (row.display_name as string) ?? "",
    email: row.email as string,
    strengths: (row.strengths as string) ?? "",
    frustrations: (row.frustrations as string) ?? "",
    criteriaScores,
    consentGiven: row.consent_given as boolean,
    status: row.status as StoredReview["status"],
    submittedAt: row.submitted_at as string,
    rejectionReason: (row.rejection_reason as string | undefined) ?? undefined,
    moderatedAt: (row.moderated_at as string | undefined) ?? undefined,
  };
}

// Write operations throw — callers (server actions) handle the error.
export async function addPendingReview(review: StoredReview): Promise<void> {
  const db = createServerClient();
  const { error } = await db.from("reviews").insert({
    id: review.id,
    school_slug: review.schoolSlug,
    relationship: review.relationship,
    child_grade: review.childGrade,
    attendance_period: review.attendancePeriod,
    nationality: review.nationality || null,
    display_name: review.displayName || null,
    email: review.email,
    strengths: review.strengths || null,
    frustrations: review.frustrations || null,
    consent_given: review.consentGiven,
    status: "pending",
    submitted_at: review.submittedAt,
    academic_quality: review.criteriaScores.academicQuality,
    communication_admin: review.criteriaScores.communicationAdmin,
    integration_wellbeing: review.criteriaScores.integrationWellbeing,
    facilities_activities: review.criteriaScores.facilitiesActivities,
    value_for_money: review.criteriaScores.valueForMoney,
    marketing_vs_reality: review.criteriaScores.marketingVsReality,
    islamic_environment: review.criteriaScores.islamicEnvironment,
  });
  if (error) {
    console.error("[addPendingReview] insert error:", error.message, error.details);
    throw new Error(`addPendingReview: ${error.message}`);
  }
  console.log("[addPendingReview] saved review:", review.id);
}

export async function approveReview(id: string): Promise<void> {
  const db = createServerClient();
  const { error } = await db
    .from("reviews")
    .update({ status: "approved", moderated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`approveReview: ${error.message}`);
}

export async function rejectReview(id: string, reason?: string): Promise<void> {
  const db = createServerClient();
  const { error } = await db
    .from("reviews")
    .update({
      status: "rejected",
      rejection_reason: reason ?? null,
      moderated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(`rejectReview: ${error.message}`);
}

// Read operations return empty on error — pages degrade gracefully rather than crashing.
export async function listPendingReviews(): Promise<readonly StoredReview[]> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("reviews")
      .select("*")
      .eq("status", "pending")
      .order("submitted_at", { ascending: false });
    console.log("[listPendingReviews] rows:", data?.length ?? 0, "error:", error?.message ?? null);
    if (error) return [];
    return (data ?? []).map(rowToStoredReview);
  } catch (e) {
    console.error("[listPendingReviews] caught:", e);
    return [];
  }
}

export async function listAllReviews(): Promise<readonly StoredReview[]> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("reviews")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (error) return [];
    return (data ?? []).map(rowToStoredReview);
  } catch {
    return [];
  }
}

export async function listApprovedReviewsBySchool(slug: string): Promise<readonly StoredReview[]> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("reviews")
      .select("*")
      .eq("school_slug", slug)
      .eq("status", "approved")
      .order("submitted_at", { ascending: false });
    if (error) return [];
    return (data ?? []).map(rowToStoredReview);
  } catch {
    return [];
  }
}
