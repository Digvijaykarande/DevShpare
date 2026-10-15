import { TrendingUp, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Single KPI card. Handles the shared shell (icon, label, value, subtitle)
 * and three footer variants driven by `kpi.type`:
 *  - "progress": a colored progress bar (Learning Progress, Problems Solved)
 *  - "badge":    a status badge + note (Active Projects)
 *  - "stat":     a left/right stat row (Reputation & Score)
 */
export default function KpiCard({ kpi }) {
  const Icon = kpi.icon;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {kpi.label}
        </span>
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${kpi.iconBg} ${kpi.iconColor}`}>
          <Icon className="w-[18px] h-[18px]" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900">{kpi.value}</span>
          {kpi.trend && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-[13px] h-[13px]" />
              {kpi.trend.label}
            </span>
          )}
          {kpi.valueSuffix && !kpi.trend && (
            <span className="text-xs text-slate-400 font-medium">{kpi.valueSuffix}</span>
          )}
        </div>
        <p className={`text-xs truncate mt-1 flex items-center gap-1.5 ${kpi.subtitleColor ?? "text-slate-500"}`}>
          {kpi.subtitleDot && <span className={`w-1.5 h-1.5 rounded-full ${kpi.subtitleDot}`} />}
          {kpi.subtitle}
        </p>
      </div>

      {kpi.type === "progress" && (
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className={`${kpi.progress.barColor} h-full rounded-full`}
            style={{ width: `${kpi.progress.percent}%` }}
          />
        </div>
      )}

      {kpi.type === "badge" && (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200/70 text-[11px] font-semibold rounded-md"
          >
            {kpi.badge.text}
          </Badge>
          <span className="text-slate-400 text-xs">• {kpi.badgeNote}</span>
        </div>
      )}

      {kpi.type === "stat" && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUp className="w-[14px] h-[14px]" />
            {kpi.statLeft.text}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">{kpi.statRight}</span>
        </div>
      )}
    </div>
  );
}
