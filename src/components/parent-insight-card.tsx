import { Check, Minus, Quote } from "lucide-react";
import { RatingBadge } from "@/components/ui/rating-badge";
import type { ParentInsight } from "@/features/schools/types";

type ParentInsightCardProps = {
  insight: ParentInsight;
  compact?: boolean;
};

export function ParentInsightCard({ insight, compact = false }: ParentInsightCardProps) {
  const hasStructured = insight.strengths || insight.frustrations;

  return (
    <article className="rounded-2xl border border-[#0F2540]/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1DBAA5]">{insight.context}</p>
          <h3 className="mt-1 text-base font-semibold text-[#0F2540]">{insight.title}</h3>
        </div>
        <RatingBadge rating={insight.rating} reviewCount={1} />
      </div>

      {hasStructured ? (
        <div className="mt-4 space-y-3">
          {insight.strengths && (
            <div className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-sm leading-relaxed text-[#667085]">{insight.strengths}</p>
            </div>
          )}
          {insight.frustrations && (
            <div className="flex gap-2.5">
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-sm leading-relaxed text-[#667085]">{insight.frustrations}</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <Quote className="mt-4 h-5 w-5 text-[#1DBAA5]" />
          <p className="mt-2 text-sm leading-relaxed text-[#667085]">{insight.quote}</p>
        </>
      )}

      {!compact && <p className="mt-3 text-xs text-[#667085]">{insight.author}</p>}
    </article>
  );
}
