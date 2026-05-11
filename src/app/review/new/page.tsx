import { schoolRepository } from "@/features/schools/repository";
import { ReviewForm } from "./review-form";

export default async function ReviewNewPage() {
  const schools = await schoolRepository.listSchools();
  return <ReviewForm schools={schools} />;
}
