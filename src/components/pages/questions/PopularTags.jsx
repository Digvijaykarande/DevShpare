import { cn } from "../../../utils/cn";

export default function PopularTags({ tags, activeTag, onSelect }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1">
      {tags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onSelect(isActive ? "" : tag)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors border",
              isActive
                ? "bg-primary-container text-on-primary border-transparent"
                : "bg-surface-container-lowest text-on-surface-variant border-outline-variant/60 hover:bg-surface-container-low"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
