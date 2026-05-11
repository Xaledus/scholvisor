"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BookMarked,
  Compass,
  Heart,
  Menu,
  PencilLine,
  Scale
} from "lucide-react";
import { selectedCriteriaChips } from "@/features/schools/find-screen";
import type { SchoolMatch } from "@/features/schools/types";

const MAX_COMPARE = 3;

type FindResultsClientProps = {
  initialResults: SchoolMatch[];
};

export function FindResultsClient({ initialResults }: FindResultsClientProps) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);

  const atCompareLimit = comparedSlugs.length >= MAX_COMPARE;

  const toggleSave = (slug: string) => {
    setSavedSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  };

  const toggleCompare = (slug: string) => {
    setComparedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= MAX_COMPARE) return current;
      return [...current, slug];
    });
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4 sm:px-6">
      <section className="rounded-3xl border border-[#0F2540]/10 bg-white p-4 shadow-sm">
        <header className="flex items-center justify-between">
          <Link href="/find" className="rounded-full bg-[#F2F4F7] p-2 text-[#0F2540]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <p className="text-lg font-bold text-[#0F2540]">Scholvisor</p>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full bg-[#F2F4F7] p-2 text-[#0F2540]">
              <Heart className="h-4 w-4" />
            </button>
            <div className="relative">
              <button type="button" className="rounded-full bg-[#F2F4F7] p-2 text-[#0F2540]">
                <Scale className="h-4 w-4" />
              </button>
              <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-[#1DBAA5] px-1 text-center text-[10px] font-bold text-white">
                {comparedSlugs.length}
              </span>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-2xl bg-[#E3F3EF] p-4">
          <h1 className="text-3xl font-bold leading-tight text-[#0F2540]">Your matching schools</h1>
          <p className="mt-2 text-sm text-[#667085]">
            Based on your priorities, here are the schools that may fit your family best.
          </p>
        </section>

        <section className="mt-4">
          <div className="flex flex-wrap gap-2">
            {selectedCriteriaChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-[#1DBAA5]/35 bg-[#E3F3EF] px-3 py-1 text-xs font-medium text-[#0F2540]"
              >
                {chip}
              </span>
            ))}
          </div>
          <Link href="/find" className="mt-3 inline-flex text-xs font-semibold text-[#1DBAA5]">
            Edit criteria
          </Link>
        </section>

        <section className="mt-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0F2540]">Strongest matches</h2>
          <button type="button" className="rounded-full border border-[#0F2540]/15 px-3 py-1 text-xs text-[#667085]">
            Best match
          </button>
        </section>

        {initialResults.length === 0 ? (
          <EmptyResults />
        ) : (
          <section className="mt-4 space-y-4">
            {initialResults.map((result) => {
              const { school } = result;
              const compared = comparedSlugs.includes(school.slug);
              const saved = savedSlugs.includes(school.slug);
              const disableCompare = !compared && atCompareLimit;

              return (
                <article key={school.slug} className="rounded-2xl border border-[#0F2540]/10 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#0F2540] px-3 py-1 text-xs font-semibold text-white">
                      {result.matchScore}% match
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSave(school.slug)}
                      className={`rounded-full p-2 ${saved ? "bg-[#E3F3EF] text-[#1DBAA5]" : "bg-[#F2F4F7] text-[#667085]"}`}
                    >
                      <Heart className={`h-4 w-4 ${saved ? "fill-[#1DBAA5]" : ""}`} />
                    </button>
                  </div>

                  <div className="mt-3 h-24 rounded-xl bg-gradient-to-r from-[#0F2540] via-[#1DBAA5] to-[#E3F3EF]" />

                  <h3 className="mt-3 text-lg font-semibold text-[#0F2540]">{school.name}</h3>
                  <p className="text-sm text-[#667085]">
                    {school.location} · Ages {school.ages}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {school.fitTags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-[#F2F4F7] px-3 py-1 text-xs font-medium text-[#0F2540]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-1 text-xs text-[#667085] sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-[#0F2540]">Annual tuition: </span>
                      {school.annualTuitionRange}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0F2540]">Curriculum: </span>
                      {school.curriculum.join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0F2540]">Islamic environment: </span>
                      {school.islamicEnvironment}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0F2540]">Reviews: </span>
                      {school.reviewCount} parent perspectives
                    </p>
                  </div>

                  <section className="mt-4 rounded-xl border border-[#1DBAA5]/20 bg-[#E3F3EF] p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
                      Why this matches your family
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-[#667085]">
                      {result.whyMatches.map((reason) => (
                        <li key={reason}>- {reason}</li>
                      ))}
                    </ul>
                  </section>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/schools/${school.slug}`}
                      className="rounded-lg bg-[#0F2540] px-3 py-2 text-xs font-semibold text-white"
                    >
                      View details
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSave(school.slug)}
                      className="rounded-lg border border-[#0F2540]/15 px-3 py-2 text-xs font-semibold text-[#0F2540]"
                    >
                      {saved ? "Saved" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(school.slug)}
                      disabled={disableCompare}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                        compared
                          ? "bg-[#E3F3EF] text-[#0F2540] ring-1 ring-[#1DBAA5]"
                          : disableCompare
                            ? "cursor-not-allowed bg-[#F2F4F7] text-[#667085]"
                            : "border border-[#0F2540]/15 text-[#0F2540]"
                      }`}
                    >
                      {compared ? "Comparing" : "Compare"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {atCompareLimit && (
          <p className="mt-3 text-xs font-medium text-[#667085]">You can compare up to 3 schools.</p>
        )}
      </section>

      {comparedSlugs.length > 0 && (
        <section className="fixed inset-x-0 bottom-16 z-30 border-t border-[#0F2540]/15 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
            <p className="text-sm font-medium text-[#0F2540]">
              {comparedSlugs.length} school{comparedSlugs.length > 1 ? "s" : ""} selected
            </p>
            <Link href="/compare" className="rounded-xl bg-[#1DBAA5] px-4 py-2 text-sm font-semibold text-white">
              Compare now
            </Link>
          </div>
        </section>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0F2540]/10 bg-white">
        <div className="mx-auto grid w-full max-w-2xl grid-cols-5 px-2 py-2">
          <BottomItem icon={Compass} label="Explore" active />
          <BottomItem icon={Scale} label="Compare" />
          <BottomItem icon={BookMarked} label="Saved" />
          <BottomItem icon={PencilLine} label="Contribute" />
          <BottomItem icon={Menu} label="Menu" />
        </div>
      </nav>
    </main>
  );
}

function EmptyResults() {
  return (
    <section className="mt-4 rounded-2xl border border-dashed border-[#0F2540]/20 bg-[#F2F4F7] p-5 text-center">
      <h3 className="text-base font-semibold text-[#0F2540]">No exact match found</h3>
      <p className="mt-1 text-sm text-[#667085]">Try widening your budget or location filters.</p>
      <Link
        href="/find"
        className="mt-4 inline-flex rounded-xl border border-[#0F2540]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0F2540]"
      >
        Edit criteria
      </Link>
    </section>
  );
}

type BottomItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
};

function BottomItem({ icon: Icon, label, active = false }: BottomItemProps) {
  return (
    <button type="button" className="flex min-h-12 flex-col items-center justify-center gap-1 py-1">
      <Icon className={`h-4 w-4 ${active ? "text-[#1DBAA5]" : "text-[#667085]"}`} />
      <span className={`text-[11px] ${active ? "font-semibold text-[#0F2540]" : "text-[#667085]"}`}>{label}</span>
    </button>
  );
}
