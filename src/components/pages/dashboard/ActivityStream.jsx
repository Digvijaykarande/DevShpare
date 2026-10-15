import { CheckCircle2, Code2, History, Medal, MessageSquare, UserPlus } from "lucide-react";

const iconByType = {
  solved: Code2,
  question: MessageSquare,
  project: UserPlus,
};

export default function ActivityStream({ items, badge, onViewHistory }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-base text-slate-900">Activity Stream</h3>
        </div>
        <button
          type="button"
          onClick={onViewHistory}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          History
        </button>
      </div>

      <div className="flex flex-col divide-y divide-slate-100">
        {(Array.isArray(items) ? items : []).map((item) => {
          const Icon = item.icon || iconByType[item.type] || (item.text?.toLowerCase().includes("complete") ? CheckCircle2 : MessageSquare);
          return (
            <div key={item.id} className="flex items-start gap-3.5 py-3 first:pt-0">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${item.iconBg} ${item.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-slate-800 leading-snug">
                  {item.prefix}
                  <span className={item.highlightColor}>{item.highlight}</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  {item.metaPositive && (
                    <>
                      <span className="text-emerald-600 font-semibold">{item.metaPositive}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}

        {badge && (
          <div className="pt-3">
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Medal className="w-5 h-5" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[11px] text-indigo-700 uppercase tracking-wider font-bold">
                  {badge.eyebrow}
                </span>
                <span className="text-xs font-bold text-slate-900 truncate">{badge.name}</span>
                <span className="text-xs text-slate-500">{badge.description}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
