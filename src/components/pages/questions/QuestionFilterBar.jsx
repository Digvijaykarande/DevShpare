import { motion } from "framer-motion";
import { Bookmark, Flame, Search, ShieldCheck } from "lucide-react";
import { cn } from "../../../utils/cn";
import { CATEGORIES, VIEWS } from "../../../pages/questions/data/questionsData";

const VIEW_ICONS = { trending: Flame, solved: ShieldCheck, bookmarks: Bookmark };

export default function QuestionFilterBar({
  search,
  onSearchChange,
  view,
  onViewChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-col gap-space-base">
      <div className="flex flex-col lg:flex-row gap-sm items-stretch lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-outline pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions, tags, or topics (e.g. 'tokio', 'nextjs 15')..."
            className="w-full pl-11 pr-20 py-sm bg-surface-container-lowest rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none shadow-sm transition-colors"
          />
          <div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-on-surface-variant font-code text-[11px] px-1.5 py-0.5 rounded bg-surface-container">
            <span>Alt</span>
            <span>+</span>
            <span>S</span>
          </div>
        </div>

        {/* View tabs */}
        <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg shadow-sm overflow-x-auto">
          {VIEWS.map((v) => {
            const Icon = VIEW_ICONS[v.id];
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onViewChange(v.id)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1",
                  isActive ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="question-view-pill"
                    className="absolute inset-0 bg-primary rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {Icon && (
                  <Icon className={cn("relative z-10 w-3.5 h-3.5", v.id === "solved" && !isActive && "text-secondary")} />
                )}
                <span className="relative z-10">{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category pill strip */}
      <div className="flex items-center gap-xs overflow-x-auto pb-1">
        <span className="text-on-surface-variant text-xs uppercase tracking-wider mr-1 shrink-0">Filter:</span>
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0",
            category === "" ? "bg-inverse-surface text-inverse-on-surface" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container shadow-sm"
          )}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCategoryChange(category === c.id ? "" : c.id)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0",
              category === c.id ? "bg-inverse-surface text-inverse-on-surface" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container shadow-sm"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
