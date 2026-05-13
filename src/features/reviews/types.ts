export type ReviewRelationship = "current-parent" | "former-parent";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type CriteriaScores = {
  academicQuality: number | null;
  communicationAdmin: number | null;
  integrationWellbeing: number | null;
  facilitiesActivities: number | null;
  valueForMoney: number | null;
  marketingVsReality: number | null;
  islamicEnvironment: number | null; // optional — null means skipped/N/A
};

export type ReviewFormData = {
  schoolSlug: string;
  relationship: ReviewRelationship | "";
  childGrade: string;
  attendancePeriod: string;
  nationality: string;
  displayName: string;
  email: string;
  strengths: string;
  frustrations: string;
  criteriaScores: CriteriaScores;
  consentGiven: boolean;
};

export type StoredReview = ReviewFormData & {
  id: string;
  status: ReviewStatus;
  submittedAt: string;
  rejectionReason?: string;
  moderatedAt?: string;
};

// Backward-compatible alias
export type PendingReview = StoredReview;
