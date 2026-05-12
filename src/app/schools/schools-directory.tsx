"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { SchoolCard } from "@/components/school-card";
import { CTAButton } from "@/components/ui/cta-button";
import type { School } from "@/features/schools/types";

type SchoolsDirectoryProps = {
  initialSchools: School[];
};

const CURRICULUM_CHIPS = [
  "American", "Australian", "British", "Cambridge", "Chinese",
  "French", "IB", "Islamic", "A-Levels", "IGCSE",
];
const LOCATION_CHIPS = [
  "Kuala Lumpur", "Petaling Jaya", "Subang Jaya", "Shah Alam",
  "Cyberjaya", "Putrajaya", "Kota Damansara", "Sungai Buloh",
];
const LEVEL_CHIPS = ["All-through", "Primary to Secondary", "Early years to Secondary"];

const FILTER_GROUPS = [
  { label: "Curriculum", cat: "curriculum", chips: CURRICULUM_CHIPS },
  { label: "Location",   cat: "location",   chips: LOCATION_CHIPS },
  { label: "School level", cat: "level",    chips: LEVEL_CHIPS },
] as const;

function matchCurriculumChip(chip: string, school: School): boolean {
  if (chip === "A-Levels" || chip === "IGCSE") {
    return school.curriculum.some((c) => ["British", "Cambridge"].includes(c));
  }
  return school.curriculum.some((c) => c === chip);
}

function applyFilters(schools: School[], query: string, active: Set<string>): School[] {
  let result = schools;

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.curriculum.some((c) => c.toLowerCase().includes(q))
    );
  }

  if (active.size > 0) {
    const byCat: Record<string, string[]> = {};
    for (const key of active) {
      const sep = key.indexOf(":");
      const cat = key.slice(0, sep);
      const val = key.slice(sep + 1);
      byCat[cat] = [...(byCat[cat] ?? []), val];
    }
    result = result.filter((s) =>
      Object.entries(byCat).every(([cat, vals]) => {
        if (cat === "curriculum") return vals.some((v) => matchCurriculumChip(v, s));
        if (cat === "location") return vals.includes(s.location);
        if (cat === "level") return vals.includes(s.schoolLevel);
        return true;
      })
    );
  }

  return result;
}

export function SchoolsDirectory({ initialSchools }: SchoolsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredSchools = useMemo(
    () => applyFilters(initialSchools, query, activeFilters),
    [initialSchools, query, activeFilters]
  );

  const toggleFilter = (cat: string, label: string) => {
    const key = `${cat}:${label}`;
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const toggleCompare = (slug: string) => {
    setSelectedForCompare((cur) =>
      cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]
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
          <Search className="h-4 w-4 shrink-0 text-[#667085]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, curriculum or location"
            className="w-full bg-transparent text-sm text-[#0F2540] outline-none placeholder:text-[#667085]"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="shrink-0 text-[#667085]">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </section>

      {/* Grouped filter chips */}
      <section className="mt-5 space-y-4">
        {FILTER_GROUPS.map(({ label, cat, chips }) => (
          <div key={cat}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#667085]">{label}</p>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => {
                const active = activeFilters.has(`${cat}:${chip}`);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleFilter(cat, chip)}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-[#1DBAA5] bg-[#E3F3EF] text-[#0F2540]"
                        : "border-[#0F2540]/15 bg-white text-[#667085]"
                    }`}
                  >
                    {active && <X className="h-2.5 w-2.5" />}
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {activeFilters.size > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-[#1DBAA5]"
          >
            Clear all filters
          </button>
        )}
      </section>

      <p className="mt-4 text-xs text-[#667085]">
        {filteredSchools.length === initialSchools.length
          ? `${initialSchools.length} school${initialSchools.length !== 1 ? "s" : ""}`
          : `${filteredSchools.length} of ${initialSchools.length} schools`}
      </p>

      {filteredSchools.length === 0 ? (
        <section className="mt-4 rounded-2xl border border-dashed border-[#0F2540]/20 bg-white p-8 text-center text-sm text-[#667085]">
          No schools match these filters.{" "}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="font-semibold text-[#1DBAA5] underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          )}
        </section>
      ) : (
        <>
          {/* Mobile: horizontal swipe */}
          <section className="md:hidden">
            <div
              className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {filteredSchools.map((school) => (
                <div
                  key={school.slug}
                  className="w-[85%] flex-none"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <SchoolCard
                    school={school}
                    compared={selectedForCompare.includes(school.slug)}
                    onToggleCompare={toggleCompare}
                  />
                </div>
              ))}
              <div className="w-4 flex-none" aria-hidden />
            </div>
            {filteredSchools.length > 1 && (
              <p className="mt-1 text-center text-xs text-[#667085]">
                swipe to browse all {filteredSchools.length} schools →
              </p>
            )}
          </section>

          {/* Desktop: 2-column grid */}
          <section className="mt-4 hidden items-stretch md:grid md:grid-cols-2 md:gap-4">
            {filteredSchools.map((school) => (
              <SchoolCard
                key={school.slug}
                school={school}
                compared={selectedForCompare.includes(school.slug)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </section>
        </>
      )}

      {selectedForCompare.length > 0 && (
        <section className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0F2540]/15 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#0F2540]">
              {selectedForCompare.length} school{selectedForCompare.length > 1 ? "s" : ""} selected
            </p>
            <CTAButton href="/compare" className="px-4 py-2 text-xs">
              Compare now
            </CTAButton>
          </div>
        </section>
      )}

      <section className="h-16 md:h-0" />
    </main>
  );
}
