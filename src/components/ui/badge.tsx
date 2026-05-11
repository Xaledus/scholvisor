import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[#E3F3EF] px-3 py-1 text-xs font-medium text-[#0F2540]",
        className
      )}
    >
      {children}
    </span>
  );
}
