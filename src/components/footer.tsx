import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#0F2540]/10 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-semibold text-[#0F2540]">Scholvisor</p>
        <p className="mt-1 text-sm text-[#667085]">Your guide. Their future.</p>
        <p className="mt-4 text-xs text-[#667085]">
          Built for families seeking calm, contextual clarity in international school decisions.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/legal" className="text-xs text-[#667085] underline-offset-2 hover:underline">
            Legal
          </Link>
          <a
            href="mailto:scholvisor@gmail.com"
            className="text-xs text-[#667085] underline-offset-2 hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
