import type { ParentInsight, SchoolRecord } from "@/features/schools/types";

export const coreSchoolFilters = ["Budget", "Curriculum", "Location", "School level", "Islamic environment"];

export const defaultSelectedFilterChips = ["RM20k-RM40k", "British curriculum", "Kuala Lumpur"];

export function toSchool(record: SchoolRecord) {
  return {
    ...record,
    id: record.id ?? record.slug,
    fitTags: record.fitTags.slice(0, 3)
  };
}

export function toParentInsight(record: ParentInsight): ParentInsight {
  return { ...record };
}
