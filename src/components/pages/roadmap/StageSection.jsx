import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Badge } from "../../ui/badge";
import TopicNode from "./TopicNode";
import ActiveTopicCard from "./ActiveTopicCard";

const STAGE_STYLES = {
  complete: {
    mark: "bg-success text-white",
    eyebrow: "text-success",
    badge: "success",
    track: "bg-success/30",
    shell: "bg-surface-container-lowest border-outline-variant/50",
  },
  active: {
    mark: "bg-primary text-on-primary shadow-md shadow-primary/20",
    eyebrow: "text-primary",
    badge: "default",
    track: "bg-gradient-to-b from-primary via-primary/40 to-surface-container-high",
    shell: "bg-primary/5 border-primary/20",
  },
  locked: {
    mark: "bg-surface-container-high text-outline",
    eyebrow: "text-outline",
    badge: "neutral",
    track: "bg-surface-container-high",
    shell: "bg-surface-container-low border-transparent",
  },
};

function StageHeader({ stage, style }) {
  const eyebrow =
    stage.status === "active"
      ? "Current stage"
      : stage.status === "locked"
      ? "Locked stage"
      : `Stage ${stage.index}`;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 p-md rounded-2xl border mb-md",
        style.shell
      )}
    >
      <div className="flex items-center gap-md min-w-0">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center font-code text-sm font-bold shrink-0",
            style.mark
          )}
        >
          {stage.status === "complete" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : stage.status === "locked" ? (
            <Lock className="w-5 h-5" />
          ) : (
            stage.index
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-xs flex-wrap">
            <span className={cn("font-code text-xs font-semibold", style.eyebrow)}>{eyebrow}</span>
            <Badge variant={style.badge} className="rounded-full">{stage.completionLabel}</Badge>
          </div>
          <h2 className="font-display text-base font-bold text-on-surface truncate">
            {stage.title}
          </h2>
        </div>
      </div>
      <span className="text-xs text-on-surface-variant shrink-0 hidden sm:block">{stage.meta}</span>
    </div>
  );
}

export default function StageSection({ stage, selectedTopicId, liveProgress, onSelectTopic, onContinue }) {
  const style = STAGE_STYLES[stage.status] ?? STAGE_STYLES.locked;
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={cn("flex flex-col", stage.status === "locked" && "opacity-75")}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <StageHeader stage={stage} style={style} />

      <div className="relative pl-6 ml-5 flex flex-col gap-sm">
        <span className={cn("absolute left-0 top-2 bottom-0 w-0.5 rounded-full", style.track)} aria-hidden="true" />

        {stage.topics.map((topic) =>
          topic.status === "active" ? (
            <ActiveTopicCard
              key={topic.id}
              topic={topic}
              progress={liveProgress}
              isSelected={selectedTopicId === topic.id}
              onSelect={onSelectTopic}
              onContinue={onContinue}
            />
          ) : (
            <TopicNode
              key={topic.id}
              topic={topic}
              isSelected={selectedTopicId === topic.id}
              onSelect={onSelectTopic}
            />
          )
        )}
      </div>
    </motion.section>
  );
}
