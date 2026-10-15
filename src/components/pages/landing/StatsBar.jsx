const STATS = [
  { value: "10K+", label: "Active developers" },
  { value: "50K+", label: "Questions solved" },
  { value: "1K+", label: "Projects built" },
  { value: "500+", label: "Verified mentors" },
  { value: "100+", label: "Events & hackathons" },
];

export default function StatsBar() {
  return (
    <div className="max-w-[64rem] mx-auto px-6 -mt-4 mb-14">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 rounded-xl bg-surface border border-outline-variant shadow-sm text-center">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="font-display text-2xl font-bold text-primary">{s.value}</span>
            <span className="text-xs text-on-surface-variant mt-1">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
