import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Bookmark, Share2, ExternalLink, Clock, Globe } from "lucide-react";
import { cn } from "../../../utils/cn";

export default function ArticleModal({ article, saved, onToggleSave, onClose, onNotify }) {
  useEffect(() => {
    if (!article) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    const shareUrl = article.link && article.link !== "#" ? article.link : window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      if (onNotify) onNotify("Article link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {article && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-3xl bg-surface-container-lowest shadow-2xl z-10 border border-outline-variant/40"
            style={{ width: "100%", maxWidth: "640px" }}
          >
            {/* Header Banner */}
            <div
              className={cn(
                "relative flex h-52 shrink-0 items-center justify-center px-6 text-white overflow-hidden",
                article.tone ? article.tone : article.brandTone || "bg-primary"
              )}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-overlay"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <div className="relative z-10 text-center">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-md">
                  {article.brand}
                </span>
                <p className="text-xs text-white/80 font-medium mt-1">Devsphere Tech Dispatch</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 transition-colors shadow-md border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                    {article.category}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">· {article.date}</span>
                </div>
                {article.readTime && (
                  <span className="flex items-center gap-1 text-xs text-on-surface-variant/80 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                )}
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-extrabold leading-snug text-on-surface">
                {article.title}
              </h2>

              <div className="text-sm sm:text-base leading-relaxed text-on-surface-variant whitespace-pre-line space-y-3 font-normal pt-2 border-t border-outline-variant/30">
                {article.body || article.summary}
              </div>

              {article.source && (
                <div className="flex items-center justify-between text-xs font-medium text-on-surface-variant/80 pt-4 border-t border-outline-variant/30">
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    Source: {article.source}
                  </span>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="flex items-center gap-2 sm:gap-3 border-t border-outline-variant/40 p-4 sm:p-5 bg-surface-container-low/50 flex-wrap sm:flex-nowrap">
              {article.link && article.link !== "#" && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-on-primary hover:opacity-90 transition-all shadow-md"
                >
                  <ExternalLink className="h-4 w-4" />
                  Read Full Article
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  onToggleSave(article.id);
                  if (onNotify) {
                    onNotify(saved ? "Removed from bookmarks" : "Saved to bookmarks!");
                  }
                }}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl border border-outline-variant/60 px-4 py-3 text-xs font-bold transition-all shadow-xs",
                  saved
                    ? "bg-primary-container text-on-primary-container border-primary"
                    : "text-on-surface hover:bg-surface-container"
                )}
              >
                <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
                {saved ? "Bookmarked" : "Bookmark"}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant/60 px-4 py-3 text-xs font-bold text-on-surface hover:bg-surface-container transition-all shadow-xs"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}