import Link from "next/link";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CTAButton({ href, children, variant = "primary", className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-150",
        variant === "primary"
          ? "bg-[#1DBAA5] text-white hover:bg-[#17a08e]"
          : "border border-[#0F2540]/20 bg-white text-[#0F2540] hover:bg-[#F2F4F7]",
        className
      )}
    >
      {children}
    </Link>
  );
}
