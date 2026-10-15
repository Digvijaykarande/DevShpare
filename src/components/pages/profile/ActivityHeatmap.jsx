import { useMemo } from "react";
import { motion } from "framer-motion";

const WEEKS = 16;
const LEVELS = [
  "bg-surface-container-high",
  "bg-primary-container/25",
  "bg-primary-container/50",
  "bg-primary-container/75",
  "bg-primary-container",
];
const level = (n) => (n <= 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4);
const key = (d) => d.toISOString().slice(0, 10);

/** `data` = [{ date: "2026-09-29", count: 3 }] from GET /me/overview. */
export default function ActivityHeatmap({ data }) {
  const { columns, total, best } = useMemo(() => {
    const byDate = Object.fromEntries((data || []).map((d) => [d.date, d.count]));
    const end = new Date();
    end.setHours(12, 0, 0, 0);
    const start = new Date(end);
    start.setDate(end.getDate() - (WEEKS * 7 - 1) - ((end.getDay() + 6) % 7)); // align to Monday
    const cols = [];
    let sum = 0, max = 0;
    for (let w = 0; w < WEEKS + 1; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(start);
        day.setDate(start.getDate() + w * 7 + d);
        if (day > end) { col.push(null); continue; }
        const count = byDate[key(day)] || 0;
        sum += count; max = Math.max(max, count);
        col.push({ date: key(day), count });
      }
      cols.push(col);
    }
    return { columns: cols, total: sum, best: max };
  }, [data]);

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm text-on-surface-variant"><span className="font-display text-lg font-bold text-on-surface">{total}</span> contributions in the last {WEEKS} weeks</p>
        {best > 0 && <span className="text-xs text-outline">Best day: {best}</span>}
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex w-max gap-1">
          {columns.map((col, w) => (
            <div key={w} className="flex flex-col gap-1">
              {col.map((cell, d) =>
                cell ? (
                  <motion.div
                    key={d}
                    title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} · ${cell.date}`}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + w * 0.025 + d * 0.01, type: "spring", stiffness: 500, damping: 24 }}
                    whileHover={{ scale: 1.5 }}
                    className={`h-4 w-4 rounded-[4px] ${LEVELS[level(cell.count)]}`}
                  />
                ) : <div key={d} className="h-4 w-4" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-outline">
        Less {LEVELS.map((c) => <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />)} More
      </div>
    </div>
  );
}
