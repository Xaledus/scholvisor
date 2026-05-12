"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { ReviewIllustration } from "@/components/ui/illustrations";
import { StarSelector } from "@/components/ui/star-selector";
import {
  childGradeOptions,
  MAX_TEXT_LENGTH,
  requiredCriteriaKeys,
  reviewCriteria,
} from "@/features/reviews/schemas";
import type { CriteriaScores, ReviewFormData } from "@/features/reviews/types";
import type { School } from "@/features/schools/types";
import { submitReview } from "./actions";

// ─── constants ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4;

const COUNTRIES = [
  { code: "AF", flag: "🇦🇫", name: "Afghan" },
  { code: "AU", flag: "🇦🇺", name: "Australian" },
  { code: "AT", flag: "🇦🇹", name: "Austrian" },
  { code: "BD", flag: "🇧🇩", name: "Bangladeshi" },
  { code: "BE", flag: "🇧🇪", name: "Belgian" },
  { code: "BR", flag: "🇧🇷", name: "Brazilian" },
  { code: "CA", flag: "🇨🇦", name: "Canadian" },
  { code: "CN", flag: "🇨🇳", name: "Chinese" },
  { code: "CO", flag: "🇨🇴", name: "Colombian" },
  { code: "DK", flag: "🇩🇰", name: "Danish" },
  { code: "EG", flag: "🇪🇬", name: "Egyptian" },
  { code: "FI", flag: "🇫🇮", name: "Finnish" },
  { code: "FR", flag: "🇫🇷", name: "French" },
  { code: "DE", flag: "🇩🇪", name: "German" },
  { code: "GH", flag: "🇬🇭", name: "Ghanaian" },
  { code: "GR", flag: "🇬🇷", name: "Greek" },
  { code: "IN", flag: "🇮🇳", name: "Indian" },
  { code: "ID", flag: "🇮🇩", name: "Indonesian" },
  { code: "IR", flag: "🇮🇷", name: "Iranian" },
  { code: "IQ", flag: "🇮🇶", name: "Iraqi" },
  { code: "IE", flag: "🇮🇪", name: "Irish" },
  { code: "IT", flag: "🇮🇹", name: "Italian" },
  { code: "JP", flag: "🇯🇵", name: "Japanese" },
  { code: "JO", flag: "🇯🇴", name: "Jordanian" },
  { code: "KE", flag: "🇰🇪", name: "Kenyan" },
  { code: "KR", flag: "🇰🇷", name: "Korean" },
  { code: "KW", flag: "🇰🇼", name: "Kuwaiti" },
  { code: "LB", flag: "🇱🇧", name: "Lebanese" },
  { code: "MY", flag: "🇲🇾", name: "Malaysian" },
  { code: "MX", flag: "🇲🇽", name: "Mexican" },
  { code: "MA", flag: "🇲🇦", name: "Moroccan" },
  { code: "MM", flag: "🇲🇲", name: "Myanmar" },
  { code: "NL", flag: "🇳🇱", name: "Dutch" },
  { code: "NZ", flag: "🇳🇿", name: "New Zealander" },
  { code: "NG", flag: "🇳🇬", name: "Nigerian" },
  { code: "NO", flag: "🇳🇴", name: "Norwegian" },
  { code: "OM", flag: "🇴🇲", name: "Omani" },
  { code: "PK", flag: "🇵🇰", name: "Pakistani" },
  { code: "PH", flag: "🇵🇭", name: "Filipino" },
  { code: "PL", flag: "🇵🇱", name: "Polish" },
  { code: "PT", flag: "🇵🇹", name: "Portuguese" },
  { code: "QA", flag: "🇶🇦", name: "Qatari" },
  { code: "RO", flag: "🇷🇴", name: "Romanian" },
  { code: "RU", flag: "🇷🇺", name: "Russian" },
  { code: "SA", flag: "🇸🇦", name: "Saudi" },
  { code: "SG", flag: "🇸🇬", name: "Singaporean" },
  { code: "ZA", flag: "🇿🇦", name: "South African" },
  { code: "ES", flag: "🇪🇸", name: "Spanish" },
  { code: "LK", flag: "🇱🇰", name: "Sri Lankan" },
  { code: "SE", flag: "🇸🇪", name: "Swedish" },
  { code: "CH", flag: "🇨🇭", name: "Swiss" },
  { code: "TW", flag: "🇹🇼", name: "Taiwanese" },
  { code: "TH", flag: "🇹🇭", name: "Thai" },
  { code: "TR", flag: "🇹🇷", name: "Turkish" },
  { code: "AE", flag: "🇦🇪", name: "Emirati" },
  { code: "UA", flag: "🇺🇦", name: "Ukrainian" },
  { code: "GB", flag: "🇬🇧", name: "British" },
  { code: "US", flag: "🇺🇸", name: "American" },
  { code: "VN", flag: "🇻🇳", name: "Vietnamese" },
  { code: "YE", flag: "🇾🇪", name: "Yemeni" },
];

type Country = (typeof COUNTRIES)[0];

function generateDisplayName(): string {
  return `CuriousParentKL${String(Math.floor(Math.random() * 90) + 10)}`;
}

const initialScores: CriteriaScores = {
  academicQuality: null,
  communicationAdmin: null,
  integrationWellbeing: null,
  facilitiesActivities: null,
  valueForMoney: null,
  marketingVsReality: null,
  islamicEnvironment: null,
};

const emptyForm: ReviewFormData = {
  schoolSlug: "",
  relationship: "",
  childGrade: "",
  attendancePeriod: "",
  nationality: "",
  displayName: "",
  email: "",
  strengths: "",
  frustrations: "",
  criteriaScores: initialScores,
  consentGiven: false,
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

  // School search state
  const [schoolQuery, setSchoolQuery] = useState("");
  const [showSchoolList, setShowSchoolList] = useState(false);
  const schoolInputRef = useRef<HTMLInputElement>(null);

  // Nationality selector state
  const [natQuery, setNatQuery] = useState("");
  const [showNatList, setShowNatList] = useState(false);
  const [selectedNats, setSelectedNats] = useState<Country[]>([]);

  const patch = (fields: Partial<ReviewFormData>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const patchScore = (key: keyof CriteriaScores, value: number | null) =>
    setForm((prev) => ({
      ...prev,
      criteriaScores: { ...prev.criteriaScores, [key]: value },
    }));

  // School search helpers
  const selectedSchool = schools.find((s) => s.slug === form.schoolSlug) ?? null;
  const filteredSchools =
    schoolQuery && !form.schoolSlug
      ? schools
          .filter(
            (s) =>
              s.name.toLowerCase().includes(schoolQuery.toLowerCase()) ||
              s.location.toLowerCase().includes(schoolQuery.toLowerCase())
          )
          .slice(0, 8)
      : [];

  const selectSchool = (s: School) => {
    patch({ schoolSlug: s.slug });
    setSchoolQuery(s.name);
    setShowSchoolList(false);
  };

  // Nationality helpers
  const filteredCountries = natQuery
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().startsWith(natQuery.toLowerCase()) &&
          !selectedNats.some((n) => n.code === c.code)
      ).slice(0, 8)
    : [];

  const addNat = (c: Country) => {
    if (selectedNats.length >= 2) return;
    const next = [...selectedNats, c];
    setSelectedNats(next);
    patch({ nationality: next.map((n) => n.name).join(", ") });
    setNatQuery("");
    setShowNatList(false);
  };

  const removeNat = (code: string) => {
    const next = selectedNats.filter((n) => n.code !== code);
    setSelectedNats(next);
    patch({ nationality: next.map((n) => n.name).join(", ") });
  };

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
    if (step === 1 && !form.displayName.trim()) {
      patch({ displayName: generateDisplayName() });
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
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
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
          <h1 className="mt-5 text-xl font-bold text-[#0F2540]">
            Thank you for sharing your experience 🙏
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#667085]">
            Your review has been received and is pending moderation. We&apos;ll notify you by email
            once it&apos;s published — usually within 24–48 hours.
          </p>
          <div className="mt-7">
            <Link
              href="/schools"
              className="inline-flex justify-center rounded-xl bg-[#1DBAA5] px-5 py-3 text-sm font-semibold text-white"
            >
              Explore more schools
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── form shell ───────────────────────────────────────────────────────────

  return (
    <main className="mx-auto w-full max-w-lg px-4 pb-10 pt-4 sm:px-6">
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

        {/* ── STEP 1 ──────────────────────────────────────────────────────── */}
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

              {/* School searchable input — fix #10 */}
              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  School <Required />
                </label>
                <div className="relative mt-2">
                  <input
                    ref={schoolInputRef}
                    type="text"
                    value={form.schoolSlug ? (selectedSchool?.name ?? schoolQuery) : schoolQuery}
                    onChange={(e) => {
                      setSchoolQuery(e.target.value);
                      patch({ schoolSlug: "" });
                      setShowSchoolList(true);
                    }}
                    onFocus={() => setShowSchoolList(true)}
                    onBlur={() => setTimeout(() => setShowSchoolList(false), 150)}
                    placeholder="Type to search for a school…"
                    className="w-full rounded-xl border border-[#0F2540]/15 bg-white px-4 py-3 pr-10 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                  />
                  {form.schoolSlug && (
                    <button
                      type="button"
                      onClick={() => {
                        patch({ schoolSlug: "" });
                        setSchoolQuery("");
                        schoolInputRef.current?.focus();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {showSchoolList && filteredSchools.length > 0 && (
                    <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-[#0F2540]/10 bg-white shadow-md">
                      {filteredSchools.map((s) => (
                        <li key={s.slug}>
                          <button
                            type="button"
                            onMouseDown={() => selectSchool(s)}
                            className="w-full px-4 py-2.5 text-left text-sm text-[#0F2540] hover:bg-[#F2F4F7]"
                          >
                            <span className="font-medium">{s.name}</span>
                            <span className="ml-2 text-xs text-[#667085]">{s.location}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <FieldError msg={errors.schoolSlug} />
              </fieldset>

              {/* Relationship — fix #6 */}
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
                      {rel === "current-parent"
                        ? "My child attends this school"
                        : "My child attended this school"}
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

              {/* Nationality country selector — fix #7 */}
              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  Nationality{" "}
                  <span className="font-normal text-[#667085]">(optional, max 2)</span>
                </label>
                <div className="relative mt-2">
                  {selectedNats.length < 2 && (
                    <input
                      type="text"
                      value={natQuery}
                      onChange={(e) => {
                        setNatQuery(e.target.value);
                        setShowNatList(true);
                      }}
                      onFocus={() => setShowNatList(true)}
                      onBlur={() => setTimeout(() => setShowNatList(false), 150)}
                      placeholder="Type to search nationality…"
                      className="w-full rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                    />
                  )}
                  {showNatList && filteredCountries.length > 0 && (
                    <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-[#0F2540]/10 bg-white shadow-md">
                      {filteredCountries.map((c) => (
                        <li key={c.code}>
                          <button
                            type="button"
                            onMouseDown={() => addNat(c)}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#0F2540] hover:bg-[#F2F4F7]"
                          >
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {selectedNats.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedNats.map((n) => (
                      <span
                        key={n.code}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1DBAA5]/30 bg-[#E3F3EF] px-3 py-1 text-xs font-medium text-[#0F2540]"
                      >
                        {n.flag} {n.name}
                        <button
                          type="button"
                          onClick={() => removeNat(n.code)}
                          className="text-[#667085]"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </fieldset>

              {/* Display name — fix #9 */}
              <fieldset>
                <label className="block text-sm font-semibold text-[#0F2540]">
                  Your display name{" "}
                  <span className="font-normal text-[#667085]">(optional)</span>
                </label>
                <p className="mt-0.5 text-xs text-[#667085]">
                  Never shown publicly. We&apos;ll generate one if left empty.
                </p>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => patch({ displayName: e.target.value })}
                  placeholder="e.g. FrenchMomKL, ExpatDadKL"
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
              </fieldset>

              {/* Email with blur validation — fix #8 */}
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
                  onChange={(e) => {
                    patch({ email: e.target.value });
                    if (errors.email)
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.email;
                        return next;
                      });
                  }}
                  onBlur={(e) => {
                    if (
                      e.target.value &&
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    ) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "Please enter a valid email address.",
                      }));
                    }
                  }}
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-xl border border-[#0F2540]/15 px-4 py-3 text-sm text-[#0F2540] outline-none placeholder:text-[#667085] focus:border-[#1DBAA5]"
                />
                <FieldError msg={errors.email} />
              </fieldset>
            </div>

            <NextButton onClick={handleNext} />
          </div>
        )}

        {/* ── STEP 2 ──────────────────────────────────────────────────────── */}
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

        {/* ── STEP 3 ──────────────────────────────────────────────────────── */}
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

        {/* ── STEP 4 ──────────────────────────────────────────────────────── */}
        {step === 4 && (
          <div>
            <h1 className="text-xl font-bold text-[#0F2540]">Review your submission</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Check everything looks right before you submit.
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#F2F4F7] p-4 text-sm">
                <p className="font-semibold text-[#0F2540]">
                  {selectedSchool?.name ?? form.schoolSlug}
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  {form.relationship === "current-parent"
                    ? "My child attends this school"
                    : "My child attended this school"}
                  {" · "}
                  {form.childGrade}
                  {" · "}
                  {form.attendancePeriod}
                  {form.nationality ? ` · ${form.nationality}` : ""}
                </p>
                {form.displayName && (
                  <p className="mt-1 text-xs text-[#667085]">
                    Display name:{" "}
                    <span className="font-medium text-[#0F2540]">{form.displayName}</span>
                  </p>
                )}

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

              <div className="rounded-xl border border-[#1DBAA5]/25 bg-[#E3F3EF] px-4 py-3 text-xs leading-relaxed text-[#667085]">
                Your name and email are never shown publicly. Your review appears under an
                anonymous context label only (e.g. &ldquo;Parent of Year 6 student&rdquo;).
              </div>

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
