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
  const searchChips = criteria.searchQuery
    ? criteria.searchQuery.split("|").map((t) => t.trim()).filter(Boolean).map((t) => `"${t}"`)
    : [];
  return [
    ...searchChips,
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

function isIslamicSchool(s: School): boolean {
  return (
    s.curriculum.some((c) => c.toLowerCase().includes("islamic")) ||
    s.islamicEnvironment.toLowerCase().includes("islamic") ||
    s.name.toLowerCase().includes("islamic") ||
    s.name.toLowerCase().includes("muslim")
  );
}

export function selectPopularSearchChips(schools: School[]): string[] {
  const hasBritish = schools.some((school) => school.curriculum.includes("British"));
  const hasIslamic = schools.some(isIslamicSchool);
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
  if (criteria.islamicLevel >= 1 && isIslamicSchool(school)) {
    score += criteria.islamicLevel * 2;
  }
  return Math.min(98, score);
}

function buildWhyMatches(school: School, criteria: FindCriteria): string[] {
  const bullets: string[] = [];
  if (criteria.curriculum !== "Any" && school.curriculum.some((c) => c.includes(criteria.curriculum))) {
    bullets.push(`Offers ${criteria.curriculum} curriculum`);
  }
  if (criteria.location !== "Any" && school.location === criteria.location) {
    bullets.push(`Located in ${school.location}`);
  }
  if (criteria.islamicLevel >= 2 && isIslamicSchool(school)) {
    bullets.push("Islamic environment matches your preference");
  } else if (criteria.islamicLevel === 1 && isIslamicSchool(school)) {
    bullets.push("Islamic environment available");
  }
  for (const tag of school.fitTags.slice(0, 2)) {
    bullets.push(tag);
  }
  return bullets.length > 0 ? bullets : ["Matches your search criteria"];
}

type BudgetFilter = (priceMin: number | null, priceMax: number | null) => boolean;

const BUDGET_FILTERS: Record<string, BudgetFilter> = {
  "Under RM20k": (min) => min != null && min < 20000,
  "RM20k-RM40k": (min, max) => min != null && max != null && min >= 20000 && max <= 40000,
  "RM40k-RM80k": (min, max) => min != null && max != null && min >= 40000 && max <= 80000,
  "RM80k+": (min) => min != null && min >= 80000,
};

function matchesTerm(s: School, q: string): boolean {
  if (q === "british curriculum") return s.curriculum.includes("British");
  if (q === "islamic school" || q === "islamic")
    return isIslamicSchool(s);
  if (q === "near kl") return s.location.toLowerCase().includes("kuala lumpur");
  if (q === "best academics") return true;
  return (
    s.name.toLowerCase().includes(q) ||
    s.location.toLowerCase().includes(q) ||
    s.curriculum.some((c) => c.toLowerCase().includes(q)) ||
    s.fitTags.some((t) => t.toLowerCase().includes(q)) ||
    s.summary.toLowerCase().includes(q)
  );
}

export function selectMatchingSchools(schools: School[], criteria: FindCriteria): SchoolMatch[] {
  console.log("[find] criteria:", criteria);
  console.log("[find] total schools in pool:", schools.length);

  let pool = schools;

  if (criteria.searchQuery) {
    const terms = criteria.searchQuery.split("|").map((t) => t.trim().toLowerCase()).filter(Boolean);
    if (terms.length > 0) {
      pool = pool.filter((s) => terms.some((q) => matchesTerm(s, q)));
      console.log("[find] after search filter:", pool.length, "terms:", terms);
    }
  }

  const budgetFilter = BUDGET_FILTERS[criteria.budgetLabel];
  if (budgetFilter) {
    pool = pool.filter((s) => budgetFilter(s.priceMin, s.priceMax));
    console.log("[find] after budget filter:", pool.length, "budget:", criteria.budgetLabel);
  } else {
    console.log("[find] no budget filter for:", criteria.budgetLabel);
  }

  if (criteria.location !== "Any") {
    pool = pool.filter((s) => s.location === criteria.location);
    console.log("[find] after location filter:", pool.length);
  }
  if (criteria.curriculum !== "Any") {
    pool = pool.filter((s) =>
      criteria.curriculum === "Islamic"
        ? isIslamicSchool(s)
        : s.curriculum.some((c) => c.includes(criteria.curriculum))
    );
    console.log("[find] after curriculum filter:", pool.length);
  }
  if (criteria.schoolLevel !== "Any") {
    pool = pool.filter((s) => s.schoolLevel === criteria.schoolLevel);
    console.log("[find] after schoolLevel filter:", pool.length);
  }

  console.log("[find] final results:", pool.length);
  return pool
    .map((school) => ({
      school,
      matchScore: calculateMatchScore(school, criteria),
      whyMatches: buildWhyMatches(school, criteria),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
