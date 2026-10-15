import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

/** Horizontal filter strip: All / Architecture / Frontend ... with a sliding active pill. */
export default function CategoryPills({ categories, active, onSelect }) {
  return (
    <div className="flex items-center gap-xs overflow-x-auto pb-1">
      <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mr-1 shrink-0">
        Filter:
      </span>
      {categories.map((name) => {
        const isActive = active === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(name)}
            className={cn(
              "relative shrink-0 rounded-full px-md py-1 text-xs font-semibold whitespace-nowrap transition-colors",
              isActive
                ? "text-inverse-on-surface"
                : "bg-surface-container-lowest text-on-surface-variant shadow-sm hover:bg-surface-container"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-inverse-surface"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
