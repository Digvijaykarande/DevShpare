import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame } from "lucide-react";
import { Badge } from "../../ui/badge";
import { cn } from "../../../utils/cn";

// Each accent drives the icon plate, the top rule and the progress fill —
// one token controls three surfaces so a card never looks mismatched.
const ACCENTS = {
  primary: {
    plate: "bg-primary text-on-primary",
    rule: "from-primary via-primary/60 to-transparent",
    ring: "text-primary",
    fill: "bg-primary",
    glow: "bg-primary/15",
  },
  secondary: {
    plate: "bg-secondary text-on-secondary",
    rule: "from-secondary via-secondary/60 to-transparent",
    ring: "text-secondary",
    fill: "bg-secondary",
    glow: "bg-secondary/15",
  },
  tertiary: {
    plate: "bg-tertiary text-on-tertiary",
    rule: "from-tertiary via-tertiary/60 to-transparent",
    ring: "text-tertiary",
    fill: "bg-tertiary",
    glow: "bg-tertiary/15",
  },
};

export default function RoadmapCard({ roadmap, index = 0 }) {
  const Icon = roadmap.icon;
  const started = roadmap.percent > 0;
  const accent = ACCENTS[roadmap.accent] ?? ACCENTS.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link to={`/roadmaps/${roadmap.slug}`} className="block group h-full">
        <div
          className={cn(
            "relative h-full flex flex-col overflow-hidden rounded-2xl border bg-surface-container-lowest transition-all duration-300",
            "shadow-[0_1px_2px_rgba(19,27,46,0.06)] group-hover:shadow-[0_18px_40px_-16px_rgba(19,27,46,0.25)]",
            started ? "border-outline-variant/50" : "border-dashed border-outline-variant/70"
          )}
        >
          {/* Top rule — the accent identity of the card */}
          <div className={cn("h-1 w-full bg-gradient-to-r", accent.rule)} aria-hidden="true" />

          {/* Corner glow, revealed on hover */}
          <div
            className={cn(
              "absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
              accent.glow
            )}
          />

          <div className="relative z-10 flex flex-col flex-1 p-lg">
            {/* Icon plate + level */}
            <div className="flex items-start justify-between gap-3">
              <motion.div
                whileHover={{ scale: 1.06, rotate: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-sm", accent.plate)}
              >
                <Icon className="w-6 h-6" strokeWidth={2} />
              </motion.div>
              <Badge variant="neutral" className="rounded-full px-2.5 py-1">
                {roadmap.level}
              </Badge>
            </div>

            {/* Title & tagline */}
            <div className="mt-md flex-1">
              <h3 className="font-display text-lg font-bold text-on-surface tracking-tight leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {roadmap.title}
              </h3>
              <p className="text-sm text-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">
                {roadmap.tagline}
              </p>
            </div>

            {/* Progress */}
            <div className="mt-lg">
              <div className="flex items-end justify-between mb-1.5">
                <span className="flex items-center gap-1 text-xs font-medium text-on-surface-variant">
                  {started && <Flame className={cn("w-3.5 h-3.5", accent.ring)} />}
                  {roadmap.topicsDone}/{roadmap.topicsTotal} topics
                </span>
                <span className={cn("font-display text-xl font-extrabold leading-none", accent.ring)}>
                  {roadmap.percent}
                  <span className="text-xs font-semibold align-top ml-0.5">%</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${roadmap.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 + index * 0.05 }}
                  className={cn("h-full rounded-full", accent.fill)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-lg pt-md border-t border-outline-variant/50 flex items-center justify-between">
              <span className="text-xs font-medium text-on-surface-variant/80">{roadmap.estimate}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-bold rounded-full pl-3 pr-2 py-1.5 transition-all",
                  "bg-surface-container-low text-on-surface group-hover:pr-1.5",
                  started ? "" : ""
                )}
              >
                {started ? "Continue" : "Start roadmap"}
                <span className={cn("w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:rotate-45", accent.plate)}>
                  <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
