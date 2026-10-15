import { Search, X } from "lucide-react";
import { EXPERTISE_OPTIONS, AVAILABILITY_OPTIONS, SORT_OPTIONS } from "../../../pages/mentorship/data/mentorshipData";

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

export default function MentorFilters({
  search,
  onSearchChange,
  expertise,
  onExpertiseChange,
  availability,
  onAvailabilityChange,
  sortBy,
  onSortChange,
  filteredCount,
  totalCount,
}) {
  const hasFilters = search || expertise || availability;

  return (
    <div className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex flex-col gap-sm">
      <div className="flex flex-col lg:flex-row gap-sm items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-outline pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mentors by name, company, or skill..."
            className="w-full pl-10 pr-md py-sm bg-surface-container-low rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors"
          />
        </div>

        <div className="grid grid-cols-3 gap-xs">
          <FilterSelect
            label="Expertise"
            value={expertise}
            options={EXPERTISE_OPTIONS}
            onChange={onExpertiseChange}
          />
          <FilterSelect
            label="Availability"
            value={availability}
            options={AVAILABILITY_OPTIONS}
            onChange={onAvailabilityChange}
          />
          <select className={SELECT_CLASS} value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
        <span>
          Showing {filteredCount} of {totalCount} mentors
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onExpertiseChange("");
              onAvailabilityChange("");
            }}
            className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
