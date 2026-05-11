import { AdminReviewCard } from "@/components/admin-review-card";
import { listPendingReviews } from "@/data/reviews/pending-store";
import { schoolRepository } from "@/features/schools/repository";

type AdminPageProps = {
  searchParams: Promise<{ secret?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { secret } = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!secret || !adminSecret || secret !== adminSecret) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-sm rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <p className="text-2xl">🔒</p>
          <h1 className="mt-3 text-lg font-bold text-[#0F2540]">Access denied</h1>
          <p className="mt-2 text-sm text-[#667085]">
            Provide a valid <code className="rounded bg-[#F2F4F7] px-1 py-0.5 text-xs">?secret=</code> query
            parameter to access this page.
          </p>
        </div>
      </main>
    );
  }

  const pending = await listPendingReviews();
  const allSchools = await schoolRepository.listSchools();

  function getSchoolName(slug: string): string {
    return allSchools.find((s) => s.slug === slug)?.name ?? slug;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1DBAA5]">
            Internal · Scholvisor Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#0F2540]">Moderation queue</h1>
        </div>
        <span className="rounded-full bg-[#FFB545]/15 px-3 py-1.5 text-sm font-semibold text-[#0F2540]">
          {pending.length} pending
        </span>
      </div>

      {/* Queue */}
      {pending.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#0F2540]/20 bg-white p-10 text-center">
          <p className="text-base font-semibold text-[#0F2540]">Queue is empty</p>
          <p className="mt-1 text-sm text-[#667085]">
            All submitted reviews have been moderated.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((review) => (
            <AdminReviewCard
              key={review.id}
              review={review}
              schoolName={getSchoolName(review.schoolSlug)}
              secret={secret}
            />
          ))}
        </div>
      )}

      {/* Footer note */}
      <p className="mt-8 text-center text-xs text-[#667085]">
        Approved reviews appear immediately on the school page. Rejected reviews are removed from the queue.
        Identity is never shown publicly.
      </p>
    </main>
  );
}
