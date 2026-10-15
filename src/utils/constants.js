// Shared, presentation-only lookups for the coding workspace so every
// component (problem header, list drawer, cards) colors difficulty and
// status the same way LeetCode does.

export const DIFFICULTY_STYLES = {
  Easy: { badge: "success", dot: "bg-success", text: "text-success" },
  Medium: { badge: "warning", dot: "bg-warning", text: "text-warning" },
  Hard: { badge: "critical", dot: "bg-critical", text: "text-critical" },
};

export function getDifficultyStyle(difficulty) {
  return DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.Medium;
}

export const STATUS_META = {
  solved: { label: "Solved", className: "text-success" },
  attempted: { label: "Attempted", className: "text-warning" },
  todo: { label: "Todo", className: "text-outline" },
};

export function getStatusMeta(status) {
  return STATUS_META[status] ?? STATUS_META.todo;
}
