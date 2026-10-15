import { cn } from "../../../utils/cn";

export default function StageConnector({ label, unlocked = false }) {
  return (
    <div className="flex items-center gap-md pl-11">
      <span
        aria-hidden="true"
        className={cn(
          "w-1 h-6 rounded-full",
          unlocked ? "bg-gradient-to-b from-success to-primary/60" : "bg-surface-container-high"
        )}
      />
      <span
        className={cn(
          "font-code text-[11px] tracking-wide",
          unlocked ? "text-on-surface-variant" : "text-outline"
        )}
      >
        {label}
      </span>
    </div>
  );
}
