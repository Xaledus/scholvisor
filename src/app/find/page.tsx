import { selectPopularSearchChips } from "@/features/schools/find-screen";
import { schoolRepository } from "@/features/schools/repository";
import { FindScreenClient } from "./find-screen-client";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

export default async function FindPage({ searchParams }: Props) {
  const sp = await searchParams;
  const schools = await schoolRepository.listSchools();
  const popularSearches = selectPopularSearchChips(schools);
  return <FindScreenClient popularSearches={popularSearches} initialParams={sp} />;
}
