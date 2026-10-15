import { CalendarDays, Users, Calendar } from "lucide-react";
import { Button } from "../../ui/button";

export default function UpcomingEvents({ events, registeredLabel, onEventAction }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-slate-900">Upcoming Events</h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">{registeredLabel}</span>
      </div>

      <div className="flex flex-col gap-3.5">
        {events.map((event) =>
          event.variant === "featured" ? (
            <div
              key={event.id}
              className="bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/50 border border-indigo-100 p-4 rounded-xl flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200/60">
                    {event.badgeText}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{event.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{event.subtitle}</p>
                </div>
                <div className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-center shrink-0 shadow-2xs">
                  <span className="block text-base font-bold text-indigo-600 leading-none">{event.countdownValue}</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{event.countdownLabel}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-indigo-100/70">
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Users className="w-[15px] h-[15px] text-slate-400" /> {event.registeredText}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onEventAction?.(event.id)}
                  className="px-3 py-1.5 h-auto rounded-lg bg-white hover:bg-slate-50 text-slate-800 border-slate-200 text-xs font-semibold shadow-2xs"
                >
                  {event.ctaText}
                </Button>
              </div>
            </div>
          ) : (
            <div key={event.id} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold">
                    {event.badgeText}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{event.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{event.subtitle}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${event.iconBg} ${event.iconColor}`}>
                  <event.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                  <Calendar className="w-[15px] h-[15px] text-slate-400" /> {event.dateText}
                </span>
                <Button
                  type="button"
                  onClick={() => onEventAction?.(event.id)}
                  className="px-3 py-1.5 h-auto rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs"
                >
                  {event.ctaText}
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
