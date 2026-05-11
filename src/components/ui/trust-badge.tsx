import { ShieldCheck } from "lucide-react";

type TrustBadgeProps = {
  label: string;
};

export function TrustBadge({ label }: TrustBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#0F2540]/15 bg-white px-3 py-2 text-xs font-medium text-[#0F2540]">
      <ShieldCheck className="h-4 w-4 text-[#1DBAA5]" />
      {label}
    </div>
  );
}
