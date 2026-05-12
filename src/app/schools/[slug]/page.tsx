import Link from "next/link";
import { notFound } from "next/navigation";
import { PencilLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { CriterionBar } from "@/components/ui/criterion-bar";
import { ParentInsightCard } from "@/components/parent-insight-card";
import { schoolRepository } from "@/features/schools/repository";
import { listApprovedReviewsBySchool } from "@/data/reviews/pending-store";
import { reviewToParentInsight } from "@/features/reviews/selectors";

type SchoolOverviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SchoolOverviewPage({ params }: SchoolOverviewPageProps) {
  const { slug } = await params;
  const school = await schoolRepository.getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const mockInsights = await schoolRepository.listParentInsightsBySchool(slug);
  const approvedInsights = (await listApprovedReviewsBySchool(slug)).map(reviewToParentInsight);
  const insights = [...mockInsights, ...approvedInsights];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">

      {/* School header */}
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1DBAA5]">
          {school.location} · {school.schoolLevel}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#0F2540] sm:text-3xl">{school.name}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#667085]">{school.summary}</p>
        {school.website_url && (
          <a
            href={school.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-[#1DBAA5]"
          >
            Visit official website →
          </a>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {school.fitTags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </section>

      {/* Key facts */}
      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#667085]">Key facts</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-[#667085]">Curriculum</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0F2540]">{school.curriculum.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#667085]">Ages</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0F2540]">{school.ages}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#667085]">Annual tuition</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0F2540]">{school.annualTuitionRange}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#667085]">School level</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0F2540]">{school.schoolLevel}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#667085]">Islamic environment</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0F2540]">{school.islamicEnvironment}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#667085]">Parent perspectives</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#0F2540]">{school.reviewCount} reviews</dd>
          </div>
        </dl>
      </section>

      {/* Criteria scores — no global aggregate shown */}
      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-[#0F2540]">What parents signal</h2>
        <p className="mt-1 text-xs text-[#667085]">
          Per-area signals from {school.reviewCount} parent perspectives — not a single score.
        </p>
        <div className="mt-5 space-y-4">
          {school.criteriaScores.map((criterion) => (
            <CriterionBar
              key={criterion.label}
              label={criterion.label}
              score={criterion.score}
            />
          ))}
        </div>
      </section>

      {/* Parent reflections */}
      <section className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0F2540]">Parent reflections</h2>
          {insights.length > 0 && (
            <Link
              href={`/schools/${school.slug}/reviews`}
              className="text-xs font-semibold text-[#1DBAA5]"
            >
              All {school.reviewCount} reviews →
            </Link>
          )}
        </div>

        {insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight) => (
              <ParentInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#0F2540]/20 bg-white p-6 text-sm text-[#667085]">
            No parent reflections yet for this school.
          </div>
        )}
      </section>

      {/* Write a review CTA */}
      <section className="mt-6 rounded-2xl border border-[#1DBAA5]/20 bg-[#E3F3EF] p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-[#1DBAA5]/15 p-2">
            <PencilLine className="h-4 w-4 text-[#1DBAA5]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#0F2540]">Have a child at {school.name}?</p>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Share what brochures miss — your context helps other families decide with confidence.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <CTAButton href="/review/start">Share your experience</CTAButton>
              <Link
                href="/find"
                className="inline-flex items-center justify-center rounded-xl border border-[#0F2540]/20 bg-white px-5 py-3 text-sm font-semibold text-[#0F2540]"
              >
                Check fit for my family
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Report error */}
      <div className="mt-4 text-center">
        <a
          href={`mailto:hello@scholvisor.com?subject=${encodeURIComponent(`Error report: ${school.name}`)}`}
          className="text-xs text-[#667085] underline-offset-2 hover:underline"
        >
          Report an error
        </a>
      </div>

    </main>
  );
}
