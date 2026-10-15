import { Zap, Flame, MessageCircleQuestion, UserPlus, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACTION_ICONS = {
  contact_support: MessageCircleQuestion,
  group_add: UserPlus,
  terminal: Terminal,
};

/**
 * Top hero banner: greeting, tier badge, streak, and quick action buttons.
 *
 * @param {{ name: string, tierLabel: string, tagline: string, streakDays: number }} user
 * @param {Array<{id:string,label:string,icon:string,variant:'outline'|'primary'}>} actions
 * @param {(actionId: string) => void} [onAction]
 */
export default function WelcomeBanner({ user, actions = [], onAction }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="flex flex-col gap-1.5 relative z-10">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user.name} 👋
          </h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 gap-1">
            <Zap className="w-[13px] h-[13px]" />
            {user.tierLabel}
          </span>
        </div>
        <p className="text-sm text-slate-500 flex items-center gap-2 flex-wrap">
          <span>{user.tagline}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-amber-700 font-medium flex items-center gap-1">
            <Flame className="w-4 h-4 text-amber-500" />
            Current Streak: {user.streakDays} Days Active
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap shrink-0 relative z-10">
        {actions.map((action) => {
          const Icon = ACTION_ICONS[action.icon];
          const isPrimary = action.variant === "primary";
          return (
            <Button
              key={action.id}
              type="button"
              variant={isPrimary ? "default" : "outline"}
              onClick={() => onAction?.(action.id)}
              className={
                isPrimary
                  ? "gap-2 px-4 py-2 h-auto rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"
                  : "gap-2 px-3.5 py-2 h-auto rounded-lg text-xs font-semibold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs"
              }
            >
              {Icon && <Icon className={isPrimary ? "w-[17px] h-[17px]" : "w-[17px] h-[17px] text-slate-500"} />}
              <span>{action.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
