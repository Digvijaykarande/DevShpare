import { Sparkles, ArrowRight, Bookmark, Clock } from "lucide-react";
import { cn } from "../../../utils/cn";
import { getCategoryFallbackImage } from "../../../pages/news/data/newsData";

export default function FeaturedArticleCard({ article, saved, onToggleSave, onRead }) {
  if (!article) return null;

  const imageUrl = article.image || getCategoryFallbackImage(article.category);

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[28rem] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:scale-[1.005] group border border-white/10",
        article.tone || "bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900"
      )}
    >
      {/* Background Image Overlay */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover object-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      )}

      {/* Glow ambient effects */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-sm border border-white/20">
            <Sparkles className="h-3.5 w-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            Featured Dispatch
          </span>
          {article.readTime && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/80">{article.date}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            aria-label="Save featured article"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/20 shadow-md"
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-white text-white")} />
          </button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 flex flex-col gap-3.5 mt-auto pt-12">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-primary/80 px-3 py-1 rounded-lg backdrop-blur-sm border border-primary/40 shadow-sm">
            {article.category}
          </span>
          <span className="text-xs font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
            {article.brand}
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug text-white drop-shadow-md">
          {article.title}
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-white/90 line-clamp-3 font-normal max-w-3xl">
          {article.summary}
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onRead(article)}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-xs font-extrabold text-slate-900 shadow-xl transition-all duration-200 hover:bg-primary-container hover:text-on-primary hover:scale-105 active:scale-95 cursor-pointer"
          >
            Read Complete Article
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}