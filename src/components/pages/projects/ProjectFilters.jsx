import { LayoutGrid, List, Search, X } from "lucide-react";
import { cn } from "../../../utils/cn";
import { TECH_STACK_OPTIONS, DIFFICULTY_OPTIONS, STAGE_OPTIONS, ROLE_OPTIONS } from "../../../pages/projects/data/projectsData";

const SELECT_CLASS =
  "px-sm py-sm bg-surface-container-low rounded-lg text-sm text-on-surface cursor-pointer focus:outline-none focus:bg-surface-container-lowest transition-colors";

function FilterSelect({ label, value, options, onChange }) {
  return (
    <select className={SELECT_CLASS} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{label}: All</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function ProjectFilters({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onClearAll,
  filteredCount,
  totalCount,
  view,
  onViewChange,
}) {
  const activeChips = [
    ...(search ? [{ key: "search", label: `"${search}"`, clear: () => onSearchChange("") }] : []),
    ...Object.entries(filters)
      .filter(([, v]) => v)
      .map(([key, v]) => ({ key, label: v, clear: () => onFilterChange(key, "") })),
  ];

  return (
    <div className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex flex-col gap-md">
      <div className="flex flex-col lg:flex-row gap-sm items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-outline pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by name, tech stack, or open role..."
            className="w-full pl-10 pr-md py-sm bg-surface-container-low rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-xs">
          <FilterSelect
            label="Tech Stack"
            value={filters.tech}
            options={TECH_STACK_OPTIONS}
            onChange={(v) => onFilterChange("tech", v)}
          />
          <FilterSelect
            label="Difficulty"
            value={filters.difficulty}
            options={DIFFICULTY_OPTIONS}
            onChange={(v) => onFilterChange("difficulty", v)}
          />
          <FilterSelect
            label="Stage"
            value={filters.stage}
            options={STAGE_OPTIONS}
            onChange={(v) => onFilterChange("stage", v)}
          />
          <FilterSelect
            label="Open Role"
            value={filters.role}
            options={ROLE_OPTIONS}
            onChange={(v) => onFilterChange("role", v)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-sm pt-xs">
        <div className="flex flex-wrap items-center gap-xs">
          {activeChips.length > 0 ? (
            <>
              <span className="text-on-surface-variant text-xs">Active filters:</span>
              {activeChips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1 px-xs py-0.5 rounded bg-surface-container-high text-on-surface text-xs"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    onClick={chip.clear}
                    aria-label={`Remove filter ${chip.label}`}
                    className="hover:text-error transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={onClearAll}
                className="text-primary text-xs font-semibold hover:underline ml-xs"
              >
                Clear all
              </button>
            </>
          ) : (
            <span className="text-on-surface-variant text-xs">No filters applied</span>
          )}
        </div>

        <div className="flex items-center gap-sm text-on-surface-variant font-code text-xs">
          <span>
            Showing {filteredCount} of {totalCount} active repositories
          </span>
          <div className="flex items-center bg-surface-container-low rounded p-0.5">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={cn(
                "px-1.5 py-1 rounded transition-colors",
                view === "grid" ? "bg-surface-container-lowest text-on-surface shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={cn(
                "px-1.5 py-1 rounded transition-colors",
                view === "list" ? "bg-surface-container-lowest text-on-surface shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
