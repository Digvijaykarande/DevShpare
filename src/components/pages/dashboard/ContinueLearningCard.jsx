import { PlayCircle, ArrowRight, FastForward, Clock, Play, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Link} from "react-router";

export default function ContinueLearningCard({ roadmap, onResume, onViewAll }) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-[22px] h-[22px] text-indigo-600" />
          <h2 className="font-bold text-base text-slate-900">Continue Learning</h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
          href="/roadmaps"
        >
          <Link to="/roadmaps">
          View All Roadmaps 
          </Link>
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5 relative">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Network className="w-[26px] h-[26px]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="px-2 py-0.5 bg-slate-100 text-slate-600 border-transparent rounded text-xs font-medium">
                  {roadmap.badgeText}
                </Badge>
                <Badge variant="outline" className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold border-indigo-100">
                  {roadmap.trackText}
                </Badge>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-1.5 leading-snug">
                {roadmap.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{roadmap.progressNote}</p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-2xl sm:text-3xl font-bold text-indigo-600">{roadmap.percent}%</span>
          </div>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-700"
            style={{ width: `${roadmap.percent}%` }}
          />
        </div>

        <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs">
              <FastForward className="w-[18px] h-[18px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {roadmap.next.label}
              </span>
              <span className="text-sm text-slate-900 font-semibold">{roadmap.next.title}</span>
              <div className="flex items-center gap-2 mt-1 text-slate-500 text-xs flex-wrap">
                <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-700">
                  {roadmap.next.tag}
                </span>
                <span>•</span>
                <span>{roadmap.next.level}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-[13px] h-[13px]" /> {roadmap.next.duration}
                </span>
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={onResume}
            className="gap-1.5 px-4 py-2 h-auto rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 shadow-sm shadow-indigo-200"
          >
            <Play className="w-[17px] h-[17px]" />
            <span>Resume Topic</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
