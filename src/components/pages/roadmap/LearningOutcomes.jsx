import { Checkbox } from "../../ui/checkbox";
import { cn } from "../../../utils/cn";

export default function LearningOutcomes({ outcomes, onToggle }) {
  const done = outcomes.filter((o) => o.done).length;

  return (
    <section className="flex flex-col gap-sm mt-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold text-on-surface">Key learning outcomes</h4>
        <span className="font-code text-xs font-bold text-primary" aria-live="polite">
          {done} of {outcomes.length} done
        </span>
      </div>

      <ul className="flex flex-col gap-0.5">
        {outcomes.map((outcome) => (
          <li
            key={outcome.id}
            onClick={() => onToggle(outcome.id)}
            className="group flex items-start gap-sm p-sm rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            {/* The checkbox stays the real control (focusable, keyboard-operable);
                the row is just a bigger hit area, so its click must not double-toggle. */}
            <span className="mt-0.5" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={outcome.done}
                onCheckedChange={() => onToggle(outcome.id)}
                aria-label={outcome.label}
              />
            </span>
            <span
              className={cn(
                "text-sm transition-colors",
                outcome.done ? "text-on-surface" : "text-on-surface-variant group-hover:text-on-surface"
              )}
            >
              {outcome.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
