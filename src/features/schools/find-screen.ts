import type { FindCriteria, School, SchoolMatch } from "@/features/schools/types";

export type BudgetOption = {
  key: string;
  title: string;
  subtitle: string;
};

export const defaultBudgetKey = "RM20k-RM40k";

export const budgetOptions: BudgetOption[] = [
  { key: "Under RM20k", title: "Under RM20k", subtitle: "Budget-friendly" },
  { key: "RM20k-RM40k", title: "RM20k – RM40k", subtitle: "Mid-range" },
  { key: "RM40k-RM80k", title: "RM40k – RM80k", subtitle: "Premium" },
  { key: "RM80k+", title: "RM80k+", subtitle: "Ultra-premium" },
];

export const LOCATION_OPTIONS = [
  "Any",
  "Kuala Lumpur",
  "Petaling Jaya",
  "Subang Jaya",
  "Shah Alam",
  "Kota Damansara",
  "Putrajaya",
  "Sungai Buloh",
  "Cyberjaya",
] as const;
export const CURRICULUM_OPTIONS = ["Any", "British", "Cambridge", "American", "IB", "Islamic"] as const;
export const SCHOOL_LEVEL_OPTIONS = ["Any", "Primary", "Secondary", "All-through"] as const;

export const islamicLevelLabels = ["Not important", "Welcome", "Observant", "Very strict"] as const;
export const disciplineLevelLabels = ["Relaxed", "Balanced", "Structured", "Very structured"] as const;
export const classSizeLabels = ["Small classes", "Medium-small", "Medium-large", "Large OK"] as const;
export const wellbeingLabels = ["Standard", "Moderate", "High priority", "Core mission"] as const;

export const defaultFindCriteria: FindCriteria = {
  budgetLabel: "RM20k – RM40k",
  curriculum: "Any",
  location: "Any",
  schoolLevel: "Any",
  searchQuery: "",
  islamicLevel: 1,
  disciplineLevel: 1,
  classSizePreference: 0,
  wellbeingFocus: 1,
};

export function buildCriteriaChips(criteria: FindCriteria): string[] {
  return [
    criteria.searchQuery ? `"${criteria.searchQuery}"` : null,
    criteria.budgetLabel,
    criteria.curriculum !== "Any" ? criteria.curriculum : null,
    criteria.location !== "Any" ? criteria.location : null,
    criteria.schoolLevel !== "Any" ? criteria.schoolLevel : null,
    `Islamic: ${islamicLevelLabels[criteria.islamicLevel]}`,
    `Discipline: ${disciplineLevelLabels[criteria.disciplineLevel]}`,
    `Class size: ${classSizeLabels[criteria.classSizePreference]}`,
    `Wellbeing: ${wellbeingLabels[criteria.wellbeingFocus]}`,
  ].filter((v): v is string => v !== null);
}

export function selectPopularSearchChips(schools: School[]): string[] {
  const hasBritish = schools.some((school) => school.curriculum.includes("British"));
  const hasIslamic = schools.some((school) => school.islamicEnvironment === "Available");
  const hasKL = schools.some((school) => school.location.includes("Kuala Lumpur"));

  return [
    hasBritish ? "British curriculum" : "Top curriculum",
    hasIslamic ? "Islamic school" : "Values-based school",
    hasKL ? "Near KL" : "Near city",
    "Best academics",
  ];
}

function calculateMatchScore(school: School, criteria: FindCriteria): number {
  let score = 72 + Math.round(school.rating * 4);
  if (criteria.location !== "Any" && school.location === criteria.location) score += 7;
  if (criteria.curriculum !== "Any" && school.curriculum.some((c) => c.includes(criteria.curriculum))) score += 6;
  if (criteria.islamicLevel >= 1 && school.islamicEnvironment === "Available") {
    score += criteria.islamicLevel * 2;
  }
  return Math.min(98, score);
}

function buildWhyMatches(school: School, criteria: FindCriteria): string[] {
  const bullets: string[] = [];
  if (criteria.islamicLevel >= 1 && school.islamicEnvironment === "Available") {
    bullets.push(
      criteria.islamicLevel >= 3
        ? "Fully Islamic environment matches your preference"
        : "Balanced Islamic environment with international openness"
    );
  }
  bullets.push("Strong academics with personalized learning");
  bullets.push(
    school.location.includes("Kuala Lumpur")
      ? "Popular among expat families near Kuala Lumpur"
      : "Popular among families seeking a connected school community"
  );
  bullets.push("Wide range of extracurricular activities");
  return bullets;
}

export function selectMatchingSchools(schools: School[], criteria: FindCriteria): SchoolMatch[] {
  let pool = schools;

  if (criteria.searchQuery) {
    const q = criteria.searchQuery.toLowerCase();
    pool = pool.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.curriculum.some((c) => c.toLowerCase().includes(q)) ||
        s.fitTags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (criteria.location !== "Any") {
    pool = pool.filter((s) => s.location === criteria.location);
  }
  if (criteria.curriculum !== "Any") {
    pool = pool.filter((s) => s.curriculum.some((c) => c.includes(criteria.curriculum)));
  }
  if (criteria.schoolLevel !== "Any") {
    pool = pool.filter((s) => s.schoolLevel === criteria.schoolLevel);
  }

  return pool
    .map((school) => ({
      school,
      matchScore: calculateMatchScore(school, criteria),
      whyMatches: buildWhyMatches(school, criteria),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
