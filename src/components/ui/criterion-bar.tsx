type CriterionBarProps = {
  label: string;
  score: number; // 1.0–5.0
};

export function CriterionBar({ label, score }: CriterionBarProps) {
  const fillPct = ((score - 1) / 4) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="w-44 shrink-0 text-sm text-[#0F2540]">{label}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-[#F2F4F7]" style={{ height: "6px" }}>
        <div
          className="h-full rounded-full bg-[#1DBAA5]"
          style={{ width: `${fillPct}%` }}
          role="presentation"
        />
      </div>
      <span className="w-8 shrink-0 text-right text-sm font-semibold text-[#0F2540]">
        {score.toFixed(1)}
      </span>
    </div>
  );
}
