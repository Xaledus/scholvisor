import { Star } from "lucide-react";
import { formatRating, formatReviewCount } from "@/features/schools/helpers/score-formatters";

type RatingBadgeProps = {
  rating: number;
  reviewCount: number;
};

export function RatingBadge({ rating, reviewCount }: RatingBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[#0F2540] px-3 py-1 text-xs font-semibold text-white">
      <Star className="h-3.5 w-3.5 fill-[#FFB545] text-[#FFB545]" />
      {formatRating(rating)} ({formatReviewCount(reviewCount)})
    </div>
  );
}
