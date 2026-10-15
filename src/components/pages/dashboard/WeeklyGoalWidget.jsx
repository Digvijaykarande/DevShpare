import { Target, Check } from "lucide-react";

const DAY_STYLES = {
  done: "bg-emerald-500 text-white shadow-2xs",
  today: "bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold",
  upcoming: "bg-slate-100 text-slate-400",
};

export default function WeeklyGoalWidget({ goal }) {
  // Circle circumference constant for r=15.9155 (matches the original SVG path).
  const dashArray = `${goal.percent}, 100`;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-slate-900">Weekly Coding Goal</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">{goal.resetLabel}</span>
      </div>

      <div className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-200/70 p-4 rounded-xl">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{goal.solved}</span>
            <span className="text-base text-slate-400 font-semibold">/ {goal.target}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Problems Solved this week</span>
        </div>

        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <path
              className="text-indigo-600 transition-all duration-1000 ease-out"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={dashArray}
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>
          <span className="absolute text-xs font-bold text-slate-800">{goal.percent}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 px-1">
        {goal.days.map((day) => (
          <div key={day.label} className="flex flex-col items-center gap-1.5">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${DAY_STYLES[day.status]}`}>
              {day.status === "done" && <Check className="w-4 h-4" />}
              {day.status === "today" && day.value}
              {day.status === "upcoming" && "-"}
            </span>
            <span className={`text-[11px] font-medium ${day.status === "today" ? "text-indigo-600 font-semibold" : "text-slate-400"}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
