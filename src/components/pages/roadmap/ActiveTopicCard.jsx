import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";

function PulseMarker() {
  const reduceMotion = useReducedMotion();
  return (
    <span className="absolute -left-[32px] top-1/2 -translate-y-1/2 flex items-center justify-center">
      {!reduceMotion && (
        <motion.span
          className="absolute w-6 h-6 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative w-4 h-4 rounded-full bg-primary ring-4 ring-surface" />
    </span>
  );
}

export default function ActiveTopicCard({ topic, progress, isSelected, onSelect, onContinue }) {
  const Icon = topic.icon;
  // `progress` (live, from the inspector checklist) wins over the seeded value.
  const percent = progress ?? topic.progress ?? 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(topic)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(topic);
        }
      }}
      className={cn(
        "relative p-lg rounded-2xl bg-surface-container-lowest border-2 shadow-[0_8px_24px_-12px_rgba(42,20,180,0.18)] cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isSelected ? "border-primary" : "border-primary/25 hover:border-primary/45"
      )}
    >
      <PulseMarker />

      <div className="flex flex-col gap-md">
        <div className="flex flex-wrap items-start justify-between gap-sm">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-xs">
                <Badge variant="solid" className="rounded-full">Current focus</Badge>
                <Badge variant="warning" className="rounded-full">{topic.level}</Badge>
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mt-1.5 tracking-tight">
                {topic.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="font-display text-xl font-extrabold text-primary leading-none">{percent}%</span>
            <span className="text-xs text-on-surface-variant mt-1">
              {topic.subtopicsDone}/{topic.subtopicsTotal} subtopics
            </span>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant">{topic.description}</p>

        <Progress value={percent} indicatorClassName="bg-primary" />

        <div className="flex items-center justify-between gap-sm pt-xs">
          <span className="text-xs text-on-surface-variant inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-secondary" />
            {topic.timeLeft}
          </span>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContinue?.(topic);
            }}
          >
            Continue learning
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
