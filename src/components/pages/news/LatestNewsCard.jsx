import { useState } from "react";
import { Bookmark, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { cn } from "../../../utils/cn";
import { getCategoryFallbackImage } from "../../../pages/news/data/newsData";

export default function LatestNewsCard({ article, saved, onToggleSave, onRead }) {
  if (!article) return null;

  const imageUrl = article.image || getCategoryFallbackImage(article.category);
  const [imgErr, setImgErr] = useState(false);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onRead(article)}
      onKeyDown={(e) => e.key === "Enter" && onRead(article)}
      className="cursor-pointer overflow-hidden rounded-2xl border border-outline-variant/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-surface-container-lowest group flex flex-col justify-between"
    >
      <div>
        {/* Top Image Banner */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-surface-container-high">
          {!imgErr ? (
            <img
              src={imageUrl}
              alt={article.title}
              onError={() => setImgErr(true)}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={cn("flex h-full w-full items-center justify-center text-white font-extrabold text-lg tracking-wider p-4 text-center", article.brandTone)}>
              {article.brand}
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          <span className="absolute left-3 top-3 z-10 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm border border-white/10">
            {article.brand}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            aria-label="Save article"
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-xl bg-black/50 backdrop-blur-md text-white hover:bg-black/80 transition-colors shadow-md border border-white/20"
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-white text-white")} />
          </button>
        </div>

        {/* Content Section */}
        <CardContent className="p-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-md bg-primary/10">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              {article.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              )}
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </div>

          <h3 className="font-display text-base font-bold leading-snug text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </CardContent>
      </div>

      <div className="px-5 pb-4 pt-0 flex items-center justify-between text-xs font-bold text-primary opacity-90 group-hover:opacity-100 transition-opacity">
        <span>Read Technical Article</span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );
}