import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TAG_TONES = {
  rose: "bg-rose-50 border-rose-200/70 text-rose-700",
  emerald: "bg-emerald-50 border-emerald-200/70 text-emerald-700",
  indigo: "bg-indigo-50 border-indigo-200/70 text-indigo-700",
};

export default function RecommendedCard({ item, onAction }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 hover:border-slate-300 transition-all">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`px-2 py-0.5 font-semibold text-[11px] rounded ${TAG_TONES[item.tag.tone]}`}>
            {item.tag.text}
          </Badge>
          <span className={`font-mono text-xs ${item.metaColor ?? "text-slate-400"}`}>{item.meta}</span>
        </div>
        <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
        <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
      </div>
      <button
        type="button"
        onClick={() => onAction?.(item.id)}
        className="inline-flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <span>{item.ctaText}</span>
        <ArrowRight className="w-[15px] h-[15px]" />
      </button>
    </div>
  );
}
