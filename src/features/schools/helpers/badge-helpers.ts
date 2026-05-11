import type { School } from "@/features/schools/types";

export function getContextualBadges(school: School): string[] {
  return school.fitTags.slice(0, 3);
}
