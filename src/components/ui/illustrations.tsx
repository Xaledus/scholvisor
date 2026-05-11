/**
 * Brand illustration set — inline SVGs using #0F2540, #1DBAA5, #FFB545.
 * All aria-hidden; decorative only.
 */

type IllustrationProps = { className?: string };

/** Homepage hero — family of three walking toward a school. For use on #0F2540 dark bg. */
export function HomeHeroIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Clouds */}
      <ellipse cx="48" cy="22" rx="18" ry="11" fill="white" fillOpacity="0.10" />
      <ellipse cx="68" cy="17" rx="14" ry="9" fill="white" fillOpacity="0.08" />
      <ellipse cx="82" cy="22" rx="12" ry="8" fill="white" fillOpacity="0.07" />

      <ellipse cx="245" cy="30" rx="16" ry="9" fill="white" fillOpacity="0.08" />
      <ellipse cx="263" cy="25" rx="12" ry="8" fill="white" fillOpacity="0.06" />

      {/* School — right side */}
      {/* Roof */}
      <polygon points="158,72 226,38 294,72" fill="#1DBAA5" />
      {/* Building body */}
      <rect x="158" y="72" width="136" height="76" rx="3" fill="white" fillOpacity="0.18" />
      {/* Windows */}
      <rect x="173" y="87" width="22" height="16" rx="3" fill="#FFB545" fillOpacity="0.85" />
      <rect x="226" y="87" width="22" height="16" rx="3" fill="#FFB545" fillOpacity="0.85" />
      {/* Door */}
      <rect x="212" y="108" width="20" height="40" rx="3" fill="#1DBAA5" fillOpacity="0.9" />
      {/* Door knob */}
      <circle cx="229" cy="130" r="1.8" fill="white" fillOpacity="0.7" />
      {/* Flagpole */}
      <rect x="225" y="38" width="2" height="18" fill="#FFB545" fillOpacity="0.8" />
      <rect x="225" y="38" width="14" height="9" rx="1" fill="#FFB545" fillOpacity="0.8" />
      {/* Right tree */}
      <ellipse cx="302" cy="100" rx="14" ry="16" fill="#1DBAA5" fillOpacity="0.35" />
      <rect x="299" y="115" width="5" height="20" rx="2" fill="white" fillOpacity="0.15" />

      {/* Ground */}
      <rect x="0" y="148" width="320" height="3" rx="1.5" fill="white" fillOpacity="0.08" />

      {/* Family — left side, facing right */}
      {/* Adult 1 — white */}
      <circle cx="28" cy="96" r="11" fill="white" fillOpacity="0.75" />
      <rect x="19" y="107" width="18" height="30" rx="9" fill="white" fillOpacity="0.65" />
      {/* Adult 2 — teal */}
      <circle cx="58" cy="99" r="11" fill="#1DBAA5" fillOpacity="0.85" />
      <rect x="49" y="110" width="18" height="28" rx="9" fill="#1DBAA5" fillOpacity="0.75" />
      {/* Child — amber */}
      <circle cx="41" cy="114" r="9" fill="#FFB545" fillOpacity="0.90" />
      <rect x="33" y="123" width="16" height="22" rx="8" fill="#FFB545" fillOpacity="0.80" />

      {/* Path dots from family → school */}
      {[80, 94, 108, 122, 136, 150].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy={144 - i}
          r="1.8"
          fill="white"
          fillOpacity={0.15 + i * 0.05}
        />
      ))}
    </svg>
  );
}

/** School card thumbnail — building scene for use on light #E3F3EF bg. */
export function SchoolCardIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Sky */}
      <rect width="320" height="90" fill="#E3F3EF" />

      {/* Sun */}
      <circle cx="284" cy="20" r="14" fill="#FFB545" fillOpacity="0.35" />
      <circle cx="296" cy="14" r="10" fill="#FFB545" fillOpacity="0.25" />

      {/* Left tree */}
      <ellipse cx="72" cy="48" rx="20" ry="22" fill="#1DBAA5" fillOpacity="0.55" />
      <rect x="69" y="66" width="7" height="18" rx="3" fill="#0F2540" fillOpacity="0.25" />

      {/* Small left tree */}
      <ellipse cx="108" cy="57" rx="13" ry="14" fill="#1DBAA5" fillOpacity="0.40" />
      <rect x="106" y="68" width="5" height="12" rx="2" fill="#0F2540" fillOpacity="0.20" />

      {/* School building */}
      {/* Roof */}
      <polygon points="138,38 200,10 262,38" fill="#1DBAA5" />
      {/* Body */}
      <rect x="138" y="38" width="124" height="46" rx="3" fill="#0F2540" />
      {/* Windows */}
      <rect x="152" y="50" width="20" height="14" rx="2" fill="#FFB545" />
      <rect x="200" y="50" width="20" height="14" rx="2" fill="#FFB545" />
      {/* Door */}
      <rect x="189" y="64" width="18" height="20" rx="2" fill="#1DBAA5" />
      {/* Door knob */}
      <circle cx="204" cy="75" r="1.5" fill="#0F2540" fillOpacity="0.5" />
      {/* Flagpole */}
      <rect x="199" y="10" width="2" height="16" fill="#FFB545" />
      <rect x="199" y="10" width="12" height="8" rx="1" fill="#FFB545" />

      {/* Right tree */}
      <ellipse cx="277" cy="57" rx="14" ry="15" fill="#1DBAA5" fillOpacity="0.40" />
      <rect x="274" y="68" width="5" height="14" rx="2" fill="#0F2540" fillOpacity="0.20" />

      {/* Ground strip */}
      <rect x="0" y="82" width="320" height="8" rx="0" fill="#1DBAA5" fillOpacity="0.12" />
    </svg>
  );
}

/** Review flow — parent at laptop with child nearby. For use on light bg. */
export function ReviewIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Desk */}
      <rect x="50" y="72" width="180" height="8" rx="4" fill="#FFB545" fillOpacity="0.50" />
      <rect x="60" y="80" width="8" height="16" rx="3" fill="#FFB545" fillOpacity="0.35" />
      <rect x="212" y="80" width="8" height="16" rx="3" fill="#FFB545" fillOpacity="0.35" />

      {/* Laptop */}
      <rect x="115" y="48" width="60" height="38" rx="4" fill="#0F2540" fillOpacity="0.85" />
      {/* Screen */}
      <rect x="119" y="51" width="52" height="30" rx="2" fill="#1DBAA5" fillOpacity="0.70" />
      {/* Screen glow lines */}
      <rect x="123" y="55" width="30" height="2" rx="1" fill="white" fillOpacity="0.50" />
      <rect x="123" y="60" width="22" height="2" rx="1" fill="white" fillOpacity="0.35" />
      <rect x="123" y="65" width="26" height="2" rx="1" fill="white" fillOpacity="0.25" />
      {/* Laptop base hinge */}
      <rect x="110" y="72" width="70" height="5" rx="2" fill="#0F2540" fillOpacity="0.65" />

      {/* Books on desk (left) */}
      <rect x="60" y="62" width="36" height="10" rx="2" fill="#1DBAA5" fillOpacity="0.55" />
      <rect x="63" y="58" width="28" height="6" rx="2" fill="#0F2540" fillOpacity="0.40" />
      <rect x="66" y="55" width="20" height="4" rx="1" fill="#FFB545" fillOpacity="0.60" />

      {/* Desk lamp */}
      <rect x="196" y="40" width="4" height="32" rx="2" fill="#0F2540" fillOpacity="0.30" />
      <ellipse cx="198" cy="38" rx="12" ry="7" fill="#FFB545" fillOpacity="0.60" />
      <circle cx="198" cy="40" r="4" fill="#FFB545" fillOpacity="0.85" />

      {/* Parent figure (sitting) */}
      <circle cx="148" cy="30" r="13" fill="#0F2540" fillOpacity="0.80" />
      <rect x="135" y="43" width="26" height="28" rx="10" fill="#1DBAA5" fillOpacity="0.75" />

      {/* Child figure (standing right) */}
      <circle cx="220" cy="40" r="10" fill="#FFB545" fillOpacity="0.90" />
      <rect x="212" y="50" width="16" height="22" rx="8" fill="#FFB545" fillOpacity="0.75" />

      {/* Speech bubble above child */}
      <rect x="228" y="24" width="36" height="20" rx="6" fill="#1DBAA5" fillOpacity="0.20" />
      <polygon points="233,44 228,50 238,44" fill="#1DBAA5" fillOpacity="0.20" />
      <rect x="233" y="29" width="14" height="2" rx="1" fill="#1DBAA5" fillOpacity="0.45" />
      <rect x="233" y="34" width="22" height="2" rx="1" fill="#1DBAA5" fillOpacity="0.35" />
      <rect x="233" y="39" width="18" height="2" rx="1" fill="#1DBAA5" fillOpacity="0.30" />
    </svg>
  );
}
