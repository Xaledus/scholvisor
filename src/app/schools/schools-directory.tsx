"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { SchoolCard } from "@/components/school-card";
import { CTAButton } from "@/components/ui/cta-button";
import type { School } from "@/features/schools/types";

type SchoolsDirectoryProps = {
  initialSchools: School[];
};

// Derive filterable chips from actual school data.
// Stored as "category:value" keys so AND-across-categories, OR-within works cleanly.
function buildFilterOptions(schools: School[]) {
  const curricula = [...new Set(schools.flatMap((s) => s.curriculum))].sort();
  const locations = [...new Set(schools.map((s) => s.location).filter(Boolean))].sort();
  const levels = [...new Set(schools.map((s) => s.schoolLevel))].sort();
  const hasIslamic = schools.some((s) => s.islamicEnvironment === "Available");

  return [
    ...curricula.map((v) => ({ cat: "curriculum", label: v })),
    ...locations.map((v) => ({ cat: "location", label: v })),
    ...levels.map((v) => ({ cat: "level", label: v })),
    ...(hasIslamic ? [{ cat: "islamic", label: "Islamic environment" }] : []),
  ];
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
    // Group active keys by category
    const byCat: Record<string, string[]> = {};
    for (const key of active) {
      const sep = key.indexOf(":");
      const cat = key.slice(0, sep);
      const val = key.slice(sep + 1);
      byCat[cat] = [...(byCat[cat] ?? []), val];
    }
    result = result.filter((s) =>
      Object.entries(byCat).every(([cat, vals]) => {
        if (cat === "curriculum") return s.curriculum.some((c) => vals.includes(c));
        if (cat === "location") return vals.includes(s.location);
        if (cat === "level") return vals.includes(s.schoolLevel);
        if (cat === "islamic") return s.islamicEnvironment === "Available";
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

  const filterOptions = useMemo(() => buildFilterOptions(initialSchools), [initialSchools]);
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

      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0F2540]">Explore schools</h1>
        <p className="mt-2 text-sm text-[#667085]">
          Find schools that fit your family&apos;s priorities.
        </p>
      </section>

      {/* Search */}
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

      {/* Filter chips — derived from real school data */}
      {filterOptions.length > 0 && (
        <section className="mt-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(({ cat, label }) => {
              const active = activeFilters.has(`${cat}:${label}`);
              return (
                <button
                  key={`${cat}:${label}`}
                  type="button"
                  onClick={() => toggleFilter(cat, label)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-[#1DBAA5] bg-[#E3F3EF] text-[#0F2540]"
                      : "border-[#0F2540]/15 bg-white text-[#667085]"
                  }`}
                >
                  {active && <X className="h-2.5 w-2.5" />}
                  {label}
                </button>
              );
            })}
          </div>
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 text-xs font-semibold text-[#1DBAA5]"
            >
              Clear all filters
            </button>
          )}
        </section>
      )}

      {/* Result count */}
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
          {/* ── Mobile: horizontal swipe cards ─────────────────────────── */}
          <section className="md:hidden">
            <div
              className="mt-4 flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
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
              {/* trailing spacer so last card snaps flush left */}
              <div className="w-4 flex-none" aria-hidden />
            </div>
            {filteredSchools.length > 1 && (
              <p className="mt-1 text-center text-xs text-[#667085]">
                swipe to browse all {filteredSchools.length} schools →
              </p>
            )}
          </section>

          {/* ── Desktop: 2-column grid ──────────────────────────────────── */}
          <section className="mt-4 hidden md:grid md:grid-cols-2 md:gap-4">
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

      {/* Compare bar — mobile */}
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
