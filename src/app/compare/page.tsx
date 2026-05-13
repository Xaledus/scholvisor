import Link from "next/link";

export default function ComparePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-[#0F2540]">Compare schools side by side</h1>

      <section className="mt-6 rounded-2xl border border-[#1DBAA5]/25 bg-[#E3F3EF] p-6">
        <p className="text-sm font-semibold text-[#0F2540]">
          This feature gets better with more reviews.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#667085]">
          You&apos;re among the first families using Scholvisor. Help other parents by sharing your
          experience — the more reviews we collect, the more powerful this tool becomes.
        </p>
        <Link
          href="/review/new"
          className="mt-5 inline-flex rounded-xl bg-[#1DBAA5] px-5 py-3 text-sm font-semibold text-white"
        >
          Share your experience
        </Link>
      </section>

      <section className="mt-4 rounded-2xl border border-[#0F2540]/10 bg-white p-5 text-center shadow-sm">
        <p className="text-sm text-[#667085]">
          Side-by-side school comparison is coming soon. In the meantime, explore individual school
          profiles to compare key facts.
        </p>
        <Link
          href="/schools"
          className="mt-4 inline-flex rounded-xl border border-[#0F2540]/15 px-4 py-2 text-sm font-medium text-[#0F2540]"
        >
          Browse all schools
        </Link>
      </section>
    </main>
  );
}
