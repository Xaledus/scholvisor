import type { School, SchoolCreateInput, SchoolUpdateInput } from "@/features/schools/types";

export function createSchool(schools: School[], input: SchoolCreateInput): School[] {
  const nextSchool: School = { ...input, id: input.slug };
  return [...schools, nextSchool];
}

export function updateSchool(schools: School[], slug: string, patch: SchoolUpdateInput): School[] {
  return schools.map((school) => (school.slug === slug ? { ...school, ...patch } : school));
}

export function deleteSchool(schools: School[], slug: string): School[] {
  return schools.filter((school) => school.slug !== slug);
}

export function addSchoolCriterion(schools: School[], slug: string, criterion: string): School[] {
  return schools.map((school) =>
    school.slug === slug ? { ...school, criteria: Array.from(new Set([...school.criteria, criterion])) } : school
  );
}

export function addSchoolCategory(schools: School[], slug: string, category: string): School[] {
  return schools.map((school) =>
    school.slug === slug ? { ...school, categories: Array.from(new Set([...school.categories, category])) } : school
  );
}
