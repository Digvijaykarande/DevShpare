import { Bookmark, ThumbsUp, Play, FileText } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { cn } from "../../../utils/cn";

export default function FeaturedResourceCard({ resource }) {
  const isVideo = resource.tags.includes("Video");
  const isPdf = resource.tags.includes("PDF");

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className={cn("relative h-40 bg-gradient-to-br flex items-center justify-center", resource.tone)}>
        {isVideo && (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <Play className="h-5 w-5 text-white fill-white" />
          </span>
        )}
        {isPdf && <FileText className="h-10 w-10 text-white/80" />}
        {!isVideo && !isPdf && (
          <span className="font-display text-lg font-bold text-white/90 px-4 text-center">{resource.title}</span>
        )}
        {resource.badge && (
          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[11px] font-semibold text-white">
            {resource.badge}
          </span>
        )}
      </div>
      <CardContent className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-sm font-semibold text-on-surface leading-snug">{resource.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">{resource.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-surface-container-high" />
            {resource.author}
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Bookmark className="h-3.5 w-3.5" />
              {resource.saves}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              {resource.likes}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
