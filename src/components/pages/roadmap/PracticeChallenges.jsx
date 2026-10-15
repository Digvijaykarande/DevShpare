import { Terminal } from "lucide-react";
import { Badge } from "../../ui/badge";

const DIFFICULTY_VARIANT = {
  Easy: "success",
  Medium: "warning",
  Hard: "critical",
};

export default function PracticeChallenges({ challenges, onOpen }) {
  return (
    <section className="flex flex-col gap-sm mt-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold text-on-surface">Practice challenges</h4>
        <span className="text-xs font-medium text-secondary">Opens the coding workspace</span>
      </div>

      <ul className="flex flex-col gap-0.5">
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <button
              type="button"
              onClick={() => onOpen?.(challenge)}
              className="w-full flex items-center justify-between gap-3 p-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex items-center gap-sm min-w-0">
                <Terminal className="w-5 h-5 text-secondary shrink-0" />
                <span className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors truncate">
                    {challenge.title}
                  </span>
                  <span className="text-xs text-on-surface-variant truncate">
                    {challenge.description}
                  </span>
                </span>
              </span>
              <Badge variant={DIFFICULTY_VARIANT[challenge.difficulty] ?? "neutral"} className="shrink-0">
                {challenge.difficulty}
              </Badge>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
