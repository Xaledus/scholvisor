import type { School, SchoolFilters } from "@/features/schools/types";

export function matchesSchoolFilters(school: School, filters: SchoolFilters): boolean {
  const query = filters.query?.trim().toLowerCase();
  if (query) {
    const searchTarget = `${school.name} ${school.location} ${school.curriculum.join(" ")}`.toLowerCase();
    if (!searchTarget.includes(query)) {
      return false;
    }
  }

  if (filters.locations?.length && !filters.locations.includes(school.location)) {
    return false;
  }

  if (filters.curricula?.length && !filters.curricula.some((curriculum) => school.curriculum.includes(curriculum))) {
    return false;
  }

  if (filters.levels?.length && !filters.levels.includes(school.schoolLevel)) {
    return false;
  }

  if (
    filters.islamicEnvironment &&
    filters.islamicEnvironment !== "Any" &&
    school.islamicEnvironment !== filters.islamicEnvironment
  ) {
    return false;
  }

  return true;
}

export function filterSchools(schools: School[], filters: SchoolFilters): School[] {
  return schools.filter((school) => matchesSchoolFilters(school, filters));
}
