import { Tag } from "lucide-react";

export default function PopularTagsWidget({ tags, activeTag, onSelect, onViewAll }) {
  return (
    <section className="p-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <Tag className="w-5 h-5 text-primary" />
          <h3 className="font-display text-base font-semibold text-on-surface">Popular Tags</h3>
        </div>
        <button type="button" onClick={onViewAll} className="text-xs text-primary hover:underline font-semibold">
          View all
        </button>
      </div>

      <div className="flex flex-col gap-xs">
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            onClick={() => onSelect(tag)}
            className={`flex items-center justify-between p-xs rounded-lg hover:bg-surface-container transition-colors text-left ${
              activeTag?.toLowerCase() === tag ? "bg-surface-container" : ""
            }`}
          >
            <span className="flex items-center gap-xs text-sm text-on-surface">
              <span className="font-code text-outline">#</span>
              <span className="font-medium">{tag}</span>
            </span>
            <span className="font-code text-xs text-on-surface-variant">{count} questions</span>
          </button>
        ))}
      </div>
    </section>
  );
}
