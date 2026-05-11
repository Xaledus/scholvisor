import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { mainNavItems } from "@/data/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#0F2540]/10 bg-[#F2F4F7]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#0F2540]">
          Scholvisor
        </Link>
        <nav className="hidden items-center gap-5 sm:flex">
          {mainNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[#667085] hover:text-[#0F2540]">
              {item.label}
            </Link>
          ))}
        </nav>
        <CTAButton href="/find" className="px-4 py-2 text-xs sm:text-sm">
          Start Finding
        </CTAButton>
      </div>
    </header>
  );
}
