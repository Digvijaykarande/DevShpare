import { Sparkles } from "lucide-react";
import RecommendedCard from "./RecommendedCard";

export default function RecommendedSection({ items, onAction }) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-[22px] h-[22px] text-indigo-600" />
          <h2 className="font-bold text-base text-slate-900">Recommended For You</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">Tailored to your skills</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {items.map((item) => (
          <RecommendedCard key={item.id} item={item} onAction={onAction} />
        ))}
      </div>
    </section>
  );
}
