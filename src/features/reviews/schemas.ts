import type { CriteriaScores } from "@/features/reviews/types";

export type CriterionDef = {
  key: keyof CriteriaScores;
  label: string;
  description: string;
  optional?: boolean;
};

export const reviewCriteria: CriterionDef[] = [
  {
    key: "academicQuality",
    label: "Academic quality",
    description: "Teaching quality, curriculum delivery, learning outcomes"
  },
  {
    key: "communicationAdmin",
    label: "Communication & admin",
    description: "How well the school communicates with parents day-to-day"
  },
  {
    key: "integrationWellbeing",
    label: "Integration & wellbeing",
    description: "How your child settled in and felt emotionally supported"
  },
  {
    key: "facilitiesActivities",
    label: "Facilities & activities",
    description: "Campus quality, resources, extracurricular breadth"
  },
  {
    key: "valueForMoney",
    label: "Value for money",
    description: "Whether the fees reflect the experience received"
  },
  {
    key: "marketingVsReality",
    label: "Marketing vs reality",
    description: "How accurate the school's reputation was vs lived experience"
  },
  {
    key: "islamicEnvironment",
    label: "Islamic environment",
    description: "Halal food, prayer facilities, faith support, values alignment",
    optional: true
  }
];

export const childGradeOptions: string[] = [
  "Early years (Pre-K / Reception)",
  "Year 1–2 (Ages 5–7)",
  "Year 3–4 (Ages 7–9)",
  "Year 5–6 (Ages 9–11)",
  "Year 7–8 (Ages 11–13)",
  "Year 9–10 (Ages 13–15)",
  "Year 11–12 (Ages 15–17)",
  "Year 13 / IB / A-Level"
];

export const MAX_TEXT_LENGTH = 500;

export const requiredCriteriaKeys: (keyof CriteriaScores)[] = [
  "academicQuality",
  "communicationAdmin",
  "integrationWellbeing",
  "facilitiesActivities",
  "valueForMoney",
  "marketingVsReality"
];
