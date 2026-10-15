import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const ACCENTS = [
  { plate: "bg-primary text-on-primary", ring: "hover:border-primary/40" },
  { plate: "bg-secondary text-on-secondary", ring: "hover:border-secondary/40" },
  { plate: "bg-tertiary text-on-tertiary", ring: "hover:border-tertiary/40" },
];

export default function CategoryTiles({ categories, counts, active, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-sm">
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        const accent = ACCENTS[i % ACCENTS.length];
        const isActive = active === cat.id;
        return (
          <motion.button
            key={cat.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            onClick={() => onSelect(isActive ? "" : cat.id)}
            className={cn(
              "flex flex-col items-start gap-sm p-md rounded-2xl border bg-surface-container-lowest text-left transition-colors",
              isActive ? "border-primary shadow-md" : cn("border-outline-variant/50 shadow-sm", accent.ring)
            )}
          >
            <span className={cn("w-9 h-9 rounded-lg flex items-center justify-center", accent.plate)}>
              <Icon className="w-4.5 h-4.5" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-on-surface truncate">{cat.label}</div>
              <div className="text-xs text-on-surface-variant mt-0.5">{counts[cat.id] ?? 0} resources</div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
