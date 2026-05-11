"use client";

import { Star } from "lucide-react";

type StarSelectorProps = {
  value: number | null;
  onChange: (value: number) => void;
  optional?: boolean;
  onSkip?: () => void;
};

export function StarSelector({ value, onChange, optional = false, onSkip }: StarSelectorProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="rounded p-1.5 focus-visible:outline-2 focus-visible:outline-[#1DBAA5]"
          aria-label={`${star} out of 5`}
          aria-pressed={value === star}
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              value !== null && star <= value
                ? "fill-[#FFB545] text-[#FFB545]"
                : "text-[#0F2540]/20"
            }`}
          />
        </button>
      ))}
      {optional && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className={`ml-2 rounded-full px-3 py-1 text-xs font-medium transition ${
            value === null
              ? "bg-[#F2F4F7] text-[#667085] ring-1 ring-[#0F2540]/20"
              : "text-[#667085] hover:bg-[#F2F4F7]"
          }`}
        >
          N/A
        </button>
      )}
    </div>
  );
}
