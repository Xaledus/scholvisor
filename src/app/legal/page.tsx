import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Policies — Scholvisor",
};

type Section = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: Section) {
  return (
    <section className="rounded-2xl border border-[#0F2540]/10 bg-white p-5 sm:p-6">
      <h2 className="text-base font-semibold text-[#0F2540]">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#667085]">{children}</div>
    </section>
  );
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 pl-1">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1DBAA5]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-[#0F2540] sm:text-3xl">Legal &amp; Policies</h1>
      <p className="mt-2 text-sm text-[#667085]">Last updated: May 2026</p>

      <div className="mt-6 space-y-4">

        <Section title="About Scholvisor">
          <p>
            Scholvisor is an independent, parent-powered platform helping families find international
            schools in Malaysia. We are not affiliated with, endorsed by, or funded by any school or
            educational institution.
          </p>
        </Section>

        <Section title="Terms of Use">
          <p>By using Scholvisor, you agree to:</p>
          <Ul
            items={[
              "Provide honest, factual reviews based on your personal experience",
              "Not post defamatory, offensive, or false information",
              "Not impersonate other parents or school staff",
              "Not use the platform for commercial purposes",
            ]}
          />
          <p>
            Scholvisor reserves the right to remove any content that violates these terms without
            notice.
          </p>
        </Section>

        <Section title="Reviews &amp; Moderation Policy">
          <p>All reviews are submitted by real parents and moderated before publication.</p>
          <p>We accept reviews that are:</p>
          <Ul
            items={[
              "Based on direct personal experience",
              "Respectful and constructive",
              "Factual and specific",
            ]}
          />
          <p>We reject reviews that contain:</p>
          <Ul
            items={[
              "Hate speech or discrimination",
              "Personal attacks on individuals",
              "Unverifiable claims presented as facts",
              "Spam or promotional content",
            ]}
          />
          <p>
            Community scores and reviews reflect user experiences and do not represent official school
            accreditation or certification.
          </p>
        </Section>

        <Section title="Privacy Policy">
          <p>We collect only what is necessary:</p>
          <Ul
            items={[
              "Email address (never shown publicly, used only for review notifications)",
              "Anonymous display name (chosen by you)",
              "General family context (nationality, school level) — shown publicly only with your consent",
            ]}
          />
          <p>
            We never share your personal information with schools, third parties, or advertisers.
            Your child&apos;s identity is never requested or stored.
          </p>
        </Section>

        <Section title="School Data">
          <p>School information on Scholvisor is sourced from:</p>
          <Ul
            items={[
              "Official school websites",
              "Public directories",
              "Parent contributions",
            ]}
          />
          <p>
            We strive for accuracy but cannot guarantee that all information is current. Schools may
            request corrections of factual errors by contacting{" "}
            <a href="mailto:hello@scholvisor.com" className="font-medium text-[#1DBAA5]">
              hello@scholvisor.com
            </a>
            .
          </p>
        </Section>

        <Section title="Right of Reply">
          <p>
            Schools listed on Scholvisor may request a right of reply to community reviews by
            contacting{" "}
            <a href="mailto:schools@scholvisor.com" className="font-medium text-[#1DBAA5]">
              schools@scholvisor.com
            </a>
            .
          </p>
          <p>
            We will review all requests within 14 business days. Schools may not request removal of
            legitimate parent reviews.
          </p>
        </Section>

        <Section title="Disclaimer">
          <p>Scholvisor is an independent platform.</p>
          <p>
            Community scores are based on parent submissions and do not constitute official rankings
            or endorsements. Scholvisor accepts no liability for decisions made based on information
            found on this platform.
          </p>
          <p>
            Always verify information directly with schools before making enrollment decisions.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            The Scholvisor name, logo, and platform are the intellectual property of Scholvisor. All
            rights reserved. User-submitted review content remains the property of the submitting
            user; by submitting you grant Scholvisor a non-exclusive licence to display it on the
            platform.
          </p>
        </Section>

      </div>

      <div className="mt-8 text-center">
        <a
          href="mailto:hello@scholvisor.com"
          className="text-xs text-[#667085] underline-offset-2 hover:underline"
        >
          Questions? Contact hello@scholvisor.com
        </a>
      </div>
    </main>
  );
}
