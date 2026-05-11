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
  CURRICULUM_OPTIONS,
  defaultBudgetKey,
  defaultFindCriteria,
  disciplineLevelLabels,
  islamicLevelLabels,
  LOCATION_OPTIONS,
  SCHOOL_LEVEL_OPTIONS,
  wellbeingLabels,
} from "@/features/schools/find-screen";

type FindScreenClientProps = {
  popularSearches: string[];
};

export function FindScreenClient({ popularSearches }: FindScreenClientProps) {
  const router = useRouter();
  const [selectedBudget, setSelectedBudget] = useState(defaultBudgetKey);
  const [location, setLocation] = useState(defaultFindCriteria.location);
  const [curriculum, setCurriculum] = useState(defaultFindCriteria.curriculum);
  const [schoolLevel, setSchoolLevel] = useState(defaultFindCriteria.schoolLevel);
  const [islamicLevel, setIslamicLevel] = useState(defaultFindCriteria.islamicLevel);
  const [disciplineLevel, setDisciplineLevel] = useState(defaultFindCriteria.disciplineLevel);
  const [classSizePreference, setClassSizePreference] = useState(defaultFindCriteria.classSizePreference);
  const [wellbeingFocus, setWellbeingFocus] = useState(defaultFindCriteria.wellbeingFocus);

  const handleShowResults = () => {
    const params = new URLSearchParams({
      budget: selectedBudget,
      curriculum,
      location,
      schoolLevel,
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

        {/* Hero */}
        <section className="mt-5 rounded-2xl bg-[#E3F3EF] p-4">
          <h1 className="text-3xl font-bold leading-tight text-[#0F2540]">Find your dream school</h1>
          <p className="mt-2 text-sm text-[#667085]">
            Discover schools in Malaysia that truly fit your family&apos;s priorities.
          </p>
          <div className="mt-4 flex items-center justify-center rounded-xl bg-white/70 py-4">
            <HeroIllustration />
          </div>
        </section>

        {/* Search */}
        <section className="mt-4">
          <label className="flex items-center gap-2 rounded-2xl border border-[#0F2540]/15 bg-[#F2F4F7] px-4 py-3">
            <Search className="h-4 w-4 text-[#667085]" />
            <input
              placeholder="Search by school name or keyword"
              className="w-full bg-transparent text-sm text-[#0F2540] outline-none placeholder:text-[#667085]"
            />
          </label>
        </section>

        {/* Popular searches */}
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

        {/* Location / Curriculum / Level dropdowns */}
        <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FilterSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={LOCATION_OPTIONS}
          />
          <FilterSelect
            label="Curriculum"
            value={curriculum}
            onChange={setCurriculum}
            options={CURRICULUM_OPTIONS}
          />
          <FilterSelect
            label="School level"
            value={schoolLevel}
            onChange={setSchoolLevel}
            options={SCHOOL_LEVEL_OPTIONS}
          />
        </section>

        {/* Budget */}
        <section className="mt-5">
          <h3 className="text-sm font-semibold text-[#0F2540]">Budget (annual tuition)</h3>
          <p className="mt-1 text-xs text-[#667085]">Select your comfortable range</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {budgetOptions.map((option) => {
              const selected = selectedBudget === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedBudget(option.key)}
                  className={`rounded-xl border p-3 text-center transition-colors ${
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

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 280 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-xs"
    >
      {/* School building */}
      <rect x="128" y="38" width="118" height="62" rx="3" fill="#0F2540" />
      {/* Roof */}
      <polygon points="118,38 187,6 256,38" fill="#1DBAA5" />
      {/* Flagpole */}
      <rect x="186" y="6" width="2" height="16" fill="#FFB545" />
      <rect x="186" y="6" width="12" height="8" rx="1" fill="#FFB545" />
      {/* Windows */}
      <rect x="143" y="51" width="20" height="14" rx="2" fill="#FFB545" />
      <rect x="196" y="51" width="20" height="14" rx="2" fill="#FFB545" />
      {/* Door */}
      <rect x="175" y="71" width="18" height="29" rx="2" fill="#1DBAA5" />
      {/* Door handle */}
      <circle cx="190" cy="87" r="1.5" fill="#0F2540" />
      {/* Ground */}
      <rect x="10" y="100" width="260" height="1.5" rx="1" fill="#0F2540" fillOpacity="0.12" />

      {/* Family — left side, facing the school */}
      {/* Adult 1 — navy */}
      <circle cx="28" cy="56" r="9" fill="#0F2540" />
      <rect x="20" y="65" width="16" height="26" rx="8" fill="#0F2540" />
      {/* Adult 2 — teal */}
      <circle cx="56" cy="58" r="9" fill="#1DBAA5" />
      <rect x="48" y="67" width="16" height="24" rx="8" fill="#1DBAA5" />
      {/* Child — amber, slightly in front */}
      <circle cx="40" cy="72" r="7" fill="#FFB545" />
      <rect x="33" y="79" width="14" height="20" rx="7" fill="#FFB545" />

      {/* Dotted path from family toward school */}
      <circle cx="76" cy="85" r="1.5" fill="#1DBAA5" fillOpacity="0.35" />
      <circle cx="88" cy="83" r="1.5" fill="#1DBAA5" fillOpacity="0.45" />
      <circle cx="100" cy="81" r="1.5" fill="#1DBAA5" fillOpacity="0.55" />
      <circle cx="112" cy="79" r="1.5" fill="#1DBAA5" fillOpacity="0.65" />
    </svg>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
};

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-[#667085]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#0F2540]/10 bg-white py-2.5 pl-3 pr-8 text-sm text-[#0F2540] outline-none focus:border-[#1DBAA5]"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "Any" ? `Any ${label.toLowerCase()}` : opt}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <svg
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
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
