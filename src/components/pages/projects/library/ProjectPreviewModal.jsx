import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ExternalLink, Star, Clock, User } from "lucide-react";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { LANGUAGE_META } from "../../../../pages/projects/data/projectLibraryData";

export default function ProjectPreviewModal({ project, onClose, onDownload }) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  const color = project ? LANGUAGE_META[project.language]?.color ?? LANGUAGE_META.Other.color : "#8b93a7";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-inverse-surface/40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[32rem] max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-xl shadow-lg p-lg"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pr-8">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs font-semibold text-on-surface-variant">{project.language}</span>
              {project.custom && <Badge variant="success">Your Upload</Badge>}
            </div>

            <h3 className="font-display text-xl font-semibold text-on-surface mt-2 pr-8">{project.title}</h3>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-md">
              {(project.tags || []).map((tag) => (
                <Badge key={tag} variant="code">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-xs mt-lg p-sm rounded-lg bg-surface-container-low/60 text-xs text-on-surface-variant">
              <div className="flex flex-col items-center gap-1 py-1">
                <User className="w-3.5 h-3.5" />
                <span className="text-on-surface font-semibold truncate max-w-full">{project.author}</span>
                <span>Author</span>
              </div>
              <div className="flex flex-col items-center gap-1 py-1">
                <Star className="w-3.5 h-3.5 text-warning" />
                <span className="text-on-surface font-semibold">{(project.stars || 0).toLocaleString()}</span>
                <span>Stars</span>
              </div>
              <div className="flex flex-col items-center gap-1 py-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-on-surface font-semibold">
                  {new Date(project.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span>Updated</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-lg">
              <Button variant="primary" size="default" type="button" className="flex-1" onClick={() => onDownload(project)}>
                <Download className="w-4 h-4" />
                Download ({project.sizeKb} KB)
              </Button>
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="surface" size="default" type="button" className="w-full">
                    <ExternalLink className="w-4 h-4" />
                    Open Repository
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}