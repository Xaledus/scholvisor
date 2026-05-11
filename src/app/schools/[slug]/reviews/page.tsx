import { notFound } from "next/navigation";
import { ParentInsightCard } from "@/components/parent-insight-card";
import { schoolRepository } from "@/features/schools/repository";

type ReviewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { slug } = await params;
  const school = await schoolRepository.getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const insights = await schoolRepository.listParentInsightsBySchool(slug);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <section>
        <h1 className="text-2xl font-bold text-[#0F2540]">{school.name} reviews</h1>
        <p className="mt-2 text-sm text-[#667085]">
          Context-first reflections from families with similar transition stages.
        </p>
      </section>

      <section className="mt-6 grid gap-4">
        {insights.length > 0 ? (
          insights.map((insight) => <ParentInsightCard key={insight.id} insight={insight} />)
        ) : (
          <div className="rounded-2xl border border-dashed border-[#0F2540]/20 bg-white p-6 text-sm text-[#667085]">
            No detailed parent reflections have been added yet.
          </div>
        )}
      </section>
    </main>
  );
}
