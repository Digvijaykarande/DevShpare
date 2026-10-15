import { motion } from "framer-motion";
import { MousePointerClick, ListChecks, BadgeCheck } from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick a path",
    text: "Click any card below — each one is a full subject broken into a clear, staged plan.",
  },
  {
    icon: ListChecks,
    title: "Follow the stages",
    text: "Work through topics in order. Each stage unlocks the next once you're ready.",
  },
  {
    icon: BadgeCheck,
    title: "Practice & get verified",
    text: "Solve real challenges tied to each topic, then mark outcomes off as you master them.",
  },
];

export default function RoadmapExplainer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-xl">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 + i * 0.08 }}
            className="relative flex flex-col gap-sm p-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/50"
          >
            <div className="flex items-center gap-sm">
              <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <Icon className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-on-surface">{step.title}</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{step.text}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
