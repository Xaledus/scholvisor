import Link from "next/link";

export default function ComparePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-[#0F2540]/10 bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#0F2540]">Compare schools</h1>
        <p className="mt-3 text-sm text-[#667085]">
          The compare experience will be added in the next step using selected schools from your results flow.
        </p>
        <Link
          href="/find/results"
          className="mt-6 inline-flex rounded-xl border border-[#0F2540]/15 px-4 py-2 text-sm font-medium text-[#0F2540]"
        >
          Back to matches
        </Link>
      </section>
    </main>
  );
}
