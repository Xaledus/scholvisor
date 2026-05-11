import { selectPopularSearchChips } from "@/features/schools/find-screen";
import { schoolRepository } from "@/features/schools/repository";
import { FindScreenClient } from "./find-screen-client";

export default async function FindPage() {
  const schools = await schoolRepository.listSchools();
  const popularSearches = selectPopularSearchChips(schools);
  return <FindScreenClient popularSearches={popularSearches} />;
}
