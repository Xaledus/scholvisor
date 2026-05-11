export type IslamicEnvironment = "Available" | "Not specified";

export type CriterionScore = {
  label: string;
  score: number; // 1.0–5.0, per-criterion parent signal — never aggregated for public display
};

export type SchoolLevel =
  | "Early years"
  | "Primary"
  | "Secondary"
  | "All-through"
  | "Primary to Secondary"
  | "Early years to Secondary"
  | "Primary to Lower Secondary";

export type School = {
  id: string;
  slug: string;
  name: string;
  location: string;
  curriculum: string[];
  ages: string;
  schoolLevel: SchoolLevel;
  islamicEnvironment: IslamicEnvironment;
  annualTuitionRange: string;
  rating: number;
  reviewCount: number;
  fitTags: string[];
  summary: string;
  parentInsight: string;
  categories: string[];
  criteria: string[];
  criteriaScores: CriterionScore[];
};

export type ParentInsight = {
  id: string;
  schoolSlug: string;
  title: string;
  context: string;
  quote: string;
  author: string;
  rating: number;
};

export type SchoolRecord = Omit<School, "id"> & {
  id?: string;
};

export type SchoolFilters = {
  query?: string;
  locations?: string[];
  curricula?: string[];
  levels?: string[];
  islamicEnvironment?: IslamicEnvironment | "Any";
};

export type SchoolCreateInput = Omit<School, "id">;
export type SchoolUpdateInput = Partial<SchoolCreateInput>;

export type FindCriteria = {
  budgetLabel: string;
  curriculum: string;   // "Any" or specific curriculum name
  location: string;     // "Any" or city name
  schoolLevel: string;  // "Any" or SchoolLevel value
  islamicLevel: number;        // 0=not important → 3=very strict
  disciplineLevel: number;     // 0=relaxed → 3=very structured
  classSizePreference: number; // 0=small → 3=large OK
  wellbeingFocus: number;      // 0=standard → 3=core mission
};

export type SchoolMatch = {
  school: School;
  matchScore: number;
  whyMatches: string[];
};
