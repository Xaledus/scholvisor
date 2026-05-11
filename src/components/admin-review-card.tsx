"use client";

import { useState, useTransition } from "react";
import { approveReviewAction, rejectReviewAction } from "@/app/admin/actions";
import { reviewCriteria } from "@/features/reviews/schemas";
import type { StoredReview } from "@/features/reviews/types";

type AdminReviewCardProps = {
  review: StoredReview;
  schoolName: string;
  secret: string;
};

export function AdminReviewCard({ review, schoolName, secret }: AdminReviewCardProps) {
  const [isPending, startTransition] = useTransition();
  const [isRejecting, setIsRejecting] = useState(false);
  const [reason, setReason] = useState("");

  function handleApprove() {
    startTransition(async () => {
      await approveReviewAction(review.id, review.schoolSlug, secret);
    });
  }

  function handleConfirmReject() {
    startTransition(async () => {
      await rejectReviewAction(review.id, reason, secret);
      setIsRejecting(false);
      setReason("");
    });
  }

  const submittedAt = new Date(review.submittedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-sm transition-opacity ${
        isPending ? "opacity-50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-[#0F2540]">{schoolName}</p>
          <p className="mt-0.5 text-sm text-[#667085]">
            {review.relationship === "current-parent" ? "Current parent" : "Former parent"}
            {" · "}
            {review.childGrade}
            {" · "}
            {review.attendancePeriod}
            {review.nationality ? ` · ${review.nationality}` : ""}
          </p>
          <p className="mt-0.5 text-xs text-[#667085]">
            <span className="font-medium text-[#0F2540]">Email:</span> {review.email}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block rounded-full bg-[#FFB545]/15 px-2.5 py-0.5 text-xs font-semibold text-[#0F2540]">
            Pending
          </span>
          <p className="mt-1 text-xs text-[#667085]">{submittedAt}</p>
        </div>
      </div>

      {/* Text content */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
            Strengths
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#667085]">
            {review.strengths || <span className="italic text-[#0F2540]/30">Not provided</span>}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
            Frustrations
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#667085]">
            {review.frustrations || <span className="italic text-[#0F2540]/30">Not provided</span>}
          </p>
        </div>
      </div>

      {/* Criteria scores */}
      <div className="mt-4 rounded-xl bg-[#F2F4F7] p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
          Criteria scores
        </p>
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
          {reviewCriteria.map((c) => {
            const score = review.criteriaScores[c.key];
            return (
              <p key={c.key} className="text-xs text-[#667085]">
                {c.label}:{" "}
                <span className="font-semibold text-[#0F2540]">
                  {score !== null ? `${score}/5` : "N/A"}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4">
        {!isRejecting ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleApprove}
              disabled={isPending}
              className="rounded-lg bg-[#1DBAA5] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isPending ? "Approving…" : "Approve"}
            </button>
            <button
              type="button"
              onClick={() => setIsRejecting(true)}
              disabled={isPending}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Rejection reason (optional — not shown publicly)"
              rows={2}
              className="w-full resize-none rounded-xl border border-red-200 px-3 py-2 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-red-400"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={isPending}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {isPending ? "Rejecting…" : "Confirm rejection"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRejecting(false);
                  setReason("");
                }}
                disabled={isPending}
                className="rounded-lg border border-[#0F2540]/15 px-4 py-2 text-sm font-medium text-[#667085]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
