import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, CheckCircle2, Circle, Dot } from "lucide-react";
import { cn } from "../../../utils/cn";
import { getDifficultyStyle } from "../../../utils/constants";

const FILTERS = ["All", "Easy", "Medium", "Hard"];

function StatusIcon({ status }) {
  if (status === "solved") return <CheckCircle2 className="w-4 h-4 text-success shrink-0" />;
  if (status === "attempted") return <Dot className="w-5 h-5 text-warning shrink-0 -mx-0.5" />;
  return <Circle className="w-3.5 h-3.5 text-outline-variant shrink-0" />;
}

export default function ProblemListDrawer({ open, onClose, problems, activeSlug, onSelect }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesFilter = filter === "All" || p.difficulty === filter;
      const matchesQuery =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        String(p.number).includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesFilter && matchesQuery;
    });
  }, [problems, query, filter]);

  const solvedCount = problems.filter((p) => p.status === "solved").length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-md bg-surface-container-lowest border-r border-outline-variant/60 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between gap-md p-md border-b border-outline-variant/60">
              <div>
                <h2 className="text-sm font-semibold text-on-surface">Problem List</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {solvedCount}/{problems.length} solved
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-md hover:bg-surface-container-high transition-colors"
                aria-label="Close problem list"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-md pb-2 space-y-2.5 border-b border-outline-variant/60">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-outline absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, number or tag..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/60 text-xs text-on-surface placeholder:text-outline outline-none focus:border-primary-container transition-colors"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {FILTERS.map((f) => {
                  const style = f === "All" ? null : getDifficultyStyle(f);
                  const isActive = f === filter;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5",
                        isActive
                          ? "bg-surface-container-low border border-outline-variant/60 text-on-surface"
                          : "text-on-surface-variant hover:bg-surface-container-low font-medium"
                      )}
                    >
                      {style && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-on-surface-variant text-center py-lg px-md">
                  No problems match "{query}".
                </p>
              ) : (
                filtered.map((p) => {
                  const style = getDifficultyStyle(p.difficulty);
                  const isActive = p.slug === activeSlug;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => onSelect(p.slug)}
                      className={cn(
                        "w-full flex items-center gap-3 px-md py-2.5 text-left border-b border-outline-variant/40 transition-colors",
                        isActive ? "bg-primary-container/10" : "hover:bg-surface-container-low"
                      )}
                    >
                      <StatusIcon status={p.status} />
                      <span
                        className={cn(
                          "flex-1 min-w-0 truncate text-xs font-medium",
                          isActive ? "text-primary-container font-semibold" : "text-on-surface"
                        )}
                      >
                        {p.number}. {p.title}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-medium shrink-0">{p.acceptance}</span>
                      <span className={cn("text-xs font-semibold w-12 text-right shrink-0", style.text)}>
                        {p.difficulty}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
