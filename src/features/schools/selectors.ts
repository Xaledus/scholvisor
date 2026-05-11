import { filterSchools } from "@/features/schools/helpers/filter-helpers";
import { toParentInsight, toSchool } from "@/features/schools/schemas";
import type { ParentInsight, School, SchoolFilters, SchoolRecord } from "@/features/schools/types";

export function selectSchools(records: SchoolRecord[]): School[] {
  return records.map(toSchool);
}

export function selectSchoolBySlug(records: SchoolRecord[], slug: string): School | undefined {
  return selectSchools(records).find((school) => school.slug === slug);
}

export function selectSchoolsByFilters(records: SchoolRecord[], filters: SchoolFilters): School[] {
  return filterSchools(selectSchools(records), filters);
}

export function selectFeaturedSchools(records: SchoolRecord[], limit = 2): School[] {
  return selectSchools(records).slice(0, limit);
}

export function selectParentInsights(records: ParentInsight[]): ParentInsight[] {
  return records.map(toParentInsight);
}

export function selectParentInsightsBySchool(records: ParentInsight[], slug: string): ParentInsight[] {
  return selectParentInsights(records).filter((insight) => insight.schoolSlug === slug);
}
