import { createServerClient } from "@/lib/supabase/server";
import { defaultFindCriteria, selectMatchingSchools } from "@/features/schools/find-screen";
import type {
  CriterionScore,
  FindCriteria,
  IslamicEnvironment,
  ParentInsight,
  School,
  SchoolFilters,
  SchoolLevel,
  SchoolMatch,
} from "@/features/schools/types";

export interface SchoolRepository {
  listSchools(filters?: SchoolFilters): Promise<School[]>;
  listFeaturedSchools(limit?: number): Promise<School[]>;
  getSchoolBySlug(slug: string): Promise<School | undefined>;
  listParentInsights(): Promise<ParentInsight[]>;
  listParentInsightsBySchool(slug: string): Promise<ParentInsight[]>;
  listMatchingSchools(criteria?: FindCriteria): Promise<SchoolMatch[]>;
}

function formatTuitionRange(min: number | null, max: number | null): string {
  if (min != null && max != null) {
    return `RM ${min.toLocaleString()} – RM ${max.toLocaleString()} / yr`;
  }
  if (min != null) return `From RM ${min.toLocaleString()} / yr`;
  return "Not specified";
}

function rowToSchool(row: Record<string, unknown>): School {
  return {
    id: (row.id as string) ?? "",
    slug: row.slug as string,
    name: row.name as string,
    location: (row.city as string) ?? "",
    summary: (row.summary as string) ?? "",
    schoolLevel: (row.school_level as SchoolLevel) ?? "All-through",
    ages: (row.age_range as string) ?? "",
    curriculum: (row.curriculum as string[]) ?? [],
    fitTags: (row.fit_tags as string[]) ?? [],
    islamicEnvironment: (row.religious_environment as IslamicEnvironment) ?? "Not specified",
    annualTuitionRange: formatTuitionRange(
      row.price_min as number | null,
      row.price_max as number | null
    ),
    rating: 0,
    reviewCount: 0,
    criteriaScores: [],
    parentInsight: (row.parent_insight as string) ?? "",
    categories: (row.categories as string[]) ?? [],
    criteria: (row.criteria as string[]) ?? [],
    transportation: (row.transportation as boolean | null) ?? null,
    boarding: (row.boarding as boolean | null) ?? null,
  };
}

function computeCriteriaScores(reviews: Record<string, unknown>[]): CriterionScore[] {
  const defs = [
    { key: "academic_quality", label: "Academic quality" },
    { key: "communication_admin", label: "Communication & admin" },
    { key: "integration_wellbeing", label: "Integration & wellbeing" },
    { key: "facilities_activities", label: "Facilities & activities" },
    { key: "value_for_money", label: "Value for money" },
    { key: "marketing_vs_reality", label: "Marketing vs reality" },
    { key: "islamic_environment", label: "Islamic environment" },
  ];

  return defs
    .map(({ key, label }) => {
      const scores = reviews
        .map((r) => r[key] as number | null)
        .filter((s): s is number => s !== null);
      if (scores.length === 0) return null;
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return { label, score: Math.round(avg * 10) / 10 };
    })
    .filter((s): s is CriterionScore => s !== null);
}

async function fetchReviewCountsBySchool(): Promise<Map<string, number>> {
  try {
    const db = createServerClient();
    const { data } = await db.from("reviews").select("school_slug").eq("status", "approved");
    const map = new Map<string, number>();
    for (const row of data ?? []) {
      map.set(row.school_slug, (map.get(row.school_slug) ?? 0) + 1);
    }
    return map;
  } catch {
    return new Map();
  }
}

class SupabaseSchoolRepository implements SchoolRepository {
  async listSchools(filters?: SchoolFilters): Promise<School[]> {
    try {
      const db = createServerClient();
      const { data, error } = await db.from("schools").select("*").order("name");
      if (error) return [];

      const schools: School[] = ((data ?? []) as Record<string, unknown>[]).map(rowToSchool);
      const countMap = await fetchReviewCountsBySchool();

      let result: School[] = schools.map((s) => ({ ...s, reviewCount: countMap.get(s.slug) ?? 0 }));

      if (filters?.query) {
        const q = filters.query.toLowerCase();
        result = result.filter(
          (s: School) =>
            s.name.toLowerCase().includes(q) ||
            s.location.toLowerCase().includes(q) ||
            s.curriculum.some((c: string) => c.toLowerCase().includes(q))
        );
      }

      return result;
    } catch {
      return [];
    }
  }

  async listFeaturedSchools(limit = 2): Promise<School[]> {
    try {
      const db = createServerClient();
      const { data, error } = await db
        .from("schools")
        .select("*")
        .eq("is_featured", true)
        .limit(limit);
      if (error) return [];
      return (data ?? []).map(rowToSchool);
    } catch {
      return [];
    }
  }

  async getSchoolBySlug(slug: string): Promise<School | undefined> {
    try {
      const db = createServerClient();
      const { data, error } = await db.from("schools").select("*").eq("slug", slug).single();
      if (error || !data) return undefined;

      const school = rowToSchool(data as Record<string, unknown>);

      const { data: reviews } = await db
        .from("reviews")
        .select("*")
        .eq("school_slug", slug)
        .eq("status", "approved");

      const reviewList = (reviews ?? []) as Record<string, unknown>[];
      return {
        ...school,
        reviewCount: reviewList.length,
        criteriaScores: computeCriteriaScores(reviewList),
      };
    } catch {
      return undefined;
    }
  }

  async listParentInsights(): Promise<ParentInsight[]> {
    return [];
  }

  async listParentInsightsBySchool(_slug: string): Promise<ParentInsight[]> {
    return [];
  }

  async listMatchingSchools(criteria: FindCriteria = defaultFindCriteria): Promise<SchoolMatch[]> {
    const schools = await this.listSchools();
    return selectMatchingSchools(schools, criteria);
  }
}

export const schoolRepository: SchoolRepository = new SupabaseSchoolRepository();
