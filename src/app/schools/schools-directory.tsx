"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SchoolCard } from "@/components/school-card";
import { CTAButton } from "@/components/ui/cta-button";
import { coreSchoolFilters, defaultSelectedFilterChips } from "@/features/schools/schemas";
import type { School } from "@/features/schools/types";

type SchoolsDirectoryProps = {
  initialSchools: School[];
};

export function SchoolsDirectory({ initialSchools }: SchoolsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const selectedFilterChips = defaultSelectedFilterChips;

  const filteredSchools = useMemo(() => {
    if (!query) return initialSchools;
    const q = query.toLowerCase();
    return initialSchools.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.curriculum.some((c) => c.toLowerCase().includes(q))
    );
  }, [initialSchools, query]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  const toggleCompare = (slug: string) => {
    setSelectedForCompare((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <section>
        <h1 className="text-2xl font-bold text-[#0F2540]">Explore schools</h1>
        <p className="mt-2 text-sm text-[#667085]">
          Find schools that fit your family&apos;s priorities.
        </p>
      </section>

      <section className="mt-5">
        <label className="flex items-center gap-3 rounded-2xl border border-[#0F2540]/15 bg-white px-4 py-3">
          <Search className="h-4 w-4 text-[#667085]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by school name, curriculum or location"
            className="w-full bg-transparent text-sm text-[#0F2540] outline-none placeholder:text-[#667085]"
          />
        </label>
      </section>

      <section className="mt-4 flex flex-wrap gap-2">
        {coreSchoolFilters.map((filter) => {
          const selected = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              type="button"
              onClick={() => toggleFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                selected
                  ? "border-[#1DBAA5] bg-[#E3F3EF] text-[#0F2540]"
                  : "border-[#0F2540]/15 bg-white text-[#667085]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </section>

      <section className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">Selected filters</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedFilterChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-full border border-[#1DBAA5]/40 bg-[#E3F3EF] px-3 py-1 text-xs font-medium text-[#0F2540]"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredSchools.map((school) => (
          <SchoolCard
            key={school.slug}
            school={school}
            compared={selectedForCompare.includes(school.slug)}
            onToggleCompare={toggleCompare}
          />
        ))}
      </section>

      {selectedForCompare.length > 0 && (
        <section className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0F2540]/15 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#0F2540]">
              {selectedForCompare.length} school{selectedForCompare.length > 1 ? "s" : ""} selected
            </p>
            <CTAButton href="/schools" className="px-4 py-2 text-xs">
              Compare now
            </CTAButton>
          </div>
        </section>
      )}

      {filteredSchools.length === 0 && (
        <section className="mt-6 rounded-2xl border border-dashed border-[#0F2540]/20 bg-white p-6 text-sm text-[#667085]">
          No schools found for this search. Try broadening your terms.
        </section>
      )}
      <section className="h-16 md:h-0" />
    </main>
  );
}
