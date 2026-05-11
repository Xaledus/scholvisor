"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ReviewIllustration } from "@/components/ui/illustrations";
import { StarSelector } from "@/components/ui/star-selector";
import {
  childGradeOptions,
  MAX_TEXT_LENGTH,
  requiredCriteriaKeys,
  reviewCriteria
} from "@/features/reviews/schemas";
import type { CriteriaScores, ReviewFormData } from "@/features/reviews/types";
import type { School } from "@/features/schools/types";
import { submitReview } from "./actions";

// ─── constants ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4;

const initialScores: CriteriaScores = {
  academicQuality: null,
  communicationAdmin: null,
  integrationWellbeing: null,
  facilitiesActivities: null,
  valueForMoney: null,
  marketingVsReality: null,
  islamicEnvironment: null
};

const emptyForm: ReviewFormData = {
  schoolSlug: "",
  relationship: "",
  childGrade: "",
  attendancePeriod: "",
  nationality: "",
  email: "",
  strengths: "",
  frustrations: "",
  criteriaScores: initialScores,
  consentGiven: false
};

// ─── component ────────────────────────────────────────────────────────────────

type ReviewFormProps = {
  schools: School[];
};

export function ReviewForm({ schools }: ReviewFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ReviewFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const patch = (fields: Partial<ReviewFormData>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const patchScore = (key: keyof CriteriaScores, value: number | null) =>
    setForm((prev) => ({
      ...prev,
      criteriaScores: { ...prev.criteriaScores, [key]: value }
    }));

  function validateStep(s: number): Record<string, string> {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.schoolSlug) errs.schoolSlug = "Please select a school.";
      if (!form.relationship) errs.relationship = "Please select your relationship.";
      if (!form.childGrade) errs.childGrade = "Please select a grade.";
      if (!form.attendancePeriod.trim())
        errs.attendancePeriod = "Please enter an attendance period.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Please enter a valid email address.";
    }
    if (s === 2) {
      if (!form.strengths.trim() && !form.frustrations.trim())
        errs.text = "Please share at least one strength or frustration.";
    }
    if (s === 3) {
      const missing = requiredCriteriaKeys.some((k) => form.criteriaScores[k] === null);
      if (missing) errs.criteria = "Please rate all required criteria before continuing.";
    }
    if (s === 4) {
      if (!form.consentGiven) errs.consent = "Please confirm your consent to submit.";
    }
    return errs;
  }

  function handleNext() {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    const errs = validateStep(4);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitReview(form);
      if (result.success) {
        setSuccessId(result.id);
      } else {
        setErrors({ submit: result.error });
      }
    } finally {
      setSubmitting(false);
    }
  }

  // ─── success screen ───────────────────────────────────────────────────────

  if (successId) {
    return (
      <main className="mx-auto w-full max-w-lg px-4 pb-10 pt-8 sm:px-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E3F3EF]">
            <CheckCircle2 className="h-7 w-7 text-[#1DBAA5]" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-[#0F2540]">Thank you for sharing</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#667085]">
            Your review is now pending moderation. Once approved, it will help other families
            choose a school with real confidence.
          </p>
          <p className="mt-4 rounded-xl bg-[#F2F4F7] px-4 py-3 text-xs text-[#667085]">
            Your name and email are never shown publicly.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/schools"
              className="inline-flex justify-center rounded-xl bg-[#1DBAA5] px-5 py-3 text-sm font-semibold text-white"
            >
              Explore more schools
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center rounded-xl border border-[#0F2540]/20 px-5 py-3 text-sm font-semibold text-[#0F2540]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const selectedSchool = schools.find((s) => s.slug === form.schoolSlug) ?? null;

  // ─── form shell ───────────────────────────────────────────────────────────

  return (
    <main className="mx-auto w-full max-w-lg px-4 pb-10 pt-4 sm:px-6">
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Previous step"
            className={`rounded-full p-2 text-[#0F2540] transition ${
              step === 1 ? "invisible" : "bg-[#F2F4F7]"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <p className="text-xs font-semibold text-[#667085]">
            Step {step} of {TOTAL_STEPS}
          </p>
          <div className="w-8" />
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F2F4F7]">
          <div
            className="h-full rounded-full bg-[#1DBAA5] transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">

        {/* ── STEP 1: School & context ────────────────────────────────────── */}
        {step === 1 && (
          <div>
            <div className="mb-5 overflow-hidden rounded-2xl bg-[#E3F3EF]">
              <ReviewIllustration className="w-full" />
            </div>
            <h1 className="text-xl font-bold text-[#0F2540]">School & your context</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Context helps families understand who is behind the review.
            </p>

            <div className="mt-6 space-y-5">

              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  School <Required />
                </label>
                <select
                  value={form.schoolSlug}
                  onChange={(e) => patch({ schoolSlug: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 bg-white px-4 py-3 text-sm text-[#0F2540] outline-none focus:border-[#1DBAA5]"
                >
                  <option value="">Select a school</option>
                  {schools.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name} — {s.location}
                    </option>
                  ))}
                </select>
                <FieldError msg={errors.schoolSlug} />
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-[#0F2540]">
                  Your relationship <Required />
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["current-parent", "former-parent"] as const).map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => patch({ relationship: rel })}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        form.relationship === rel
                          ? "border-[#1DBAA5] bg-[#E3F3EF] text-[#0F2540]"
                          : "border-[#0F2540]/15 bg-white text-[#667085]"
                      }`}
                    >
                      {rel === "current-parent" ? "Current parent" : "Former parent"}
                    </button>
                  ))}
                </div>
                <FieldError msg={errors.relationship} />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  Child&apos;s grade <Required />
                </label>
                <select
                  value={form.childGrade}
                  onChange={(e) => patch({ childGrade: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 bg-white px-4 py-3 text-sm text-[#0F2540] outline-none focus:border-[#1DBAA5]"
                >
                  <option value="">Select a grade</option>
                  {childGradeOptions.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <FieldError msg={errors.childGrade} />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  Attendance period <Required />
                </label>
                <input
                  type="text"
                  value={form.attendancePeriod}
                  onChange={(e) => patch({ attendancePeriod: e.target.value })}
                  placeholder="e.g. September 2021 – present"
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
                <FieldError msg={errors.attendancePeriod} />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  Nationality{" "}
                  <span className="font-normal text-[#667085]">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.nationality}
                  onChange={(e) => patch({ nationality: e.target.value })}
                  placeholder="e.g. French, Malaysian, British"
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  Email <Required />
                </label>
                <p className="mt-0.5 text-xs text-[#667085]">
                  Notified when approved. Never shown publicly.
                </p>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
                <FieldError msg={errors.email} />
              </fieldset>
            </div>

            <NextButton onClick={handleNext} />
          </div>
        )}

        {/* ── STEP 2: Strengths & frustrations ───────────────────────────── */}
        {step === 2 && (
          <div>
            <h1 className="text-xl font-bold text-[#0F2540]">Strengths & frustrations</h1>
            <p className="mt-1 text-sm text-[#667085]">
              What would you tell another parent honestly? Share what brochures don&apos;t.
            </p>

            <div className="mt-6 space-y-5">
              <fieldset>
                <label className="flex items-center justify-between text-sm font-semibold text-[#0F2540]">
                  <span>What works well</span>
                  <CharCount current={form.strengths.length} max={MAX_TEXT_LENGTH} />
                </label>
                <textarea
                  value={form.strengths}
                  onChange={(e) =>
                    patch({ strengths: e.target.value.slice(0, MAX_TEXT_LENGTH) })
                  }
                  placeholder="Academic support, community warmth, teacher responsiveness…"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
              </fieldset>

              <fieldset>
                <label className="flex items-center justify-between text-sm font-semibold text-[#0F2540]">
                  <span>What could be better</span>
                  <CharCount current={form.frustrations.length} max={MAX_TEXT_LENGTH} />
                </label>
                <textarea
                  value={form.frustrations}
                  onChange={(e) =>
                    patch({ frustrations: e.target.value.slice(0, MAX_TEXT_LENGTH) })
                  }
                  placeholder="Communication delays, inconsistency between years, admin friction…"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
              </fieldset>

              <FieldError msg={errors.text} />
            </div>

            <StepNav onBack={handleBack} onNext={handleNext} />
          </div>
        )}

        {/* ── STEP 3: Criteria scores ─────────────────────────────────────── */}
        {step === 3 && (
          <div>
            <h1 className="text-xl font-bold text-[#0F2540]">Rate key areas</h1>
            <p className="mt-1 text-sm text-[#667085]">
              1 = poor · 5 = excellent. Islamic environment is optional.
            </p>

            <div className="mt-6 divide-y divide-[#0F2540]/8">
              {reviewCriteria.map((criterion) => {
                const value = form.criteriaScores[criterion.key];
                return (
                  <div key={criterion.key} className="py-4 first:pt-0 last:pb-0">
                    <p className="text-sm font-semibold text-[#0F2540]">
                      {criterion.label}
                      {criterion.optional && (
                        <span className="ml-2 text-xs font-normal text-[#667085]">
                          optional
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-[#667085]">{criterion.description}</p>
                    <div className="mt-2">
                      <StarSelector
                        value={value}
                        onChange={(v) => patchScore(criterion.key, v)}
                        optional={criterion.optional}
                        onSkip={
                          criterion.optional
                            ? () => patchScore(criterion.key, null)
                            : undefined
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <FieldError msg={errors.criteria} />
            <StepNav onBack={handleBack} onNext={handleNext} />
          </div>
        )}

        {/* ── STEP 4: Summary + consent ───────────────────────────────────── */}
        {step === 4 && (
          <div>
            <h1 className="text-xl font-bold text-[#0F2540]">Review your submission</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Check everything looks right before you submit.
            </p>

            <div className="mt-5 space-y-4">
              {/* Summary */}
              <div className="rounded-2xl bg-[#F2F4F7] p-4 text-sm">
                <p className="font-semibold text-[#0F2540]">
                  {selectedSchool?.name ?? form.schoolSlug}
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  {form.relationship === "current-parent" ? "Current parent" : "Former parent"}
                  {" · "}
                  {form.childGrade}
                  {" · "}
                  {form.attendancePeriod}
                  {form.nationality ? ` · ${form.nationality}` : ""}
                </p>

                {form.strengths && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
                      What works well
                    </p>
                    <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[#667085]">
                      {form.strengths}
                    </p>
                  </div>
                )}

                {form.frustrations && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
                      What could be better
                    </p>
                    <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[#667085]">
                      {form.frustrations}
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#0F2540]">
                    Criteria scores
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {reviewCriteria.map((c) => {
                      const score = form.criteriaScores[c.key];
                      return (
                        <p key={c.key} className="text-xs text-[#667085]">
                          {c.label}:{" "}
                          <span className="font-semibold text-[#0F2540]">
                            {score !== null ? `${score}/5` : "—"}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <div className="rounded-xl border border-[#1DBAA5]/25 bg-[#E3F3EF] px-4 py-3 text-xs leading-relaxed text-[#667085]">
                Your name and email are never shown publicly. Your review appears under an
                anonymous context label only (e.g. &ldquo;Parent of Year 6 student&rdquo;).
              </div>

              {/* Consent */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#0F2540]/15 p-4">
                <input
                  type="checkbox"
                  checked={form.consentGiven}
                  onChange={(e) => patch({ consentGiven: e.target.checked })}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#1DBAA5]"
                />
                <span className="text-sm leading-relaxed text-[#0F2540]">
                  I confirm this review is based on genuine personal experience and I agree
                  to the Scholvisor review policy.
                </span>
              </label>
              <FieldError msg={errors.consent} />
              <FieldError msg={errors.submit} />
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 rounded-xl border border-[#0F2540]/20 py-3 text-sm font-semibold text-[#0F2540]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 rounded-xl bg-[#1DBAA5] py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit review"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── shared sub-components ────────────────────────────────────────────────────

function Required() {
  return <span className="ml-0.5 text-[#1DBAA5]">*</span>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-500">{msg}</p>;
}

function CharCount({ current, max }: { current: number; max: number }) {
  return (
    <span className={`text-xs font-normal ${current >= max ? "text-red-500" : "text-[#667085]"}`}>
      {current}/{max}
    </span>
  );
}

function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 w-full rounded-xl bg-[#1DBAA5] py-3 text-sm font-semibold text-white"
    >
      Continue
    </button>
  );
}

function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-8 flex gap-3">
      <button
        type="button"
        onClick={onBack}
        className="flex-1 rounded-xl border border-[#0F2540]/20 py-3 text-sm font-semibold text-[#0F2540]"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex-1 rounded-xl bg-[#1DBAA5] py-3 text-sm font-semibold text-white"
      >
        Continue
      </button>
    </div>
  );
}
