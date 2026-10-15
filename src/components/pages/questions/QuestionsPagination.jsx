import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../../utils/cn";

function pageList(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

export default function QuestionsPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = pageList(page, totalPages);

  return (
    <div className="flex items-center justify-between pt-md">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-base py-sm rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-medium text-sm transition-colors flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-1 text-sm">
        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const showEllipsis = prev !== undefined && p - prev > 1;
          return (
            <span key={p} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-outline">...</span>}
              <button
                type="button"
                onClick={() => onChange(p)}
                className={cn(
                  "w-8 h-8 rounded-lg transition-colors",
                  p === page ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:bg-surface-container"
                )}
              >
                {p}
              </button>
            </span>
          );
        })}
      </div>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-base py-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-medium text-sm transition-colors flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none"
      >
        Next
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
