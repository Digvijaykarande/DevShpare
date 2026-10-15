import { useState } from "react";
import { Bookmark, Clock, ArrowUpRight } from "lucide-react";
import { Card } from "../../ui/card";
import { cn } from "../../../utils/cn";
import { getCategoryFallbackImage } from "../../../pages/news/data/newsData";

export default function TopStoryCard({ article, saved, onToggleSave, onRead }) {
  if (!article) return null;

  const imageUrl = article.image || getCategoryFallbackImage(article.category);
  const [imgErr, setImgErr] = useState(false);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onRead(article)}
      onKeyDown={(e) => e.key === "Enter" && onRead(article)}
      className="flex cursor-pointer items-start gap-3.5 sm:gap-4 p-3.5 rounded-2xl transition-all duration-200 border border-outline-variant/40 hover:shadow-xl hover:border-primary/50 bg-surface-container-lowest group"
    >
      {/* Image Thumbnail */}
      <div className="relative h-20 w-24 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-surface-container-high shadow-xs">
        {!imgErr ? (
          <img
            src={imageUrl}
            alt={article.title}
            onError={() => setImgErr(true)}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className={cn("flex h-full w-full items-center justify-center text-white font-extrabold text-[10px] p-1 text-center uppercase tracking-wider", article.brandTone)}>
            {article.brand}
          </div>
        )}
        <span className="absolute bottom-1 left-1 rounded-md bg-black/70 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider shadow-xs">
          {article.brand}
        </span>
      </div>

      {/* Content Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
              {article.category}
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">· {article.date}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            aria-label="Save article"
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
          </button>
        </div>

        <p className="text-sm font-bold leading-snug text-on-surface line-clamp-2 group-hover:text-primary transition-colors flex items-start justify-between gap-1">
          <span>{article.title}</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-primary mt-0.5" />
        </p>

        <div className="flex items-center justify-between text-[11px] text-on-surface-variant/80">
          <span className="line-clamp-1 flex-1">{article.summary}</span>
          {article.readTime && (
            <span className="hidden sm:flex items-center gap-1 shrink-0 ml-2 font-medium">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}