import { schoolRepository } from "@/features/schools/repository";
import { SchoolsDirectory } from "./schools-directory";

export default async function SchoolsPage() {
  const schools = await schoolRepository.listSchools();
  return <SchoolsDirectory initialSchools={schools} />;
}
