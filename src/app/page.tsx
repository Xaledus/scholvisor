import { ParentInsightCard } from "@/components/parent-insight-card";
import { SchoolCard } from "@/components/school-card";
import { CTAButton } from "@/components/ui/cta-button";
import { TrustBadge } from "@/components/ui/trust-badge";
import { schoolRepository } from "@/features/schools/repository";

export default async function HomePage() {
  const featuredSchools = await schoolRepository.listFeaturedSchools(2);
  const parentInsights = (await schoolRepository.listParentInsights()).slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="rounded-3xl bg-[#0F2540] px-5 py-10 text-white sm:px-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[#E3F3EF]">Your guide. Their future.</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Because brochures don&apos;t tell the whole story.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#E3F3EF] sm:text-base">
          Scholvisor helps families understand what school life really feels like through contextual parent
          insights.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/schools">Explore schools</CTAButton>
          <CTAButton href="/review/start" variant="secondary">
            Share your experience
          </CTAButton>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap gap-3">
        <TrustBadge label="Verified parent context" />
        <TrustBadge label="Signal-first school fit" />
        <TrustBadge label="No noisy rankings" />
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-[#0F2540]">Smart search preview</h2>
          <p className="text-sm text-[#667085]">Find schools by family fit, not just brochures and metrics.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredSchools.map((school) => (
            <SchoolCard key={school.slug} school={school} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-[#0F2540]">Contextual parent review preview</h2>
          <p className="text-sm text-[#667085]">
            Reviews are grounded in context: child age, transition stage, and day-to-day reality.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {parentInsights.map((insight) => (
            <ParentInsightCard key={insight.id} insight={insight} compact />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#0F2540]/10 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[#0F2540]">How Scholvisor works</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-[#F2F4F7] p-4">
            <p className="text-sm font-semibold text-[#0F2540]">1. Clarify your context</p>
            <p className="mt-1 text-sm text-[#667085]">Family priorities, child needs, budget, and timeline.</p>
          </div>
          <div className="rounded-xl bg-[#F2F4F7] p-4">
            <p className="text-sm font-semibold text-[#0F2540]">2. Explore fit signals</p>
            <p className="mt-1 text-sm text-[#667085]">Compare schools through lived parent experiences.</p>
          </div>
          <div className="rounded-xl bg-[#F2F4F7] p-4">
            <p className="text-sm font-semibold text-[#0F2540]">3. Decide with confidence</p>
            <p className="mt-1 text-sm text-[#667085]">Shortlist options and move forward with clarity.</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-[#E3F3EF] p-6 text-center">
        <h2 className="text-2xl font-semibold text-[#0F2540]">Ready to find your best-fit school?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[#667085]">
          Start with a calm, guided flow that helps your family focus on what matters most.
        </p>
        <div className="mt-5">
          <CTAButton href="/find">Start Find My Dream School</CTAButton>
        </div>
      </section>
    </main>
  );
}
