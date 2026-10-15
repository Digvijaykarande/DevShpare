import { FileText, BookOpen, Lightbulb, History } from "lucide-react";
import { cn } from "../../../utils/cn";

const TABS = [
  { id: "description", label: "Description", icon: FileText },
  { id: "editorial", label: "Editorial", icon: BookOpen, badge: "VIDEO" },
  { id: "solutions", label: "Solutions", icon: Lightbulb, count: "1.4k" },
  { id: "submissions", label: "Submissions", icon: History },
];

export default function ProblemTabs({ active, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-surface-container-low/70 px-3 pt-2 border-b border-outline-variant/60 overflow-x-auto">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold text-xs rounded-t-md -mb-px whitespace-nowrap transition-colors",
              isActive
                ? "border-primary-container bg-surface-container-lowest text-primary-container"
                : "border-transparent text-on-surface-variant hover:text-on-surface font-medium"
            )}
          >
            <Icon className={cn("w-4 h-4", isActive ? "text-primary-container" : "text-outline")} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="bg-primary-container/10 text-primary-container text-[10px] px-1 rounded font-semibold">
                {tab.badge}
              </span>
            )}
            {tab.count && <span className="text-outline text-xs">{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
