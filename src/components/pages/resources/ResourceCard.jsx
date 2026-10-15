import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../../ui/badge";
import { cn } from "../../../utils/cn";

const ACCENTS = {
  primary: { plate: "bg-primary text-on-primary", rule: "from-primary via-primary/60 to-transparent", ring: "text-primary", glow: "bg-primary/15" },
  secondary: { plate: "bg-secondary text-on-secondary", rule: "from-secondary via-secondary/60 to-transparent", ring: "text-secondary", glow: "bg-secondary/15" },
  tertiary: { plate: "bg-tertiary text-on-tertiary", rule: "from-tertiary via-tertiary/60 to-transparent", ring: "text-tertiary", glow: "bg-tertiary/15" },
};

export default function ResourceCard({ resource, index = 0, onOpen }) {
  const Icon = resource.icon;
  const accent = ACCENTS[resource.accent] ?? ACCENTS.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: (index % 9) * 0.05 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <button
        type="button"
        onClick={() => onOpen(resource)}
        className="relative w-full h-full text-left flex flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_1px_2px_rgba(19,27,46,0.06)] hover:shadow-[0_18px_40px_-16px_rgba(19,27,46,0.25)] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className={cn("h-1 w-full bg-gradient-to-r", accent.rule)} aria-hidden="true" />
        <div className={cn("absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", accent.glow)} />

        <div className="relative z-10 flex flex-col flex-1 p-lg">
          <div className="flex items-start justify-between gap-3">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className={cn("w-11 h-11 rounded-xl flex items-center justify-center shadow-sm", accent.plate)}
            >
              {Icon && <Icon className="w-5.5 h-5.5" strokeWidth={2} />}
            </motion.div>
            <Badge variant="neutral" className="rounded-full shrink-0">{resource.type}</Badge>
          </div>

          <div className="mt-md flex-1">
            <h3 className="font-display text-base font-bold text-on-surface tracking-tight leading-snug group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">{resource.provider}</p>
            <p className="text-sm text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
              {resource.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-md">
            {(resource.tags || []).slice(0, 2).map((tag) => (
              <Badge key={tag} variant="code">{tag}</Badge>
            ))}
            {!resource.free && <Badge variant="warning" className="rounded-full">Paid</Badge>}
          </div>

          <div className="mt-lg pt-md border-t border-outline-variant/50 flex items-center justify-between">
            <span className={cn("text-xs font-semibold", accent.ring)}>{resource.free ? "Free" : "Paid resource"}</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold rounded-full pl-3 pr-1.5 py-1.5 bg-surface-container-low text-on-surface transition-all">
              View
              <span className={cn("w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:rotate-45", accent.plate)}>
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
              </span>
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}