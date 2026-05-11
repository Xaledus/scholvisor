import { MessageSquareHeart } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { TrustBadge } from "@/components/ui/trust-badge";

export default function ReviewStartPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F3EF] px-3 py-1 text-xs font-semibold text-[#0F2540]">
          <MessageSquareHeart className="h-3.5 w-3.5 text-[#1DBAA5]" />
          Review journey
        </div>

        <h1 className="mt-4 text-2xl font-bold text-[#0F2540]">Share what brochures miss</h1>
        <p className="mt-2 text-sm text-[#667085]">
          Help other families with grounded context about school life, transitions, and everyday experience.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <TrustBadge label="Identity-protected options" />
          <TrustBadge label="Context before rating" />
          <TrustBadge label="No social feed dynamics" />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/review/new">Start your review</CTAButton>
          <CTAButton href="/schools" variant="secondary">Preview schools first</CTAButton>
        </div>
      </section>
    </main>
  );
}
