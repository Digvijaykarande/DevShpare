import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, Percent, Send } from "lucide-react";
import { cn } from "../../../utils/cn";

const DIFFICULTY = [
  { key: "Easy", bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-300" },
  { key: "Medium", bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-300" },
  { key: "Hard", bar: "bg-rose-500", text: "text-rose-600 dark:text-rose-300" },
];

function Ring({ solved, total }) {
  const size = 96;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = total ? solved / total : 0;

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-surface-container-high" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-primary-container"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold leading-none text-on-surface">{solved}</span>
        <span className="text-[10px] text-on-surface-variant">of {total}</span>
      </div>
    </div>
  );
}

/** `coding` comes from GET /me/overview -> { solved, attempted, totalProblems, byDifficulty, submissions, acceptanceRate, streak, languages, recentSolved }. */
export default function CodingStatsCard({ coding }) {
  if (!coding || coding.submissions === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <p className="text-sm text-on-surface-variant">
          No submissions yet. Solve your first problem and your coding stats will show up here.
        </p>
        <Link to="/coding" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          Open the coding workspace <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const quick = [
    { icon: Send, label: "Submissions", value: coding.submissions },
    { icon: Percent, label: "Acceptance", value: `${coding.acceptanceRate}%` },
    { icon: Flame, label: "Day streak", value: coding.streak },
    { icon: CheckCircle2, label: "Attempted", value: coding.attempted },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Ring solved={coding.solved} total={coding.totalProblems} />

        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {DIFFICULTY.map((d) => {
            const row = coding.byDifficulty?.[d.key] ?? { solved: 0, total: 0 };
            const pct = row.total ? (row.solved / row.total) * 100 : 0;
            return (
              <div key={d.key}>
                <div className="mb-1 flex justify-between text-[11px] font-medium">
                  <span className={d.text}>{d.key}</span>
                  <span className="text-on-surface-variant">{row.solved} / {row.total}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
                  <motion.div
                    className={cn("h-full rounded-full", d.bar)}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {quick.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border border-outline-variant/40 bg-surface-container-low/60 px-3 py-2.5">
            <Icon className="mb-1 h-3.5 w-3.5 text-primary" />
            <p className="font-display text-lg font-bold leading-none text-on-surface tabular-nums">{value}</p>
            <p className="mt-0.5 text-[11px] text-on-surface-variant">{label}</p>
          </div>
        ))}
      </div>

      {coding.languages?.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-outline">Languages</span>
          {coding.languages.map((l) => (
            <span key={l.name} className="rounded-md bg-surface-container px-2 py-0.5 text-[11px] font-medium text-on-surface-variant">
              {l.name} · {l.count}
            </span>
          ))}
        </div>
      )}

      {coding.recentSolved?.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-outline">Recently solved</p>
          <ul className="flex flex-col">
            {coding.recentSolved.map((p) => {
              const tone = DIFFICULTY.find((d) => d.key === p.difficulty);
              return (
                <li key={p.slug}>
                  <Link
                    to={`/coding/${p.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-container-low"
                  >
                    <span className="min-w-0 truncate text-[13px] font-medium text-on-surface">{p.title}</span>
                    <span className="flex shrink-0 items-center gap-2 text-[11px]">
                      <span className={tone?.text}>{p.difficulty}</span>
                      <span className="text-outline">{p.time}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}