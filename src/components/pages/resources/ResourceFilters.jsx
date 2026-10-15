import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { cn } from "../../../utils/cn";
import { CATEGORIES } from "../../../pages/resources/data/resourcesData";

export default function ResourceFilters({ active, onChange, filteredCount, totalCount }) {
  const pills = [{ id: "", label: "All resources", icon: LayoutGrid }, ...CATEGORIES];

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-wrap gap-xs">
        {pills.map((pill) => {
          const Icon = pill.icon;
          const isActive = active === pill.id;
          return (
            <button
              key={pill.id || "all"}
              type="button"
              onClick={() => onChange(pill.id)}
              className={cn(
                "relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors",
                isActive ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="resource-filter-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 bg-surface-container-lowest border border-outline-variant/60 rounded-full" />
              )}
              <Icon className="relative z-10 w-3.5 h-3.5" />
              <span className="relative z-10">{pill.label}</span>
            </button>
          );
        })}
      </div>
      <span className="text-xs text-on-surface-variant">
        Showing {filteredCount} of {totalCount} resources
      </span>
    </div>
  );
}