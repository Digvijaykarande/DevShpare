import { cn } from "../../../utils/cn";

export default function CategoryTile({ category, active, onClick }) {
  const Icon = category.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors",
        active
          ? "border-primary bg-primary/5"
          : "border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low"
      )}
    >
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg", category.tint)}>
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-on-surface">{category.label}</span>
        {category.sub && <span className="block text-xs text-on-surface-variant">{category.sub}</span>}
      </span>
    </button>
  );
}
