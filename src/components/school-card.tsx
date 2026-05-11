"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getContextualBadges } from "@/features/schools/helpers/badge-helpers";
import type { School } from "@/features/schools/types";

type SchoolCardProps = {
  school: School;
  compared?: boolean;
  onToggleCompare?: (slug: string) => void;
};

export function SchoolCard({ school, compared = false, onToggleCompare }: SchoolCardProps) {
  return (
    <article className="rounded-2xl border border-[#0F2540]/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#0F2540]">{school.name}</h3>
          <p className="text-sm text-[#667085]">
            {school.location} · Ages {school.ages}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[#0F2540]/15 px-3 py-1 text-xs font-medium text-[#667085]">
          {school.reviewCount} reviews
        </span>
      </div>

      <p className="mt-3 text-sm text-[#667085]">{school.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {getContextualBadges(school).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#667085]">
        <span>{school.curriculum.join(" · ")}</span>
        <span>{school.annualTuitionRange} / year</span>
      </div>

      <div className="mt-2 text-xs text-[#667085]">
        <span>{school.schoolLevel}</span>
        <span className="mx-2">·</span>
        <span>Islamic environment: {school.islamicEnvironment}</span>
      </div>
      <p className="mt-3 rounded-xl bg-[#F2F4F7] p-3 text-xs leading-relaxed text-[#667085]">
        Parent insight: {school.parentInsight}
      </p>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/schools/${school.slug}`}
          className="inline-flex rounded-lg bg-[#0F2540] px-4 py-2 text-sm font-medium text-white"
        >
          View school
        </Link>
        <Link
          href={`/schools/${school.slug}/reviews`}
          className="inline-flex rounded-lg border border-[#0F2540]/15 px-4 py-2 text-sm font-medium text-[#0F2540]"
        >
          Read reviews
        </Link>
        <button
          type="button"
          onClick={() => onToggleCompare?.(school.slug)}
          className={`inline-flex rounded-lg border px-4 py-2 text-sm font-medium transition ${
            compared
              ? "border-[#1DBAA5] bg-[#E3F3EF] text-[#0F2540]"
              : "border-[#0F2540]/15 bg-white text-[#0F2540]"
          }`}
          aria-pressed={compared}
        >
          {compared ? "Comparing" : "Compare"}
        </button>
      </div>
    </article>
  );
}
