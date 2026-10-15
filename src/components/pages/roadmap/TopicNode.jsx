import { ArrowRight, Check, Lock } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Badge } from "../../ui/badge";

function TrackMarker({ status }) {
  if (status === "mastered" || status === "completed") {
    return (
      <span className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-success text-white flex items-center justify-center ring-4 ring-surface">
        <Check className="w-2.5 h-2.5" strokeWidth={4} />
      </span>
    );
  }
  if (status === "locked") {
    return (
      <span className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center ring-4 ring-surface">
        <Lock className="w-2 h-2 text-outline" />
      </span>
    );
  }
  return (
    <span className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center ring-4 ring-surface">
      <span className="w-1.5 h-1.5 rounded-full bg-outline" />
    </span>
  );
}

export default function TopicNode({ topic, isSelected, onSelect }) {
  const Icon = topic.icon;
  const locked = topic.status === "locked";
  const done = topic.status === "mastered" || topic.status === "completed";

  return (
    <div
      role={locked ? undefined : "button"}
      tabIndex={locked ? -1 : 0}
      aria-current={isSelected ? "true" : undefined}
      aria-disabled={locked || undefined}
      onClick={() => !locked && onSelect?.(topic)}
      onKeyDown={(e) => {
        if (locked) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(topic);
        }
      }}
      className={cn(
        "group relative flex items-center justify-between gap-3 p-md rounded-2xl border transition-all",
        locked
          ? "bg-surface-container-low border-transparent opacity-60 cursor-not-allowed"
          : "bg-surface-container-lowest border-outline-variant/50 hover:border-primary/40 hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isSelected && !locked && "border-primary shadow-md ring-1 ring-primary/20"
      )}
    >
      <TrackMarker status={topic.status} />

      <div className="flex items-center gap-md min-w-0">
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            locked ? "bg-surface-container text-outline" : "bg-surface-container-low text-on-surface-variant"
          )}
        >
          <Icon className="w-4.5 h-4.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-xs">
            <span className="text-[13px] font-semibold text-on-surface truncate">{topic.title}</span>
            {topic.status === "next" ? (
              <Badge variant="neutral" className="rounded-full">Next up</Badge>
            ) : locked ? (
              <Badge variant="muted" className="rounded-full">Locked</Badge>
            ) : (
              <Badge variant="code">{topic.code}</Badge>
            )}
          </div>
          <span className="text-xs text-on-surface-variant truncate">{topic.description}</span>
        </div>
      </div>

      <div className="flex items-center gap-sm shrink-0">
        {locked ? (
          <Lock className="w-4 h-4 text-outline" />
        ) : (
          <>
            {topic.statusLabel && (
              <span
                className={cn(
                  "text-xs font-medium hidden sm:inline",
                  done ? "text-success" : "text-on-surface-variant"
                )}
              >
                {topic.statusLabel}
              </span>
            )}
            <span className="w-7 h-7 rounded-full flex items-center justify-center bg-surface-container-low group-hover:bg-primary group-hover:text-on-primary text-outline transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
