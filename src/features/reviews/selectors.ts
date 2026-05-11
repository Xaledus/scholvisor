import type { ParentInsight } from "@/features/schools/types";
import { requiredCriteriaKeys } from "@/features/reviews/schemas";
import type { StoredReview } from "@/features/reviews/types";

// Converts an approved StoredReview into a ParentInsight for display on school pages.
// The per-review average rating is derived from required criteria scores only —
// it is not a global school aggregate and does not violate the no-global-score rule.
export function reviewToParentInsight(review: StoredReview): ParentInsight {
  const scores = requiredCriteriaKeys
    .map((k) => review.criteriaScores[k])
    .filter((s): s is number => s !== null);

  const avgRating =
    scores.length > 0
      ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 2) / 2
      : 3;

  const authorLabel =
    review.relationship === "current-parent" ? "Current parent" : "Former parent";

  return {
    id: review.id,
    schoolSlug: review.schoolSlug,
    title: `${authorLabel} reflection`,
    context: [review.attendancePeriod, review.nationality].filter(Boolean).join(" · "),
    quote: review.strengths || review.frustrations || "A verified parent perspective.",
    author: `${authorLabel}${review.childGrade ? `, ${review.childGrade}` : ""}`,
    rating: avgRating
  };
}
