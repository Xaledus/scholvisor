import type { FindCriteria, School, SchoolMatch } from "@/features/schools/types";

export type BudgetOption = {
  key: string;
  title: string;
  subtitle: string;
};

export type CoreFilterCard = {
  name: string;
  value: string;
};

export const defaultBudgetKey = "RM20k-RM40k";

export const budgetOptions: BudgetOption[] = [
  { key: "Under RM20k", title: "Under RM20k", subtitle: "Budget-friendly" },
  { key: "RM20k-RM40k", title: "RM20k - RM40k", subtitle: "Mid-range" },
  { key: "RM40k-RM80k", title: "RM40k - RM80k", subtitle: "Premium" },
  { key: "RM80k+", title: "RM80k+", subtitle: "Ultra-premium" }
];

export const coreFilterCards: CoreFilterCard[] = [
  { name: "Location", value: "Any location" },
  { name: "Curriculum", value: "Any curriculum" },
  { name: "School level", value: "Any level" },
  { name: "Islamic environment", value: "Any" }
];

export const moreFilterRows: string[] = [
  "Expat community",
  "Class size",
  "Extracurricular",
  "Languages",
  "Special needs support",
  "Transportation",
  "Boarding",
  "Other facilities"
];

export const defaultFindCriteria: FindCriteria = {
  budgetLabel: "RM20k - RM40k",
  curriculum: "British curriculum",
  location: "Kuala Lumpur",
  islamicPreference: "Islamic: Moderate"
};

export const selectedCriteriaChips: string[] = [
  "RM20k - RM40k",
  "British curriculum",
  "Kuala Lumpur",
  "Islamic: Moderate",
  "+6 more"
];

export function selectPopularSearchChips(schools: School[]): string[] {
  const hasBritish = schools.some((school) => school.curriculum.includes("British"));
  const hasIslamic = schools.some((school) => school.islamicEnvironment === "Available");
  const hasKL = schools.some((school) => school.location.includes("Kuala Lumpur"));

  return [
    hasBritish ? "British curriculum" : "Top curriculum",
    hasIslamic ? "Islamic school" : "Values-based school",
    hasKL ? "Near KL" : "Near city",
    "Best academics"
  ];
}

function calculateMatchScore(school: School, criteria: FindCriteria): number {
  let score = 72 + Math.round(school.rating * 4);
  if (school.location === criteria.location) score += 7;
  if (school.curriculum.some((item) => criteria.curriculum.includes(item))) score += 6;
  if (school.islamicEnvironment === "Available" && criteria.islamicPreference.includes("Islamic")) score += 4;
  return Math.min(98, score);
}

function buildWhyMatches(school: School): string[] {
  const bullets: string[] = [];
  if (school.islamicEnvironment === "Available") {
    bullets.push("Balanced Islamic environment with international openness");
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
  return schools
    .map((school) => ({
      school,
      matchScore: calculateMatchScore(school, criteria),
      whyMatches: buildWhyMatches(school)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
