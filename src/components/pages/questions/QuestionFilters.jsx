import { useEffect, useRef } from "react";
import { Bookmark, BadgeCheck, Flame, Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { FEED_TABS, CATEGORIES } from "../../../pages/questions/data/questionsData";
import CategoryPills from "./CategoryPills";

const TAB_ICONS = {
  trending: <Flame className="w-3.5 h-3.5" />,
  solved: <BadgeCheck className="w-3.5 h-3.5 text-secondary" />,
  bookmarks: <Bookmark className="w-3.5 h-3.5" />,
};

export default function QuestionFilters({
  search,
  onSearchChange,
  tab,
  onTabChange,
  category,
  onCategoryChange,
}) {
  const inputRef = useRef(null);

  // Alt + S focuses the search box (matches the hint shown in the input)
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.code === "KeyS") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="flex flex-col gap-base">
      <div className="flex flex-col lg:flex-row gap-base items-stretch lg:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-outline pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions, tags, or topics (e.g. 'tokio', 'nextjs 15')..."
            className="w-full h-10 pl-11 pr-24 bg-surface-container-lowest rounded-lg text-sm text-on-surface placeholder:text-outline shadow-sm outline-none focus:ring-2 focus:ring-primary-container/25 transition-shadow"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-sm top-1/2 -translate-y-1/2 p-1 rounded text-on-surface-variant hover:bg-surface-container"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="absolute right-sm top-1/2 -translate-y-1/2 flex items-center gap-1 text-on-surface-variant font-code text-[11px] px-xs py-0.5 rounded bg-surface-container">
              Alt + S
            </kbd>
          )}
        </div>

        <Tabs value={tab} onValueChange={onTabChange}>
          <TabsList className="bg-surface-container-lowest shadow-sm border-transparent">
            {FEED_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-[13px] px-md">
                {TAB_ICONS[t.value]}
                <span className={t.value === "bookmarks" ? "hidden sm:inline" : ""}>{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <CategoryPills categories={Object.keys(CATEGORIES)} active={category} onSelect={onCategoryChange} />
    </section>
  );
}
