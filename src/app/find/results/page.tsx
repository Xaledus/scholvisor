import { buildCriteriaChips, defaultFindCriteria } from "@/features/schools/find-screen";
import { schoolRepository } from "@/features/schools/repository";
import type { FindCriteria } from "@/features/schools/types";
import { FindResultsClient } from "./find-results-client";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

export default async function FindResultsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const criteria: FindCriteria = {
    budgetLabel: sp.budget ?? defaultFindCriteria.budgetLabel,
    curriculum: sp.curriculum ?? defaultFindCriteria.curriculum,
    location: sp.location ?? defaultFindCriteria.location,
    schoolLevel: sp.schoolLevel ?? defaultFindCriteria.schoolLevel,
    searchQuery: sp.search ?? "",
    islamicLevel: parseInt(sp.islamic ?? String(defaultFindCriteria.islamicLevel)),
    disciplineLevel: parseInt(sp.discipline ?? String(defaultFindCriteria.disciplineLevel)),
    classSizePreference: parseInt(sp.classSize ?? String(defaultFindCriteria.classSizePreference)),
    wellbeingFocus: parseInt(sp.wellbeing ?? String(defaultFindCriteria.wellbeingFocus)),
  };

  const results = await schoolRepository.listMatchingSchools(criteria);
  const criteriaChips = buildCriteriaChips(criteria);

  return <FindResultsClient initialResults={results} criteriaChips={criteriaChips} />;
}
