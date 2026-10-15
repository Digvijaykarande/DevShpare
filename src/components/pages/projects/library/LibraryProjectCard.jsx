import { motion } from "framer-motion";
import { Download, Eye, Star, Clock } from "lucide-react";
import { Card } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { LANGUAGE_META } from "../../../../pages/projects/data/projectLibraryData";

export default function LibraryProjectCard({ project, index = 0, onView, onDownload }) {
  const color = LANGUAGE_META[project.language]?.color ?? LANGUAGE_META.Other.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay: (index % 8) * 0.04 }}
      className="h-full"
    >
      <Card className="p-lg h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-xs">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              {project.language}
            </span>
            {project.custom && <Badge variant="success">Your Upload</Badge>}
          </div>

          <button
            type="button"
            onClick={() => onView(project)}
            className="text-left font-display text-base font-semibold text-on-surface hover:text-primary transition-colors mt-1.5"
          >
            {project.title}
          </button>
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-md">
            {(project.tags || []).map((tag) => (
              <Badge key={tag} variant="code">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-lg pt-md flex flex-col gap-sm">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-warning" />
              {(project.stars || 0).toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(project.updatedAt || project.createdAt || Date.now()).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="font-code text-[11px]">{project.sizeKb || 14} KB</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="surface"
              size="sm"
              type="button"
              className="flex-1"
              onClick={() => onView(project)}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="button"
              className="flex-1"
              onClick={() => onDownload(project)}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
