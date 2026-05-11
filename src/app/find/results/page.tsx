import { defaultFindCriteria } from "@/features/schools/find-screen";
import { schoolRepository } from "@/features/schools/repository";
import { FindResultsClient } from "./find-results-client";

export default async function FindResultsPage() {
  const results = await schoolRepository.listMatchingSchools(defaultFindCriteria);
  return <FindResultsClient initialResults={results} />;
}
