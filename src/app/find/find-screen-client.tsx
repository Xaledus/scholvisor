"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookMarked,
  Compass,
  GraduationCap,
  Heart,
  Menu,
  PencilLine,
  Scale,
  Search,
} from "lucide-react";
import {
  budgetOptions,
  classSizeLabels,
  defaultBudgetKey,
  defaultFindCriteria,
  disciplineLevelLabels,
  islamicLevelLabels,
  wellbeingLabels,
} from "@/features/schools/find-screen";

type FindScreenClientProps = {
  popularSearches: string[];
};

export function FindScreenClient({ popularSearches }: FindScreenClientProps) {
  const router = useRouter();
  const [selectedBudget, setSelectedBudget] = useState(defaultBudgetKey);
  const [islamicLevel, setIslamicLevel] = useState(defaultFindCriteria.islamicLevel);
  const [disciplineLevel, setDisciplineLevel] = useState(defaultFindCriteria.disciplineLevel);
  const [classSizePreference, setClassSizePreference] = useState(defaultFindCriteria.classSizePreference);
  const [wellbeingFocus, setWellbeingFocus] = useState(defaultFindCriteria.wellbeingFocus);

  const handleShowResults = () => {
    const params = new URLSearchParams({
      budget: selectedBudget,
      curriculum: "Any",
      location: "Any",
      islamic: String(islamicLevel),
      discipline: String(disciplineLevel),
      classSize: String(classSizePreference),
      wellbeing: String(wellbeingFocus),
    });
    router.push(`/find/results?${params.toString()}`);
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-4 sm:px-6">
      <section className="rounded-3xl border border-[#0F2540]/10 bg-white p-4 shadow-sm">
        <header className="flex items-center justify-between">
          <p className="text-lg font-bold text-[#0F2540]">Scholvisor</p>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full bg-[#F2F4F7] p-2 text-[#0F2540]">
              <Heart className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-full bg-[#F2F4F7] p-2 text-[#0F2540]">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="mt-5 rounded-2xl bg-[#E3F3EF] p-4">
          <h1 className="text-3xl font-bold leading-tight text-[#0F2540]">Find your dream school</h1>
          <p className="mt-2 text-sm text-[#667085]">
            Discover schools in Malaysia that truly fit your family&apos;s priorities.
          </p>

          <div className="mt-4 flex h-24 items-end justify-center rounded-xl bg-white/70 p-3">
            <div className="flex items-end gap-2">
              <div className="h-10 w-10 rounded-md bg-[#1DBAA5]/70" />
              <div className="h-14 w-14 rounded-md bg-[#0F2540]/80" />
              <div className="h-8 w-8 rounded-md bg-[#FFB545]/80" />
              <span className="ml-2 text-lg" aria-hidden>
                🏫🌇
              </span>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <label className="flex items-center gap-2 rounded-2xl border border-[#0F2540]/15 bg-[#F2F4F7] px-4 py-3">
            <Search className="h-4 w-4 text-[#667085]" />
            <input
              placeholder="Search by school name or keyword"
              className="w-full bg-transparent text-sm text-[#0F2540] outline-none placeholder:text-[#667085]"
            />
          </label>
        </section>

        <section className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">Popular searches</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                type="button"
                className="rounded-full border border-[#0F2540]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#0F2540]"
              >
                {search}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-base font-semibold text-[#0F2540]">Filter by what matters to your family</h2>
        </section>

        {/* Budget */}
        <section className="mt-4">
          <h3 className="text-sm font-semibold text-[#0F2540]">Budget (annual tuition)</h3>
          <p className="mt-1 text-xs text-[#667085]">Select your comfortable range</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {budgetOptions.map((option) => {
              const selected = selectedBudget === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedBudget(option.key)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    selected ? "border-[#1DBAA5] bg-[#E3F3EF]" : "border-[#0F2540]/10 bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#0F2540]">{option.title}</p>
                  <p className="mt-1 text-xs text-[#667085]">{option.subtitle}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Priority sliders */}
        <section className="mt-5 space-y-5 rounded-2xl border border-[#0F2540]/10 bg-[#F2F4F7] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">What matters to you</p>

          <CriteriaSlider
            label="Islamic environment"
            value={islamicLevel}
            onChange={setIslamicLevel}
            labels={islamicLevelLabels}
            minLabel="Not important"
            maxLabel="Very strict"
          />
          <CriteriaSlider
            label="Discipline style"
            value={disciplineLevel}
            onChange={setDisciplineLevel}
            labels={disciplineLevelLabels}
            minLabel="Relaxed"
            maxLabel="Very structured"
          />
          <CriteriaSlider
            label="Class size"
            value={classSizePreference}
            onChange={setClassSizePreference}
            labels={classSizeLabels}
            minLabel="Small"
            maxLabel="Large"
          />
          <CriteriaSlider
            label="Wellbeing focus"
            value={wellbeingFocus}
            onChange={setWellbeingFocus}
            labels={wellbeingLabels}
            minLabel="Standard"
            maxLabel="Core mission"
          />
        </section>

        <section className="mt-5">
          <button
            type="button"
            onClick={handleShowResults}
            className="block w-full rounded-xl bg-[#1DBAA5] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
          >
            Show matching schools
          </button>
          <p className="mt-3 text-center text-xs text-[#667085]">Your preferences are private and secure</p>
        </section>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0F2540]/10 bg-white">
        <div className="mx-auto grid w-full max-w-2xl grid-cols-5 px-2 py-2">
          <BottomItem icon={Compass} label="Explore" active />
          <BottomItem icon={Scale} label="Compare" />
          <BottomItem icon={BookMarked} label="Saved" />
          <BottomItem icon={PencilLine} label="Contribute" />
          <BottomItem icon={GraduationCap} label="Menu" />
        </div>
      </nav>
    </main>
  );
}

type CriteriaSliderProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  labels: readonly string[];
  minLabel: string;
  maxLabel: string;
};

function CriteriaSlider({ label, value, onChange, labels, minLabel, maxLabel }: CriteriaSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#0F2540]">{label}</span>
        <span className="rounded-full bg-[#1DBAA5]/15 px-2.5 py-0.5 text-xs font-semibold text-[#1DBAA5]">
          {labels[value]}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={labels.length - 1}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E3F3EF]"
        style={{ accentColor: "#1DBAA5" }}
      />
      <div className="flex justify-between text-[10px] text-[#667085]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
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
