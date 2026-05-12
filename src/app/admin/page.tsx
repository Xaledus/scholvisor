import { AdminReviewCard } from "@/components/admin-review-card";
import { listPendingReviews } from "@/data/reviews/pending-store";
import { schoolRepository } from "@/features/schools/repository";
import { logoutAction } from "./actions";

export default async function AdminPage() {
  const pending = await listPendingReviews();
  const allSchools = await schoolRepository.listSchools();

  function getSchoolName(slug: string): string {
    return allSchools.find((s) => s.slug === slug)?.name ?? slug;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1DBAA5]">
            Internal · Scholvisor Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#0F2540]">Moderation queue</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#FFB545]/15 px-3 py-1.5 text-sm font-semibold text-[#0F2540]">
            {pending.length} pending
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-xl border border-[#0F2540]/15 px-3 py-1.5 text-sm font-medium text-[#667085] hover:border-[#0F2540]/30"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

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
            />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-[#667085]">
        Approved reviews appear immediately on the school page. Rejected reviews are removed from the queue.
        Identity is never shown publicly.
      </p>
    </main>
  );
}
